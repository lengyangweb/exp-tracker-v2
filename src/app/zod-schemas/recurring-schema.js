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
  startDate: z.date({ required_error: "Start date is required" }),
});
