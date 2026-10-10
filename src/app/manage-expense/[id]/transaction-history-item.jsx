'use client';

import moment from "moment";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategoryLabel } from "@/constant";
import { Badge } from "@/components/ui/badge";

const typeClassNames = {
  income: "text-green-700",
  expense: "text-red-700",
  others: "text-muted-foreground",
};

/**
 * @param {{
 *  history: import('@/app/types/history').History;
 *  onEdit: (history: import('@/app/types/history').History) => void;
 *  onDelete: (history: import('@/app/types/history').History) => void;
 *  muted?: boolean;
 * }} props
 */
const TransactionHistoryItem = ({ history, onEdit, onDelete, muted = false }) => {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(history.amount));
  const amountPrefix = history.type === "income" ? "+" : history.type === "expense" ? "−" : "";
  const amountColor = history.type === "income"
    ? "text-green-700"
    : history.type === "expense"
      ? "text-red-700"
      : "text-foreground";
  const transactionDate = moment(history.historyDate);

  return (
    <article className={`flex min-w-0 items-center justify-between gap-3 rounded-lg border p-3 ${muted ? "bg-muted/60" : "bg-background"}`}>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <time
          className="text-xs text-muted-foreground"
          dateTime={transactionDate.toISOString() ?? undefined}
        >
          {transactionDate.format("MMM DD, YYYY")}
        </time>
        <span className="truncate text-sm font-medium">{history.title}</span>
        <div className="flex min-w-0 items-center gap-2">
          <Badge variant="outline" className={`shrink-0 text-[10px] uppercase ${typeClassNames[history.type]}`}>
            {history.type}
          </Badge>
          <Badge variant="secondary" className="min-w-0 truncate text-xs">
            {getCategoryLabel(history.category)}
          </Badge>
          <span className={`shrink-0 text-sm font-semibold ${amountColor}`}>
            {amountPrefix}{amount}
          </span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Actions for ${history.title}`}
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(history)}>
            <Pencil />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => onDelete(history)}
          >
            <Trash2 />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
};

export default TransactionHistoryItem;
