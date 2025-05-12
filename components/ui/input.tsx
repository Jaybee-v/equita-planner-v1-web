"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-[42px] w-full min-w-0 rounded-[4px] border bg-card px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {type === "password" && (
        <span
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Eye />
        </span>
      )}
    </div>
  );
}

export { Input };
