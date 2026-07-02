import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function AddRecurringButton({ onClick }) {
  return (
    <Button className="self-end" size="sm" variant="outline" onClick={onClick}>
      <div className="flex justify-between items-center">
        <span>New Recurring</span>
        <PlusIcon className="ml-2 h-4 w-4" />
      </div>
    </Button>
  );
}
