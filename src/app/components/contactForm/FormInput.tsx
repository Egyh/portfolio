"use client";

import React from "react";
import styles from "../../styles/Contact.module.css";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
}: FormInputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.formInput} ${error ? styles.formInputError : ""}`}
        required={required}
      />
      {error && <span className={styles.formError}>{error}</span>}
    </div>
  );
}
