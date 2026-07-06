import { useEffect } from "react";
import useTrackerForm from "../hooks/use-tracker-form";
import { Input } from "@/components/ui/input";

/**
 * @param {{
 *  onSubmit: (newTracker: import("@/app/types/tracker").Tracker) => void,
 *  resetForm: boolean;
 *  onResetForm: (b: boolean) => void;
 * }} props 
 * @returns 
 */
export function TrackerForm({ data, onSubmit, resetForm, onResetForm }) {
  const { 
    register, 
    reset, 
    handleSubmit,
    formState: { errors }
  } = useTrackerForm({ data });

  useEffect(() => {
    if (resetForm) reset();
  }, [resetForm])

  return (
    <form id="tracker-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        {errors && errors.title && (
          <span className="block-error my-1">{errors.title.message}</span>
        )}
        <Input
          {...register("title")}
          placeholder="Enter tracker title"
          className={`${errors.title ? "border-red-300" : ""}`}
        />
      </div>
    </form>
  );
}
