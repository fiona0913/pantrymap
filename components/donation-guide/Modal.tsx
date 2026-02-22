"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  overlayClassName,
  contentClassName,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayClasses =
    overlayClassName ??
    "fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/70 backdrop-blur-sm";
  const contentClasses = `bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto${
    contentClassName ? ` ${contentClassName}` : ""
  }`;

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div className={contentClasses} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
