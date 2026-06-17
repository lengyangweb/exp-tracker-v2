"use client";

import { ReoccurringForm } from "@/app/user-settings/reoccuring-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export const createColumns = ({ 
  setSelectedExpense, 
  setShowReOccurringForm 
}) => {
  /**@type {ColumnDef<import('../types/reocurring').Recurring>[]} */
  return [
    {
      accessorKey: "title",
      header: "Title",
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
      accessorKey: "startDate",
      header: () => <div className="text-center">Start Date</div>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("startDate"));
        return <div className="text-center">{date.toLocaleDateString()}</div>;
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
          <>
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
                    onClick={() => {
                      setSelectedExpense(row.original);
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
          </>
        );
      },
    },
  ];
};
