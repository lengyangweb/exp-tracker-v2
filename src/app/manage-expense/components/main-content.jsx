"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "./pagination";
import { DataTable } from "./data-table";
import { useTracker } from "../hooks/use-tracker-context";
import { useTrackerTable } from "../hooks/use-tracker-table";
import { SiteFooter } from "@/components/shared/site-footer";
import UpdateTrackerModal from "./update-tracker-modal";
import { RecurringSkeleton } from "@/app/recurring/components/recurring-skeleton";

export function MainContent() {
  const { data, loading, error, loadTrackers, removeTracker } = useTracker();
  const router = useRouter();
  const table = useTrackerTable({ data, pageSize: 13 });
  const [selected, setSelected] = useState(null);
  const [showTrackerForm, setShowTrackerForm] = useState(false);

  useEffect(() => {
    loadTrackers();
  }, []);

  if (error) return <p>{error}</p>;
  if (loading) return <RecurringSkeleton />
  
  async function handleTrackerDelete(trackerId) {
    try {
      await removeTracker(trackerId);
      toast.success('Tracker remove successfully.');
    } catch (error) {
      console.error(`Something went wrong while deleting tracker.`)
      toast.error(`Something went wrong while deleting tracker.`);
    }
  }

  const viewTracker = (trackerId) => {
    if (!trackerId) return;
    return router.push(`/manage-expense/${trackerId}`);
  }

  return (
    <div className="w-full h-full">
      <div className="p-4">
        <DataTable
          table={table}
          setSelected={setSelected}
          setShowTrackerForm={setShowTrackerForm}
          handleDeleteTracker={handleTrackerDelete}
          viewTracker={viewTracker}
        />
        <UpdateTrackerModal
          show={showTrackerForm}
          setShow={setShowTrackerForm}
          setRefetch={null}
          editTracker={selected}
          setEditTracker={setSelected}
        />
      </div>
      <SiteFooter>
        <Pagination table={table} showRowPerPage={false} />
      </SiteFooter>
    </div>
  );
}
