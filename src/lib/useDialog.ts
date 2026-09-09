"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Options = {
  /** Whether the dialog is currently open. */
  open: boolean;
  /** The dialog element. Tab is kept inside it. */
  dialogRef: RefObject<HTMLElement>;
  /** Called on Escape and on backdrop dismissal. */
  onClose: () => void;
  /** Focused when the dialog opens. Falls back to the first focusable child. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /**
   * Focused when the dialog closes. Worth passing whenever the control that
   * opened the dialog may have lost focus in the meantime — a submit button
   * disabled while the request is in flight has already handed focus back to
   * the body by the time the dialog mounts, so capturing activeElement finds
   * nothing to return to.
   */
  returnFocusRef?: RefObject<HTMLElement | null>;
};

/**
 * The behaviour a modal dialog owes a keyboard or screen-reader user: the page
 * behind it stops scrolling, Tab cannot leave it, Escape closes it, and focus
 * returns to whatever opened it.
 *
 * Written once because it is subtle and easy to get half-right. The mobile
 * navigation drawer and the form confirmation card both use it.
 */
export function useDialog({ open, dialogRef, onClose, initialFocusRef, returnFocusRef }: Options) {
  useEffect(() => {
    if (!open) return;

    // Resolved now rather than in the cleanup: the element that should get
    // focus back is the one that existed when the dialog opened, and reading a
    // ref during teardown is a well-known way to get a stale or null node.
    const active = document.activeElement as HTMLElement | null;
    const returnTo = returnFocusRef?.current ?? active;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // A frame's grace so the element is painted and focusable.
    const timer = window.setTimeout(() => {
      const target =
        initialFocusRef?.current ?? dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    }, 60);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
      if (returnTo && returnTo !== document.body) returnTo.focus?.();
    };
    // onClose is expected to be stable; the dialog opens and closes on `open`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}
