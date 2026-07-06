"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const categoryClassNames = {
  salary: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  food: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  rent: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  bills: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  utilities: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  subscription: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  entertainment: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  miscellaneous: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
};

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
        return (
          <div className="text-center">
            <Badge className={cn(`text-white`, categoryClassNames[category])}>
              {category}
            </Badge>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "historyDate",
    //   header: () => <div className="text-center">Date</div>,
    //   cell: ({ row }) => {
    //     const date = new Date(row.getValue("historyDate"));
    //     return <div className="text-center">{date.toLocaleDateString()}</div>;
    //   },
    // },
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
                <Button variant="ghost" className="h-8 w-full p-0">
                  <span className="sr-only">Open Menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <div
                    className="flex justify-between w-full"
                    onClick={() => {
                      setSelectedHistory(row.original);
                      setOpenEditForm(true);
                    }}
                  >
                    <span>Edit</span>
                    <Pencil />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(row.original)} className="cursor-pointer">
                  <div className="flex justify-between w-full">
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
};
