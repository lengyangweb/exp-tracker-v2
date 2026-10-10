"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategoryLabel } from "@/constant";
import { cn } from "@/lib/utils";
import { getCategoryColor } from "@/utils/category-breakdown-chart";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const typeClassNames = {
  income: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  expense: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  others: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300"
}

/**
 *
 * @param {{
 *    setSelectedHistory: (v) => void;
 *   setOpenEditForm: (v) => void;
 *   onDelete: (v) => void;
 * }} param0
 * @returns
 */
export const createColumns = ({
  setSelectedHistory, 
  setOpenEditForm,
  onDelete,
}) => {
  /**@type {ColumnDef<import('@/app/types/history').History>[]} */
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const data = row.original;
        const title = row.getValue("title");
        return (
          <div className="flex flex-col font-medium">
            <span className="font-medium">{title}</span>
            <span className="text-[10px] text-muted-foreground">
              {new Date(data.historyDate).toLocaleDateString()}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => <div className="text-center">Type</div>,
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <div className="text-center">
            <Badge
              className={cn(`text-white`, typeClassNames[type])}
            >
              {type}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <div className="text-center">Category</div>,
      cell: ({ row }) => {
        const category = row.getValue("category");
        const categoryLabel = getCategoryLabel(category);

        return (
          <div className="text-center">
            <Badge
              className="text-gray-900"
              style={{ backgroundColor: getCategoryColor(category) }}
            >
              {categoryLabel}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      // header: "Amount",
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
      cell: ({ row }) => {
        return (
          <div className="w-full">
            <DropdownMenu className="w-full">
              <DropdownMenuTrigger asChild className="w-full flex justify-end">
                <button
                  type="button"
                  className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Actions for ${row.original.title}`}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedHistory(row.original);
                    setOpenEditForm(true);
                  }}
                >
                  <Pencil />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(row.original)}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
