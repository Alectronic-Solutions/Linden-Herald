"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";

type Props = {
  subject: string;
  submitLabel: string;
  children: ReactNode;
  note?: string;
};

/**
 * Posts to FormSubmit so the newsroom receives submissions by email.
 * No server, no database, nothing extra to maintain.
 */
export default function HeraldForm({ subject, submitLabel, children, note }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      {/* Honeypot. Hidden from people and from assistive technology alike. */}
      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        aria-label="Leave this field empty"
      />

      {children}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : submitLabel}
        </button>
        <AnimatePresence mode="wait">
          {status === "sent" && (
            <motion.p
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="font-body text-[0.95rem] text-herald"
            >
              Thank you. The newsroom has your message and will follow up.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="font-body text-[0.95rem] text-cherry"
            >
              That did not go through. Please call {site.phone} and we will take it by phone.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {note && (
        <p className="pt-1 font-label text-[0.74rem] uppercase tracking-[0.14em] text-ink-faint">
          {note}
        </p>
      )}
    </form>
  );
}
