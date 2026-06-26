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

const categoriesClassNames = {
  food: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  transportation: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  entertainment: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  utilities: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  health: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  education: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  shopping: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
  travel: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  other: "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
};

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
          <div className="text-center">
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
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <div className="text-center">Category</div>,
      cell: ({ row }) => {
        const category = row.getValue("category");
        // return <div className="text-center">{category}</div>;
        return (
          <div className="text-center">
            <Badge
              className={
                cn(
                  `text-white`,
                  category === 'food' && 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
                  category === 'transportation' && 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
                  category === 'entertainment' && 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
                  category === 'utilities' && 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
                  category === 'health' && 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
                  category === 'education' && 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
                  category === 'shopping' && 'bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
                  category === 'travel' && 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
                  category === 'other' && 'bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300',
                )
              }
            >
              {category}
            </Badge>
          </div>
        )
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
