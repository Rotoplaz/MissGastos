import * as z from "zod";

export const incomeSchema = z.object({
  amount: z.coerce
    .number()
    .positive("El numero tiene que ser mayor a 0")
    .min(1, "La cantidad es obligatoria"),
  concept: z
    .string()
    .min(1, "El concepto es obligatorio")
    .max(25, "Máximo 25 caracteres"),
  date: z.date({ required_error: "La fecha es obligatoria" }),
});

export type IncomeFormData = z.infer<typeof incomeSchema>;
