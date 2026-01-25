"use client";

import React, { useState } from "react";
import { useLanguage } from "../LanguageProvider";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { contactSchema, ContactFormData } from "../../lib/validations/contactSchema";
import styles from "../../styles/Contact.module.css";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateField = async (name: keyof ContactFormData, value: string) => {
    try {
      await contactSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    try {
      await contactSchema.validate(formData, { abortEarly: false });

      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setStatusMessage(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.message);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "ValidationError") {
        const validationError = error as { inner?: Array<{ path?: string; message: string }> };
        const fieldErrors: FormErrors = {};
        validationError.inner?.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path as keyof FormErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
        setStatus("idle");
      } else {
        setStatus("error");
        setStatusMessage("送信に失敗しました。しばらく経ってからお試しください。");
      }
    }
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <FormInput
        id="name"
        name="name"
        label={t("contact.name")}
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <FormInput
        id="email"
        name="email"
        label={t("contact.email")}
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <FormTextarea
        id="message"
        name="message"
        label={t("contact.message")}
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        required
      />

      {status === "success" && (
        <div className={styles.formSuccess}>{statusMessage}</div>
      )}

      {status === "error" && (
        <div className={styles.formErrorMessage}>{statusMessage}</div>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "送信中..." : t("contact.send")}
      </button>
    </form>
  );
}
