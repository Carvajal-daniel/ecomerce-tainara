
import HeaderWrapper from '@/components/common/header/HeaderWrapper'
import PaginaDePerfilServer from '@/components/common/perfil/PaginaDePerfilServer'
import React from 'react'

const PerfilPage = () => {
  return (
    <>
      <HeaderWrapper/>
    <div className="min-h-screen bg-gray-100 px-3 md:px-0  pt-3">
      <PaginaDePerfilServer />
    </div>
    </>
  )
}

export default PerfilPage
