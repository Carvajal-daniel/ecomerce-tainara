"use client";
import Link from "next/link";

export default function HeaderAuth() {
  return (
    <header className="bg-gradient-to-r from-white via-gray-50 to-white sticky top-0 z-50 border-b border-gray-200 shadow-md">
      <div className="py-5 px-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl text-gray-800 hover:text-rose-500 transition-colors duration-300"
        >
          E-commerce
        </Link>

        {/* Opcional: botão de ajuda ou link extra */}
        <div className="hidden sm:flex gap-4">
          <Link
            href="/help"
            className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200"
          >
            Ajuda
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200"
          >
            Contato
          </Link>
        </div>
      </div>
    </header>
  );
}
