import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";

export function ReoccurringForm({ open, setOpen, reoccurringExpense }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent className="fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
        <DialogTitle className="text-lg font-medium mb-4">Re-Occurring Expense Details</DialogTitle>
        {reoccurringExpense ? (
          <div>
            <p><strong>Title:</strong> {reoccurringExpense.title}</p>
            <p><strong>Amount:</strong> ${reoccurringExpense.amount}</p>
            <p><strong>Frequency:</strong> {reoccurringExpense.frequency}</p>
            <p><strong>Next Occurrence:</strong> {new Date(reoccurringExpense.nextOccurrence).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No re-occurring expense selected.</p>
        )}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}