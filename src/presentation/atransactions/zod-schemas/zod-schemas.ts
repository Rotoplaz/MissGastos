import * as z from "zod";

// Definición de la interfaz BaseCard
const baseCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastFourDigits: z.string().length(4, "Debe tener 4 dígitos"),
  debt: z.number().nonnegative(),
});

// Esquema para CreditCard, extendiendo BaseCard
const creditCardSchema = baseCardSchema.extend({
  creditLimit: z.number().nonnegative(),
  dueDate: z.coerce.date(),
  type: z.literal("credit"),
  limitDebit: z.null(),  // limitDebit es null para CreditCard
});

// Esquema para DebitCard, extendiendo BaseCard
const debitCardSchema = baseCardSchema.extend({
  currentBalance: z.number().nonnegative(),
  limitDebit: z.number().nonnegative(),
  type: z.literal("debit"),
});

// Esquema para Cash
const cashSchema = z.object({
  type: z.literal("cash"),
});

// Unir los tres esquemas (CreditCard, DebitCard, Cash)
const paymentMethodSchema = z.union([
  creditCardSchema,
  debitCardSchema,
  cashSchema,
]);

// Esquema para la categoría
const categorySchema = z.object({
  id: z.number(),
  icon: z.string(),
  color: z.string(),
  type: z.string(),
});

// Esquema para la transacción
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
