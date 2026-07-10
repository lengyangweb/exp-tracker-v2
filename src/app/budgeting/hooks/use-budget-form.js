import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

// Define the Zod schema
const budgetingSchema = z.object({
  title: z.string({
    required_error: "title is required",
  }).min(4, { message: "Plese enter a valid title" }),
  type: z.string({
    required_error: "type is required",
  }).min(6, { message: 'type must be atleast 6 characters' }),
  category: z.string({
    required_error: "category is required",
  }),
  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number."
  }),
  historyDate: z.coerce.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format."
  }).optional(),
});

// Define dollar schema
export const dollarNumber = z
  .number()
  .finite()
  .refine((v) => Number.isInteger(Math.round(v * 100)), {
    message: "Amount must have at most two decimal places (cents).",
  })
  .refine((v) => v >= 0, { message: "Amount must be non-negative."});

const getDefaultValues = () => {
  return {
      title: '',
      type: 'income',
      category: 'miscellaneous',
      amount: null,
      historyDate: new Date(),
  };
}

export default function useBudegtingForm() {
  const form = useForm({
    resolver: zodResolver(budgetingSchema),
    defaultValues: getDefaultValues(),
  });

  return form;
}