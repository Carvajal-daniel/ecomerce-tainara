import CategoryProduct from "@/components/common/CategoryProduct/CategoryProduct"

interface CategoryProductPageProps {
  params: Promise<{ slug: string }>
}

const CategoryProductPage = async ({params}: CategoryProductPageProps) => {

  const {slug} = await params

  return (
    <div>
      <CategoryProduct slug={slug}/>
    </div>
  )
}

export default CategoryProductPage