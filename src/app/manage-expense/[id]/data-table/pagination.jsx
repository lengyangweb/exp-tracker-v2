import { Button } from "@/components/ui/button";
import { RowPerPage } from "@/components/shared/recourring/row-per-page";
import { cn } from "@/lib/utils";

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
    <div 
      className={
        cn(
          "flex justify-between items-center space-x-2",
          "sticky bottom-0 mt-auto bg-neutral-100 p-3",
          "border-t"
        )
      }>
        {showRowPerPage && <RowPerPage table={table} />}
        <p className="text-sm text-muted-foreground">
          Items: {table.getFilteredRowModel().rows.length}
        </p>
        {/* <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p> */}
        {/* <div className="flex space-x-2">
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
        </div> */}
      {/* </div> */}
    </div>
  );
}
