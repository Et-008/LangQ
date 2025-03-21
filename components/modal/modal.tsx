"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function CustomModal({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {

    const portalRoot = document.getElementById("portal-root")

    function handler(e: KeyboardEvent) {
        if (e.key === "Escape") onClose();
    }

    useEffect(() => {
        document.addEventListener("keydown", handler);
        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, [onClose]);

    if (!portalRoot) {
        console.error("Portal root not found");
        return null;
    }

    return isOpen
        ? createPortal(
            <div>
                <div className="modal-overlay show" onClick={onClose} />
                <div>{children}</div>
            </div>,
            portalRoot
        )
        : null;
}
