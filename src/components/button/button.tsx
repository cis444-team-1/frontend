"use client";

import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cloneElement, forwardRef, isValidElement } from "react";
import { clsx } from "clsx";
import styles from "./button.module.css";

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
const buttonVariants = cva(styles.baseButton, {
  variants: {
    type: {
      primary: styles.typePrimary,
      default: styles.typeDefault,
      secondary: styles.typeSecondary,
      outline: styles.typeOutline,
      dashed: styles.typeDashed,
      link: styles.typeLink,
      text: styles.typeText,
      danger: styles.typeDanger,
      warning: styles.typeWarning,
    },
    block: {
      true: styles.block,
    },
    size: {
      tiny: styles.sizeTiny,
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
      xlarge: styles.sizeXlarge,
    },
    overlay: {
      base: styles.overlayBase,
      container: styles.overlayContainer,
    },
    disabled: {
      true: styles.disabled,
    },
    rounded: {
      true: styles.roundedFull,
    },
    defaultVariants: {
      variant: "default",
      size: "small",
    },
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
    type: {
      primary: "color: var(--brand-600);",
      default: "color: var(--foreground-lighter);",
      secondary: "color: var(--border-muted);",
      outline: "color: var(--foreground-lighter);",
      dashed: "color: var(--foreground-lighter);",
      link: "color: var(--brand-600);",
      text: "color: var(--foreground-muted);",
      danger: "color: var(--destructive-600);",
      warning: "color: var(--warning-600);",
    },
  },
});

export type LoadingVariantProps = VariantProps<typeof loadingVariants>;
const loadingVariants = cva("", {
  variants: {
    type: {
      primary: "color: var(--brand-600);",
      default: "color: var(--foreground-lighter);",
      secondary: "color: var(--border-muted);",
      outline: "color: var(--foreground-lighter);",
      dashed: "color: var(--foreground-lighter);",
      link: "color: var(--brand-600);",
      text: "color: var(--foreground-muted);",
      danger: "color: var(--destructive-600);",
      warning: "color: var(--warning-600);",
    },
    loading: {
      default: "",
      true: `animate-spin`,
    },
  },
});

export interface ButtonProps
  // omit `type` as we use it to change type of button
  // replaced with `htmlType`
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    // omit 'disabled' as it is included in HTMLButtonElement
    Omit<ButtonVariantProps, "disabled">,
    Omit<LoadingVariantProps, "type"> {
  asChild?: boolean;
  type?: ButtonVariantProps["type"];
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  rounded?: boolean;
}
/**
 * Button component is a versatile UI element that provides various styles and functionalities.
 *
 * @param {boolean} [asChild=false] - Determines if the button should render as a child component.
 * @param {string} [size='tiny'] - Specifies the size variant of the button.
 * @param {string} [type='primary'] - Sets the style type of the button.
 * @param {React.ReactNode} children - The content to be displayed within the button.
 * @param {boolean} [loading] - Indicates if the button is in a loading state.
 * @param {boolean} [block] - If true, the button will take the full width of its container.
 * @param {React.ReactNode} [icon] - An optional icon to be displayed with the button text.
 * @param {React.ReactNode} [iconRight] - An optional icon to be displayed on the right side.
 * @param {React.ReactNode} [iconLeft] - An optional icon to be displayed on the left side.
 * @param {string} [htmlType='button'] - The HTML type attribute for the button element.
 * @param {boolean} [rounded] - If true, the button will have rounded corners.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - Additional props for the button.
 * @param {React.LegacyRef<HTMLButtonElement>} ref - A ref that points to the button element.
 * @return {JSX.Element} A styled button component with customizable options.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      size = "tiny",
      type = "primary",
      children,
      loading,
      block,
      icon,
      iconRight,
      iconLeft,
      htmlType = "button",
      rounded,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const { className } = props;
    const showIcon = loading || icon;
    const _iconLeft: React.ReactNode = icon ?? iconLeft;
    const disabled = loading === true || props.disabled;

    return (
      <Comp
        ref={ref}
        data-size={size}
        type={htmlType}
        {...props}
        disabled={disabled}
        className={clsx(
          buttonVariants({ type, size, disabled, block, rounded }),
          className
        )}
      >
        {asChild ? (
          isValidElement(children) ? (
            cloneElement(
              children,
              undefined,
              showIcon &&
                (loading ? (
                  <div className={clsx(IconContainerVariants({ size, type }))}>
                    <Loader2
                      className={clsx(loadingVariants({ loading, type }))}
                    />
                  </div>
                ) : _iconLeft ? (
                  <div className={clsx(IconContainerVariants({ size, type }))}>
                    {_iconLeft}
                  </div>
                ) : null),
              // @ts-expect-error TODO: children.props is always known
              children.props.children && (
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {
                    // @ts-expect-error TODO: children.props is always known
                    children.props.children
                  }
                </span>
              ),
              iconRight && !loading && (
                <div className={clsx(IconContainerVariants({ size, type }))}>
                  {iconRight}
                </div>
              )
            )
          ) : null
        ) : (
          <>
            {showIcon &&
              (loading ? (
                <div
                  className={clsx(
                    IconContainerVariants({ size, type }),
                    styles.iconContainer
                  )}
                >
                  <Loader2
                    className={clsx(loadingVariants({ loading, type }))}
                  />
                </div>
              ) : _iconLeft ? (
                <div
                  className={clsx(
                    IconContainerVariants({ size, type }),
                    styles.iconContainer
                  )}
                >
                  {_iconLeft}
                </div>
              ) : null)}{" "}
            {children && <span className={"truncate"}>{children}</span>}{" "}
            {iconRight && !loading && (
              <div
                className={clsx(
                  IconContainerVariants({ size, type }),
                  styles.iconContainer
                )}
              >
                {iconRight}
              </div>
            )}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
