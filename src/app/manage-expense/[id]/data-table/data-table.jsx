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
 *  data: import('@/app/types/history').History[]
 * }} params
 * @returns {JSX.Element}
 */
export function DataTable({
  data,
  setShowReOccurringForm,
  setSelectedExpense,
}) {
  const columns = useMemo(
    () =>
      createColumns({
        setSelectedExpense,
        setShowReOccurringForm,
      }),
    [setSelectedExpense, setShowReOccurringForm],
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
    <div className="flex flex-col overflow-hidden rounded-md border w-full max-h-[590px]">
      <Table className="max-h-96">
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
        <TableBody className="flex-1 overflow-hidden">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer hover:bg-muted"
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
      <Pagination table={table} showRowPerPage={false} />
    </div>
  );
}
