"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { useDialog } from "@/lib/useDialog";

/**
 * A centred card over a dimmed page. Set in the paper's own furniture: heavy
 * rules, a cherry kicker, no rounded corners.
 *
 * Only rendered while open, so nothing about it reaches the exported HTML and
 * no page ships content hidden behind it.
 */
export default function Modal({
  open,
  onClose,
  kicker,
  title,
  children,
  closeLabel = "Close",
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  kicker?: string;
  title: string;
  children?: ReactNode;
  closeLabel?: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useDialog({ open, dialogRef, onClose, initialFocusRef: closeRef, returnFocusRef });

  if (!open) return null;

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop. A button so a pointer dismissal is also a keyboard one, but
          out of the tab order because Escape and the close button cover that. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/55 backdrop-blur-[2px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full max-w-md border-[3px] border-ink bg-newsprint-white p-8 text-center shadow-lift"
      >
        {kicker && <p className="kicker text-cherry">{kicker}</p>}
        <h2
          id="modal-title"
          className="mt-2 font-display text-3xl font-black leading-tight sm:text-4xl"
        >
          {title}
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-rule-strong" />
        {children && (
          <div className="mt-4 font-body text-[1rem] leading-relaxed text-ink-muted">
            {children}
          </div>
        )}
        <button ref={closeRef} type="button" onClick={onClose} className="btn-primary mt-7 w-full">
          {closeLabel}
        </button>
      </div>
    </div>
  );
}
