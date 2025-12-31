import * as z from "zod";

export const ShortcutSchema = z.object({
  keyCombination: z.string().min(1).max(50), // TODO: validate this
  description: z.array(z.string().min(1).max(100)).min(1).max(10), // For conflicting keybinds
  category: z.string().max(300).optional(),
});

export const KeyDiagramSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  createdAt: z.date(),
  // updatedAt: z.date(),

  shortcuts: z.array(ShortcutSchema),
});

export type KeyDiagramDocument = z.infer<typeof KeyDiagramSchema>;
