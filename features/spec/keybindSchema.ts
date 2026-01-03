import * as z from "zod";

export const ShortcutSchema = z.object({
  keys: z.array(z.string().min(1).max(50)).min(1).max(5),
  description: z.array(z.string().min(1).max(100)).min(1).max(10), // For conflicting keybinds

  displayKey: z.string().min(1).max(100),
  tag: z.string().max(100).optional(),  
});

export const KeyDiagramSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  createdBy: z.string().max(100).optional(),

  shortcuts: z.array(ShortcutSchema).min(1),
});

export type KeyDiagram = z.infer<typeof KeyDiagramSchema>;
export type Shortcut = KeyDiagram["shortcuts"][number];