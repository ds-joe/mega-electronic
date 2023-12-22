// Components
import StateIconCard from "@/Components/Cards/StateIconCard";

// Hooks
import { usePage } from "@inertiajs/react";

// Types
import { ProductsProps } from "@/types/Pages/Products";


const StatusCards: RC = () => {
  const { pageWords, pageData } = usePage().props as ServerProps<ProductsProps>;
  const { products, categories, brands } = pageData.status_cards;
  return (
    <>
      <StateIconCard value={products} description={pageWords?.products} icon={"fa-shopping-cart"} time={pageWords?.total} />
      <StateIconCard value={categories} description={pageWords?.categories} icon={"fa-gift"} time={pageWords?.total} />
      <StateIconCard value={brands} description={pageWords?.brands} icon={"fa-check"} time={pageWords?.total} />
    </>
  )
}

export default StatusCards;
