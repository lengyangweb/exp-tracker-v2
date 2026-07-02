import columns from "./columns";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

/**
 * A custom hook for creating a recurring table instance using @tanstack/react-table.
 * @param {{
 *  data: import('@/app/types/reocurring').Recurring[],
 *  pageSize?: number,
 *  pageIndex?: number,
 * }} props 
 * @returns {import("@/app/types/recurring-table").RecurringTable}
 */
export function useRecurringTable({ 
  data = [],
  pageSize = 15,
  pageIndex = 0,
}) {
  /** @type {import("@/app/types/recurring-table").RecurringTable} */
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
        pageIndex,
      },
    },
  });

  return table;
}