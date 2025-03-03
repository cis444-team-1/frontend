import { motion } from "framer-motion";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

interface AudioLinesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const AudioLinesIcon = forwardRef<HTMLDivElement, AudioLinesIconProps>(
  ({ size = 28 }, _) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 10v3" />
        <motion.path
          variants={{
            animate: {
              d: ["M6 6v11", "M6 10v3", "M6 6v11"],
              transition: {
                duration: 1.5,
                repeat: Infinity,
              },
            },
          }}
          d="M6 6v11"
          animate="animate"
        />
        <motion.path
          variants={{
            animate: {
              d: ["M10 3v18", "M10 9v5", "M10 3v18"],
              transition: {
                duration: 1,
                repeat: Infinity,
              },
            },
          }}
          d="M10 3v18"
          animate="animate"
        />
        <motion.path
          variants={{
            animate: {
              d: ["M14 8v7", "M14 6v11", "M14 8v7"],
              transition: {
                duration: 0.8,
                repeat: Infinity,
              },
            },
          }}
          d="M14 8v7"
          animate="animate"
        />
        <motion.path
          variants={{
            animate: {
              d: ["M18 5v13", "M18 7v9", "M18 5v13"],
              transition: {
                duration: 1.5,
                repeat: Infinity,
              },
            },
          }}
          d="M18 5v13"
          animate="animate"
        />
        <path d="M22 10v3" />
      </svg>
    );
  }
);

AudioLinesIcon.displayName = "AudioLinesIcon";

export { AudioLinesIcon };
