import * as z from "zod";

export const ShortcutSchema = z.object({
  id: z.string().min(1).max(50),
  description: z.array(z.string().min(1).max(100)).min(1).max(10), // For conflicting keybinds

  keys: z.array(z.string().min(1).max(50)).min(1).max(5),
  displayKey: z.string().min(1).max(100),
  tag: z.string().max(100).optional(),  
});

export const KeyDiagramSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  shortcuts: z.array(ShortcutSchema).min(1),
});

export type KeyDiagram = z.infer<typeof KeyDiagramSchema>;