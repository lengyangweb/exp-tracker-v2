import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

// Define the Zod schema
const budgetingSchema = z.object({
  amount: z.coerce.number({
    required_error: "Budget amount is required",
    invalid_type_error: "Budget amount must be a number."
  }).min(1, { message: "Budget amount must be greater than 0" }),
});

// Define dollar schema
export const dollarNumber = z
  .number()
  .finite()
  .refine((v) => Number.isInteger(Math.round(v * 100)), {
    message: "Amount must have at most two decimal places (cents).",
  })
  .refine((v) => v >= 0, { message: "Amount must be non-negative."});

/**
 * @param {import("@/app/types/budget").Budget} data 
 * @returns {import("@/generated/prisma").Budget}
 */
const getDefaultValues = (data) => {
  return {
      amount: data?.amount || 0,
  };
}

/**
 * @param {Object} props 
 * @param {import("@/app/types/budget").Budget} [props.data]
 */
export default function useBudegtingForm({ data }) {
  const form = useForm({
    resolver: zodResolver(budgetingSchema),
    defaultValues: getDefaultValues(data),
  });

  return form;
}