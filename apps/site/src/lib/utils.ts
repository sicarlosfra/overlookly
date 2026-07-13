import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Standard shadcn utility — merges Tailwind classes intelligently,
// so conditional/overriding classes don't produce conflicting CSS.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
