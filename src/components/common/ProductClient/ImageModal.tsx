"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  productName: string;
}

const ImageModal: React.FC<Props> = ({ isOpen, onClose, imageUrl, productName }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full h-full max-w-5xl md:max-h-screen max-h-[73vh] p-4 md:p-8">
        <button
          onClick={onClose}
          className="absolute -top-[2px] md:top-4 right-4 z-20 p-2 rounded-full bg-red-400 backdrop-blur-md text-slate-100 hover:bg-white/20 transition-colors"
          title="Fechar (ESC)"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-white shadow-2xl">
          <Image
            fill
            src={imageUrl}
            alt={productName}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
