// Badge.tsx
import React, { useState } from "react";
import styles from "./badge.module.css";
import { X } from "lucide-react";
import clsx from "clsx";

export type BadgeVariant = "full" | "outline";
export type BadgeColorOptions =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "purple"
  | "blue"
  | "indigo"
  | "pink";

const badgeColors: BadgeColorOptions[] = [
  "primary",
  "secondary",
  "danger",
  "warning",
  "success",
  "purple",
  "blue",
  "indigo",
  "pink",
];

export interface BadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColorOptions;
  deleteable?: boolean;
  icon?: React.ReactNode;
  label: string;
  borderRadius?: number;
  onClick?: () => void;
  onDelete?: () => void;
  className?: string;
  selected?: boolean;
  randomColor?: boolean;
  size?: "tiny" | "small" | "medium" | "large" | "xlarge";
}

const sizeVariants = {
  tiny: styles.sizeTiny,
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
  xlarge: styles.sizeXlarge,
};

const svgSizeVariants = {
  tiny: styles.svgTiny,
  small: styles.svgSmall,
  medium: styles.svgMedium,
  large: styles.svgLarge,
  xlarge: styles.svgXlarge,
};

const colorVariants: Record<BadgeVariant, Record<BadgeColorOptions, string>> = {
  full: {
    primary: styles.colorPrimary,
    secondary: styles.colorSecondary,
    danger: styles.colorDanger,
    warning: styles.colorWarning,
    success: styles.colorSuccess,
    purple: styles.colorPurple,
    blue: styles.colorBlue,
    indigo: styles.colorIndigo,
    pink: styles.colorPink,
  },
  outline: {
    primary: styles.outlineColorPrimary,
    secondary: styles.outlineColorSecondary,
    danger: styles.outlineColorDanger,
    warning: styles.outlineColorWarning,
    success: styles.outlineColorSuccess,
    purple: styles.outlineColorPurple,
    blue: styles.outlineColorBlue,
    indigo: styles.outlineColorIndigo,
    pink: styles.outlineColorPink,
  },
};

const Badge: React.FC<BadgeProps> = ({
  variant = "full",
  color = "primary",
  selected = false,
  deleteable = false,
  borderRadius = 4,
  randomColor = false,
  icon,
  label,
  onClick,
  onDelete,
  className,
  size = "medium",
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
    setVisible(false);
  };

  const getRandomBadgeColor = (): BadgeColorOptions => {
    const randomIndex = Math.floor(Math.random() * badgeColors.length);
    return badgeColors[randomIndex] as BadgeColorOptions;
  };

  const BadgeComponent = onClick ? "button" : "div";

  const colorVariant = randomColor ? getRandomBadgeColor() : color;

  return (
    <BadgeComponent
      className={clsx(
        styles.badge,
        className,
        sizeVariants[size],
        colorVariants[variant][colorVariant],
        selected && styles.selected
      )}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {icon && (
        <span className={clsx(styles.icon, svgSizeVariants[size])}>{icon}</span>
      )}
      <span className={styles.label}>{label}</span>
      {deleteable && (
        <span
          className={clsx(styles.delete, svgSizeVariants[size])}
          onClick={handleDelete}
          role="button"
          aria-label="Delete badge"
        >
          <X />
        </span>
      )}
    </BadgeComponent>
  );
};

export default Badge;
