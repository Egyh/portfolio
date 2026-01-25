"use client";

import React from "react";
import styles from "../../styles/Contact.module.css";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  required?: boolean;
}

export function FormTextarea({
  id,
  name,
  label,
  value,
  onChange,
  error,
  rows = 6,
  required = false,
}: FormTextareaProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.formTextarea} ${error ? styles.formInputError : ""}`}
        rows={rows}
        required={required}
      />
      {error && <span className={styles.formError}>{error}</span>}
    </div>
  );
}
