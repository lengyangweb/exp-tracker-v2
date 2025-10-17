'use client'

import { toast } from "sonner";
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner";

export default function TrackerList() {
  const [isLoading, setIsLoading] = useState(false);
  const [trackers, setTrackers] = useState([]);

  useEffect(() => {
    async function getTrackers() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/tracker');
        if (!response.ok) return toast.error('Something went wrong');
        const result = await response.json();
        setTrackers(result);
        console.log(result);
      } catch (error) {
        console.error('Get trackers error', error);
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    }

    getTrackers();
  }, []);

  if (isLoading) return (
    <div className="flex flex-col items-center gap-2">
      <Spinner />
      <span>Loading...</span>
    </div>
  )

  if (!trackers) return <span>No results.</span>

  return (
    <div>
      {trackers.map((tracker) => (
        <div>{tracker.title}</div>
      ))}
    </div>
  )
}