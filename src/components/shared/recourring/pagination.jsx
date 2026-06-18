import { Button } from "@/components/ui/button";
import { RowPerPage } from "./row-per-page";

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
    <div className="flex justify-between items-center space-x-2">
        {showRowPerPage && <RowPerPage table={table} />}
        <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex space-x-2">
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
      {/* </div> */}
    </div>
  );
}
