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
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const columns = [
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
      return <div className="text-right font-medium">{row.getValue("createdAt")}</div>
    },
  }
]

export default function TrackerList() {
  const [sorting, setSorting] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRow, setSelectedRow] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

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
      }
    }

    getTrackers();
    console.log('rowSelection', rowSelection);
  }, []);

    const handleRowClick = (rowId, row) => {
      const isSelected = !!rowSelection[rowId];
      // ✅ If clicked row is already selected → deselect it
      // ✅ Else select only the new one
      setSelectedRow(isSelected ? undefined : row.original);
      setRowSelection(isSelected ? {} : { [rowId]: true });
    };

    const handleRemoveRow = async () => {
      setIsDeleting(true);

      try {
        const response = await fetch(`/api/tracker/${selectedRow.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) return toast.error('Something went wrong.');
        const result = await response.json();
        if (result?.success) {
          toast.success(result.message);
          setSelectedRow(undefined);
          setRowSelection({});
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
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button 
          variant='destructive' 
          onClick={handleRemoveRow}
          disabled={!Object.keys(rowSelection).length}
        >Remove Selected</Button>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
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
                  )
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
  )
}