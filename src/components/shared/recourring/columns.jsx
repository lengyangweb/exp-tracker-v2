"use client";

import { getCategoryLabel } from "@/constant";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

/** @type {import('@/app/types/recurring-table').RecurringTableColumn[]} */
const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title");
      const startDate = new Date(row.original.startDate);
      // return <div className="font-medium">{title}</div>;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{title}</span>
          <span className="text-xs text-muted-foreground">
            {startDate.toLocaleDateString()}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "frequency",
    header: () => <div className="text-center">Frequency</div>,
    cell: ({ row }) => {
      const frequency = row.getValue("frequency");
      return <div className="text-center">{frequency}</div>;
    },
  },
  {
    accessorKey: "nextOccurrence",
    header: () => <div className="text-center">Next Occurrence</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("nextOccurrence"));
      return <div className="text-center">{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => {
      const categoryValue = row.original?.category ?? "miscellaneous";
      const categoryLabel = getCategoryLabel(categoryValue);

      return <div className="text-center">{categoryLabel}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <div
                  className="flex justify-between w-full"
                  onClick={() => table.showEdit?.(row)}
                >
                  <span>Edit</span>
                  <Pencil />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div
                  className="flex justify-between w-full"
                  onClick={() => table.removeRow?.(row)}
                >
                  <span>Delete</span>
                  <Trash2 />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default columns;