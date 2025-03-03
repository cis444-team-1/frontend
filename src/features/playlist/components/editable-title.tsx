"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "../../../components/input/input";
import styles from "../styles/editable-title.module.css";

export function EditableTitle({
  playlistId,
  initialName,
}: {
  playlistId: string;
  initialName: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "submitting",
      name,
      playlistId,
      "from",
      inputRef.current?.value
    );
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setIsEditing(false)}
        />
      </form>
    );
  }

  return (
    <h1
      className={styles.title}
      onClick={() => setIsEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          setIsEditing(true);
        }
      }}
      tabIndex={0}
    >
      {name}
    </h1>
  );
}
