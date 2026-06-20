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

/**
 *
 * @param {{
 *   setSelected: (v) => void;
 *   setShowReOccurringForm: (v) => void;
 * }} param0
 * @returns
 */
export const createColumns = ({ setSelected, setShowReOccurringForm }) => {
  /**@type {ColumnDef<import('@/app/types/history').History>[]} */
  return [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "type",
      header: () => <div className="text-center">Type</div>,
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <>
            <Badge
              className={
                cn(
                  `text-white`,
                  type === 'income' && 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
                  type === 'expense' && 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
                )
              }
            >
              {type}
            </Badge>
          </>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <div className="text-center">Category</div>,
      cell: ({ row }) => {
        const category = row.getValue("category");
        return <div className="text-center">{category}</div>;
      },
    },
    {
      accessorKey: "historyDate",
      header: () => <div className="text-center">Date</div>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("historyDate"));
        return <div className="text-center">{date.toLocaleDateString()}</div>;
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
                      setSelected(row.original);
                      setShowReOccurringForm(true);
                    }}
                  >
                    <span>Edit</span>
                    <Pencil />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
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
