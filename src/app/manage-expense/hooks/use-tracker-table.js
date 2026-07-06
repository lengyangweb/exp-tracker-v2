import columns from "../components/columns";
import { getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

/**
 * A custom hook for creating a recurring table instance using @tanstack/react-table.
 * @param {{
 *  data: import("@/app/types/tracker").Tracker[],
 *  pageSize?: number,
 *  pageIndex?: number,
 * }} props 
 * @returns {import("@/app/types/tracker").TrackerTable}
 */
export function useTrackerTable({ 
  data = [],
  pageSize = 15,
  pageIndex = 0,
}) {
  /** @type {import("@/app/types/tracker").TrackerTable} */
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