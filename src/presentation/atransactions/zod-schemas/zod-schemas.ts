import * as z from "zod";

const cashSchema = z.object({
  type: z.literal("cash"),
});

const creditCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastFourDigits: z.string().length(4, "Debe tener 4 dígitos"),
  debt: z.number().nonnegative(),
  creditLimit: z.number().nonnegative(),
  dueDate: z.date(),
  type: z.literal("credit"),
});

const debitCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastFourDigits: z.string().length(4, "Debe tener 4 dígitos"),
  debt: z.number().nonnegative(),
  currentBalance: z.number().nonnegative(),
  limitDebit: z.number().nonnegative(),
  type: z.literal("debit"),
});

const paymentMethodSchema = z.union([
  cashSchema,
  creditCardSchema,
  debitCardSchema,
]);

const categorySchema = z.object({
  id: z.number(),
  icon: z.string(),
  color: z.string(),
  type: z.string(),
});

export const zodSchemaTransaction = z.object({
  amount: z.coerce
    .number()
    .nonnegative()
    .min(1, "El número tiene que ser válido."),
  concept: z.string().optional().default(""),
  selectedCategory: categorySchema
    .nullable()
    .refine((val) => val !== null, {
      message: "Por favor, selecciona una categoría.",
    }),
  paymentMethod: paymentMethodSchema
    .nullable()
    .refine((val) => val !== null, {
      message: "Por favor, selecciona un método de pago.",
    }),
});