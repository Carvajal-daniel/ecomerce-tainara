"use client";
import Link from "next/link";

export default function HeaderAuth() {
  return (
    <header className="bg-gradient-to-r  from-slate-800/90 via-purple-800/90 to-slate-800/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 shadow-md">
      <div className="py-5 px-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl text-white hover:text-rose-200 transition-colors duration-300"
        >
          E-commerce
        </Link>

        {/* Opcional: botão de ajuda ou link extra */}
        <div className="hidden sm:flex gap-4">
          <Link
            href="/help"
            className="text-white hover:text-gray-800 text-sm font-medium transition-colors duration-200"
          >
            Ajuda
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-gray-800 text-sm font-medium transition-colors duration-200"
          >
            Contato
          </Link>
        </div>
      </div>
    </header>
  );
}
