"use client";

import { flexRender } from "@tanstack/react-table";

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
 * @param {import("@/app/types/tracker").TrackerTableProps} props - The component props
 * @returns {JSX.Element}
 */
export function DataTable({
  table,
  setSelected,
  setShowTrackerForm,
  handleDeleteTracker,
  viewTracker
}) {

  // attach custom helpers to the table instance (typed above)
  table.showEdit = (row) => {
    setSelected(row.original);
    setShowTrackerForm(true);
  };

  table.removeRow = (row) => handleDeleteTracker(row.original.id);
  table.viewRow = (row) => viewTracker(row.original.id);

  return (
    <>
      <div className="flex flex-col rounded-md border w-full">
        <Table>
          <TableHeader className="sticky top-0 bg-neutral-100">
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
          <TableBody className="flex-1">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-muted"
                  onClick={(/**@type {MouseEvent} */ e) => {
                    // prevent edit modal to open if deleting row
                    if (
                      e.target.innerText.includes('Delete') ||
                      e.target.innerText.includes('Edit')
                    ) return;

                    viewTracker(row.original.id);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
