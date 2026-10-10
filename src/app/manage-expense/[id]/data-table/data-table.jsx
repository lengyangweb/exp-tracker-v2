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

// import Pagination from "./pagination";
import { createColumns } from "./columns";
import { useMemo } from "react";
import Pagination from "./pagination";

/**
 * A data table component for displaying transaction history.
 *
 * @param {{
 *  data: import('@/app/types/history').History[],
 *  setOpenEditForm: (v) => void;
 *  setSelectedHistory: (v) => void;
 *  onDelete: (v) => void
 * }} params
 * @returns {JSX.Element}
 */
export function DataTable({
  data,
  setOpenEditForm,
  setSelectedHistory,
  onDelete,
}) {
  const columns = useMemo(
    () =>
      createColumns({
        setSelectedHistory,
        setOpenEditForm,
        onDelete,
      }),
    [setSelectedHistory, setOpenEditForm, onDelete],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 100,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden rounded-md border">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Table containerClassName="overflow-visible">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="sticky top-0 z-10 bg-neutral-100"
                    >
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
                  className="even:bg-muted/60 hover:bg-transparent even:hover:bg-muted/60"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} showRowPerPage={false} />
    </div>
  );
}
