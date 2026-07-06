import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the Zod schema
const trackerSchema = z.object({
  title: z.string().min(4, { message: "Plese enter a valid title" })
});

/**
 * @param {{ data?: import("../../types/tracker").Tracker }} param
 */
export default function useTrackerForm({ data }) {
  const form = useForm({ 
    resolver: zodResolver(trackerSchema),
    defaultValues: {
      title: data?.title ?? 'Tracker'
    }
  })

  return form;
}