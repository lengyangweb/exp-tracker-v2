import z from "zod";

// The Zod schema for reoccurring expense form
export const recurringSchema = z.object({
  title: z.string().min(4, { message: "Please enter a valid title" }),
  amount: z.coerce.number({ 
    invalid_type_error: "Amount must be a valid number" 
  })
  .positive("Amount must be greater than 0")
  .multipleOf(0.01, "Only two decimal places allowed"), // Validates precision
  frequency: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  category: z.string({ required_error: "Category is required" }).min(1, "Category is required"),
  startDate: z.date({ required_error: "Start date is required" }),
});
