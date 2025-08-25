
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

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      {/* Navigation Section */}
      <NavPage categories={mappedCategories}/>
    </header>
  );
};

export default Header;