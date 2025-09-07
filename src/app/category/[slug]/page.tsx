
import CategoryProduct from "@/components/common/CategoryProducts/CategoryProduct"
import PageWrapper from "@/components/PageWrapper"

interface CategoryProductPageProps {
  params: Promise<{ slug: string }>
}

const CategoryProductPage = async ({params}: CategoryProductPageProps) => {

  const {slug} = await params

  return (
    <PageWrapper>
      <CategoryProduct slug={slug}/>
    </PageWrapper>
  )
}

export default CategoryProductPage