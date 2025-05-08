"use client";
import styles from "../styles/editable-title.module.css";

export function EditableTitle({ title }: { title: string }) {
  return (
    <h1 className={styles.title} tabIndex={0}>
      {title}
    </h1>
  );
}
