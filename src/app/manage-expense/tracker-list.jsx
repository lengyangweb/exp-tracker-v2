'use client'

import { toast } from "sonner";
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LinkIcon, MoreHorizontal, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import moment from "moment";

export default function TrackerList({ refetch, setRefetch }) {
  const router = useRouter();
  const [sorting, setSorting] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRow, setSelectedRow] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});


const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")); // Assuming createdAt is in ISO format
      const formattedDate = moment(date).format("MMM DD, YYYY hh:mm A"); // Format date using moment.js
      return <div className="text-right font-medium">{formattedDate}</div>
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => {
      return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
           className="flex items-center text-xs"
           onClick={() => handleRemoveRow(row?.original?.id)}>
            <TrashIcon size={8} />
            <span>Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center text-xs"
            onClick={() => router.push(`/manage-expense/${row?.original?.id}`)}>
              <LinkIcon size={8} />
              <span>View Expense</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
      );
    },
  }
]

  const table = useReactTable({
    data: trackers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  useEffect(() => {
    async function getTrackers() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/tracker');
        if (!response.ok) return toast.error('Something went wrong');
        const result = await response.json();
        setTrackers(result);
      } catch (error) {
        console.error('Get trackers error', error);
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
        setRefetch(false);
      }
    }

    if (refetch) getTrackers();
  }, [refetch]);

    const handleRowClick = (rowId, row) => {
      const isSelected = !!rowSelection[rowId];
      setSelectedRow(isSelected ? undefined : row.original);
      setRowSelection(isSelected ? {} : { [rowId]: true });
    };

    const handleRemoveRow = async (rowId) => {
      setIsDeleting(true);

      try {
        const response = await fetch(`/api/tracker/${rowId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) return toast.error('Something went wrong.');
        const result = await response.json();
        if (result?.success) {
          // toast.success(result.message);
          setSelectedRow(undefined);
          setRowSelection({});
          setRefetch(true);
        }
      } catch (error) {
        console.error('fail to delete tracker', error);
      } finally {
        setIsDeleting(false);
      }
    };

  if (isLoading) return (
    <div className="flex flex-col items-center gap-2">
      <Spinner />
      <span>Loading...</span>
    </div>
  )

  if (!trackers) return <span>No results.</span>

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border my-4">
        <Table>
          <TableHeader className="bg-neutral-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`cursor-pointer`}
                  onClick={() => handleRowClick(row.id, row)}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {trackers.length} tracker(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}