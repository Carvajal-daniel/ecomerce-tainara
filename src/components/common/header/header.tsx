'use client'

import { useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"
import UserActions from "./UserActions"
import CartItem from "../cart/cartItem"
import { useLoading } from "@/context/LoadingContext"
import { ChevronDown } from "lucide-react"

interface Product {
  id: string
  name: string
  slug: string
}

interface Category {
  id: string
  name: string
  slug: string
  products: Product[]
}

interface HeaderProps {
  categories: Category[]
}

export default function Header({ categories }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { setLoading } = useLoading()

  // Centraliza o item ativo no scroll mobile
  const scrollToItem = (id: string) => {
    const container = scrollRef.current
    if (!container) return
    const item = container.querySelector(`#${id}`) as HTMLElement | null
    if (item) {
      item.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    }
  }

  // Ao mudar de página, centraliza o item ativo **uma vez**
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (pathname === "/produtos") {
        scrollToItem("category-all")
      } else {
        const slug = pathname.split("/category/")[1]
        if (slug) scrollToItem(`category-${slug}`)
      }
    }, 50)
    return () => clearTimeout(timeout)
  }, [pathname])

  const handleCategoryClick = (slug: string) => {
    setLoading(true)
    router.push(`/category/${slug}`)
  }

  const handleAllClick = () => {
    setLoading(true)
    router.push(`/produtos`)
  }

  return (
    <header className="bg-black/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      {/* Header principal */}
      <div className="py-3 px-3 sm:px-4 lg:px-6 flex items-center justify-between max-w-[100rem] mx-auto">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-white hover:text-rose-400 transition-colors duration-200">
          E-commerce
        </Link>

        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6">
          <div className="md:hidden flex-shrink-0">
            <CartItem />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <DesktopHeader categories={categories} />
            <CartItem />
            <UserActions />
          </div>
          <div className="flex md:hidden items-center">
            <MobileHeader categories={categories} />
          </div>
        </div>
      </div>

      {/* Navegação categorias - DESKTOP */}
      <nav className="hidden md:flex bg-white py-2 relative items-center justify-center">
        <ul className="flex items-center gap-4">
          <li className="relative group">
            <Link
              href="/produtos"
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === "/produtos"
                  ? "text-rose-500 font-bold"
                  : "text-gray-600 hover:text-rose-400"
              }`}
            >
              Todos os Produtos
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </Link>
            

            <ul className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute left-0 top-full mt-2 min-w-56 bg-white border border-gray-200 shadow-lg rounded-md p-2 z-50 max-h-96 overflow-auto">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`block rounded-md px-3 py-2 text-sm transition-all duration-150 ${
                      pathname === `/category/${cat.slug}`
                        ? "text-rose-500 font-medium bg-rose-50"
                        : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link
              href="#"
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === "/produtos"
                  ? "text-rose-500 font-bold"
                  : "text-gray-600 hover:text-rose-400"
              }`}
            >
            
            Comprar pelo whatsapp
            </Link>
          </li>
        </ul>
      </nav>

      {/* Navegação categorias - MOBILE */}
      <nav className="md:hidden sm:flex sm:justify-center sm:items-center justify-center bg-white border-t py-1 border-gray-100">
        <div className="relative w-full">
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          <div ref={scrollRef} className="overflow-x-auto scrollbar-hide py-2 px-3 snap-x">
            <ul className="flex space-x-1 min-w-max">
              <li>
                <button
                  id="category-all"
                  onClick={handleAllClick}
                  className={`inline-block whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 hover:shadow-sm ${
                    pathname === "/produtos"
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  Todos
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    id={`category-${cat.slug}`}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className={`inline-block whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 hover:shadow-sm ${
                      pathname === `/category/${cat.slug}`
                        ? "bg-rose-50 text-rose-600 border border-rose-200"
                        : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
