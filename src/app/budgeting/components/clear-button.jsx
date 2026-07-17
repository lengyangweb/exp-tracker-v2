import { Button } from "@/components/ui/button";
import { useBudgeting } from "../hooks/use-budget-context";

export default function ClearButton() {
  const { clearBudgetList } = useBudgeting();

  return (
    <Button
      variant="outline"
      onClick={clearBudgetList}
      className="border border-red-500 text-red-500 hover:text-red-500/80 hover:border-red-500/80 hover:bg-white/30"
    >
      Clear List
    </Button>
  );
}
