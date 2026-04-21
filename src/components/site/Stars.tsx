import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const Stars = ({ value, size = "sm" }: { value: number; size?: "sm" | "md" | "lg" }) => {
  const px = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(px, i <= Math.round(value) ? "fill-gold text-gold" : "text-muted-foreground/30")}
        />
      ))}
    </div>
  );
};