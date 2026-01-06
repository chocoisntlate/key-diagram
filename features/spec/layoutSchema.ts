import { z } from "zod";

export const KeySchema = z.object({
  id: z
    .string()
    .min(1, "Key ID cannot be empty")
    .max(50, "Key ID too long")
    .nullable(),
  label: z
    .string()
    .min(1, "Key label cannot be empty")
    .max(20, "Key label too long"),
  widthScale: z.number().positive().optional(),
});

export const RowSchema = z
  .array(KeySchema)
  .min(1, "A row must have at least one key");

export const LayoutSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  rows: z.array(RowSchema).min(1, "Layout must have at least one row"),
});

export type Layout = z.infer<typeof LayoutSchema>;
