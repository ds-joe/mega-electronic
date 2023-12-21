// Dependencies
import { FCComponent } from "@/types/App";

// Components
import StateIconCard from "@/Components/Cards/StateIconCard";

const StatesCards: FCComponent = ({ pageWords }) => {
  return (
    <>
      <StateIconCard value={`$ 0`} description={"card"} icon={"fa-coins"} time={pageWords?.total} />
      <StateIconCard value={`$ 0`} description={"card"} icon={"fa-coins"} time={pageWords?.total} />
      <StateIconCard value={`$ 0`} description={"card"} icon={"fa-coins"} time={pageWords?.total} />
    </>
  )
}

export default StatesCards;
