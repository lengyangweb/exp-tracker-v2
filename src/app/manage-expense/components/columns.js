"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

/** @type {import("@/app/types/tracker").TrackerTableColumn[]} */
const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title");
      return (
        <div className="flex flex-col">
          <span className="font-medium">{title}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      const value = row.getValue("createdAt");
      const date = new Date(value).toLocaleDateString();
      return <div className="text-left font-medium">{date}</div>;
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
                  onClick={() => table.viewRow?.(row)}
                >
                  <span>View</span>
                  <ExternalLink />
                </div>
              </DropdownMenuItem>
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