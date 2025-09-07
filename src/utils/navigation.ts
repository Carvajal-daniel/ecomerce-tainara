// Utilitários de navegação
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import { ROUTES } from "@/constants";

export const useNavigation = () => {
  const router = useRouter();
  const { setLoading } = useLoading();

  const navigateToProduct = (slug: string) => {
    setLoading(true);
    router.push(ROUTES.product(slug));
  };

  const navigateToCategory = (slug: string) => {
    setLoading(true);
    router.push(ROUTES.category(slug));
  };

  const navigateToProducts = () => {
    setLoading(true);
    router.push(ROUTES.products);
  };

  const navigateToCheckout = () => {
    router.push(ROUTES.checkout);
  };

  const navigateBack = () => {
    router.back();
  };

  return {
    navigateToProduct,
    navigateToCategory,
    navigateToProducts,
    navigateToCheckout,
    navigateBack,
  };
};

export const handleProductClick = (
  productId: string,
  productSlug: string,
  setLoadingCard: (id: string | null) => void,
  navigateToProduct: (slug: string) => void
) => {
  setLoadingCard(productId);
  navigateToProduct(productSlug);
};
