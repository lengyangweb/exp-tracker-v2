import { Button } from "@/components/ui/button";
import { RowPerPage } from "./row-per-page";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

/**
 * A pagination component for the data table.
 * 
 * @param {{ table: import('../types/table').Table }} param0
 * @returns {JSX.Element}
 */
export default function Pagination({ 
  table,
  showRowPerPage = true
}) {
  return (
    <div className="relative flex items-center justify-between gap-2">
        {showRowPerPage && <RowPerPage table={table} />}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to first page"
            title="First page"
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
            title="Previous page"
          >
            <ChevronLeft />
          </Button>
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-center text-sm tabular-nums">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
            title="Next page"
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Go to last page"
            title="Last page"
          >
            <ChevronsRight />
          </Button>
        </div>
      {/* </div> */}
    </div>
  );
}
