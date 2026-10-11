"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import columns from "./columns";

/**
 * A data table component for displaying reocurring expenses.
 * @param {import('@/app/types/recurring-table').RecurringTableProps} props - The component props
 * @returns {JSX.Element}
 */
export function DataTable({
  table,
  setShowReOccurringForm,
  setSelectedExpense,
  handleDeleteExpense,
}) {

  // attach custom helpers to the table instance (typed above)
  table.showEdit = (row) => {
    setSelectedExpense(row.original);
    setShowReOccurringForm(true);
  };

  table.removeRow = (row) => handleDeleteExpense(row.original.id);

  return (
    <>
      <div className="w-full flex-1 rounded-md border">
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
                            header.getContext(),
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
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-muted"
                  onClick={(/**@type {MouseEvent} */ e) => {
                    // prevent edit modal to open if deleting row
                    if (e.target.innerText.includes('Delete')) return;

                    setSelectedExpense(row.original);
                    setShowReOccurringForm(true);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
    </>
  );
}
