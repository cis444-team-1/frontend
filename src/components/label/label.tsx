"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import styles from "./label.module.css";

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`${styles.label} ${required ? styles.required : ""} ${
      className || ""
    }`}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
