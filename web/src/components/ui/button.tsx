import { tv, type VariantProps } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default:
        "bg-zinc-900 text-zinc-50 shadow shadow-shape-content hover:bg-zinc-800",
      ghost: "hover:bg-zinc-800 hover:text-zinc-50",
    },
    size: {
      default: "h-9 px-3",
      sm: "h-8 px-2 text-xs",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
