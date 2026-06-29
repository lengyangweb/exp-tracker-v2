"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import { Trash2 } from "lucide-react";

const DeleteTrackerButton = ({ trackerId, setRefetch }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/tracker/${trackerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // Include any necessary body data here
      });
      const data = await response.json();
      if (data.success) {
        // Handle successful deletion (e.g., redirect or show a message)
        router.push("/manage-expense"); // Redirect to the main manage expense page
        setRefetch(true); // Trigger refetch in parent component
        setShowConfirm(false); // Close the modal
      } else {
        // Handle failure (e.g., show an error message)
        console.error("Failed to delete tracker:", data.message);
      }
    } catch (error) {
      console.error("Error deleting tracker:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setShowConfirm(true)}>
        <span className="text-sm">Delete Tracker</span>
      </Button>
      {showConfirm && (
        <ConfirmModal
          title="Delete Expense Tracker"
          description="Are you sure you want to delete this expense tracker? This action cannot be undone."
          show={showConfirm}
          setShow={setShowConfirm}
          action={handleDelete}
          isProcessing={isDeleting}
          buttonText="Yes, Delete"
        />
      )}
    </>
  );
};

export default DeleteTrackerButton;
