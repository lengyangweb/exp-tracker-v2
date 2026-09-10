"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoadRecurring } from "@/app/recurring/use-load-recurring";
import { getRemainingOccurrencesInMonth } from "@/utils/recurring";
import { Skeleton } from "../ui/skeleton";

export default function RemainingRecurringCard() {
  const { recurring, isLoading, error } = useLoadRecurring();
  const occurrences = getRemainingOccurrencesInMonth(recurring);

  return (
    <Card className="w-full h-68">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Upcoming Recurring</CardTitle>
        <Link
          href="/recurring"
          aria-label="View all recurring expenses"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div
            role="status"
            aria-label="Loading upcoming recurring expenses"
            className="max-h-50 space-y-3 overflow-hidden"
          >
            <span className="sr-only">Loading upcoming recurring expenses</span>
            <div aria-hidden="true" className="space-y-3">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-4 w-16 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
        {!isLoading && error && (
          <p className="text-sm text-destructive">Unable to load recurring expenses.</p>
        )}
        {!isLoading && !error && occurrences.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No recurring expenses remain this month.
          </p>
        )}
        {!isLoading && !error && occurrences.length > 0 && (
          <div className="max-h-50 space-y-3 overflow-y-auto">
            {occurrences.map((occurrence, index) => (
              <div
                key={`${occurrence.id}-${occurrence.occurrenceDate.toISOString()}-${index}`}
                className="flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{occurrence.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {occurrence.occurrenceDate.toLocaleDateString()}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-medium">
                  ${Number(occurrence.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}