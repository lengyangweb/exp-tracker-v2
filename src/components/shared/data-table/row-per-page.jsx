import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function RowPerPage({ 
  table,
  options = [10, 20, 30, 40, 50],
}) {
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex items-center justify-between">
      <Select
        value={String(pageSize)}
        onValueChange={(value) => table.setPageSize(Number(value))}
      >
        <SelectTrigger className="w-20 bg-white">
          <SelectValue placeholder="Rows per page" />
        </SelectTrigger>
        <SelectContent>
          {options.map((pageSizeOption) => (
            <SelectItem key={pageSizeOption} value={pageSizeOption.toString()}>
              {pageSizeOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}