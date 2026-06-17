import { Button } from "@/components/ui/button";

/**
 *
 * @param {{ table: import('../types/table').Table }} param0
 * @returns
 */
export default function Pagination({ table }) {
  return (
    <div className="flex justify-between items-center space-x-2 py-4">
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
