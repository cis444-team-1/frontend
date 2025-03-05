import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import clsx from "clsx";
import styles from "./scroll-area.module.css";
import { Button } from "../button/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CustomScrollAreaProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> & {
  showControls?: boolean;
  onShowMore?: () => void;
  title?: string;
};

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  CustomScrollAreaProps
>(
  (
    {
      className,
      title = "",
      showControls = false,
      onShowMore,
      children,
      ...props
    },
    ref
  ) => {
    const viewportRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
      if (!viewportRef.current) return;

      const { clientWidth, scrollLeft } = viewportRef.current;
      const scrollAmount = clientWidth * 0.8;

      const newScrollPosition =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      viewportRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    };

    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        className={clsx(styles.root, className)}
        {...props}
      >
        {(showControls || title) && (
          <div className={styles.header}>
            {title && <p className={styles.title}>{title}</p>}
            {showControls && (
              <div className={styles.controls}>
                <Button
                  type="default"
                  size="large"
                  onClick={onShowMore}
                  className={styles.moreButton}
                >
                  More
                </Button>
                <Button
                  icon={<ChevronLeft />}
                  type="default"
                  size="large"
                  onClick={() => scroll("left")}
                  className={styles.controlButton}
                />
                <Button
                  icon={<ChevronRight />}
                  type="default"
                  size="large"
                  onClick={() => scroll("right")}
                  className={styles.controlButton}
                />
              </div>
            )}
          </div>
        )}
        <ScrollAreaPrimitive.Viewport
          ref={viewportRef}
          className={styles.viewport}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  }
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={clsx(
      styles.scrollbar,
      orientation === "vertical" && styles.scrollbarVertical,
      orientation === "horizontal" && styles.scrollbarHorizontal,
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className={styles.scrollbarThumb} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
