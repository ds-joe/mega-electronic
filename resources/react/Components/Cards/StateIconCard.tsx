// Components
import { Card } from "react-bootstrap";

// Types
import { StateIconCardProps } from "@/types/Components/Cards/StateIconCard";

const StateIconCard: RC<StateIconCardProps> = ({ value, description, icon, time }) => {

  return (
    <Card className="pf-state-icon-card">
      <Card.Body className="pf-state-icon-card-body">
        <div className="pf-state-icon-card-state-area">
          <h3 className={`pf-state-icon-card-value `}>{value}</h3>
          <p className="pf-state-icon-card-description ">{description}</p>
        </div>
        <div className="pf-state-icon-card-icon-area">
          <i className={`fal ${icon}  pf-state-icon-card-icon `} />
        </div>
      </Card.Body>
      <Card.Footer className="pf-state-icon-card-footer">
        <div className="pf-state-icon-card-time-area">
          <i className="far fa-clock" />
          {time}
        </div>
      </Card.Footer>
    </Card>
  )
}

export default StateIconCard;
