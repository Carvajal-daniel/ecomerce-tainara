import React from 'react'

const CategoryPage = ({ params }: { params: { slug: string }}) => {

  const { slug } = params

  return (
    <div>
      <h1>Category: {slug}</h1>
    </div>
  )
}

export default CategoryPage