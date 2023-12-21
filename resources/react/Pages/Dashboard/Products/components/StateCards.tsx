// Components
import StateIconCard from "@/Components/Cards/StateIconCard";

// Types
import { FCComponent } from "@/types/App";
import { StateCardsProps } from "@/types/Pages/Products";


const StateCards: FCComponent<StateCardsProps> = ({ pageWords, products, categories, brands }) => {
  return (
    <>
      <StateIconCard value={products} description={pageWords?.products} icon={"fa-shopping-cart"} time={pageWords?.total} />
      <StateIconCard value={categories} description={pageWords?.categories} icon={"fa-gift"} time={pageWords?.total} />
      <StateIconCard value={brands} description={pageWords?.brands} icon={"fa-check"} time={pageWords?.total} />
    </>
  )
}

export default StateCards;
