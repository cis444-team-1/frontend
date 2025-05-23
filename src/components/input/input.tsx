import React, {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from "react";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import styles from "./input.module.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof InputVariants> {}

export const InputVariants = cva(clsx(styles.input), {
  variants: {
    size: {
      tiny: styles.sizeTiny,
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
      xlarge: styles.sizeXlarge,
    },
  },
  defaultVariants: {
    size: "small",
  },
});

const IconContainerVariants = cva("", {
  variants: {
    size: {
      tiny: styles.svgTiny,
      small: styles.svgSmall,
      medium: styles.svgMedium,
      large: styles.svgLarge,
      xlarge: styles.svgXlarge,
      xxlarge: styles.svgXxlarge,
      xxxlarge: styles.svgXxxlarge,
    },
  },
});

const ShadcnInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "small", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={clsx(InputVariants({ size }), className)}
      />
    );
  }
);

export interface Props
  extends Omit<ComponentProps<typeof ShadcnInput>, "size" | "onCopy"> {
  copy?: boolean;
  onCopy?: () => void;
  icon?: React.ReactNode;
  size?: "tiny" | "small" | "medium" | "large" | "xlarge";
  reveal?: boolean;
  actions?: React.ReactNode;
  iconContainerClassName?: string;
  containerClassName?: string;
}

const Input = forwardRef<
  ElementRef<typeof ShadcnInput>,
  ComponentPropsWithoutRef<typeof ShadcnInput> & Props
>(({ icon, containerClassName, size, ...props }: Props, ref) => {
  return (
    <div className={containerClassName} style={{ position: "relative" }}>
      <ShadcnInput
        ref={ref}
        {...props}
        size={size}
        className={clsx(props.className)}
        style={{
          paddingLeft: icon ? (size === "tiny" ? "2rem" : "3rem") : "",
        }}
      />
      {icon && (
        <div
          className={clsx(styles.icon, IconContainerVariants({ size: size }))}
        >
          {icon}
        </div>
      )}
    </div>
  );
});

export { Input };
