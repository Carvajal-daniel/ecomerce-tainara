
import { db } from "@/db";
import NavPage from "./nav";

const Header = async () => {
  const categories = await db.query.categoryTable.findMany();
  const mappedCategories = categories.map(category => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    image: category.imageUrl,
  }));

  return <NavPage categories={mappedCategories} />;
};

export default Header;