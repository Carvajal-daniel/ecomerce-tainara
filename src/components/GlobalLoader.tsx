'use client'

import React from 'react'
import { useLoading } from '@/context/LoadingContext'

const GlobalLoader: React.FC = () => {
  const { loading } = useLoading()

  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-10 h-10 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default GlobalLoader
