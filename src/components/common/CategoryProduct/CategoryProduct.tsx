import React from 'react'
import HeaderWrapper from '../header/HeaderWrapper'

interface CategoryProductProps {
  slug: string
}

const CategoryProduct = ({slug}: CategoryProductProps) => {
  return (
    <div>
      <HeaderWrapper/>
      <h1>{slug}</h1>
    </div>
  )
}

export default CategoryProduct