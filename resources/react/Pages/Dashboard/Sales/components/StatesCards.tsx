// Hooks
import { usePage } from "@inertiajs/react";

// Components
import StateIconCard from "@/Components/Cards/StateIconCard";

// Types
import { SalesProps } from "@/types/Pages/Sales";

const StatesCards: RC = () => {
  const { pageWords, pageData } = usePage().props as ServerProps<SalesProps>;
  const { cash, payment } = pageData.sales_status_cards;
  return (
    <>
      <StateIconCard value={`$ ${cash.total_amount}`} description={pageWords?.cash_amount} icon={"fa-dollar"} time={pageWords?.total} />
      <StateIconCard value={`$ ${cash.total_discount}`} description={pageWords?.cash_discount} icon={"fa-chart-line-down"} time={pageWords?.total} />
      <StateIconCard value={`${cash.total_sales}`} description={pageWords?.cash_sales} icon={"fa-coins"} time={pageWords?.total} />
      <StateIconCard value={`$ ${payment.total_amount}`} description={pageWords?.payment_amount} icon={"fa-coins"} time={pageWords?.total} />
      <StateIconCard value={`$ ${payment.total_discount}`} description={pageWords?.payment_discount} icon={"fa-chart-line-down"} time={pageWords?.total} />
      <StateIconCard value={`${payment.total_sales}`} description={pageWords?.payment_sales} icon={"fa-credit-card"} time={pageWords?.total} />
    </>
  )
}

export default StatesCards;
