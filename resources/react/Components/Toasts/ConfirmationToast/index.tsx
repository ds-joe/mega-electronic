// Components
import { FormGroup, Button } from "react-bootstrap";

// Types
import { ConfirmationToastProps } from "@/types/Hooks/Toasts";

const ConfirmationToast: RC<ConfirmationToastProps> = ({ onClose, onConfirm, children }) => {
  return (
    <FormGroup className="flex flex-col">
      {children}
      <FormGroup className="flex items-center gap-3 mt-2">
        <Button className="btn-success btn-sm" onClick={onConfirm}><i className="fas fa-check" /></Button>
        <Button className="btn-danger btn-sm" onClick={onClose}><i className="fas fa-xmark" /></Button>
      </FormGroup>
    </FormGroup>
  )
}

export default ConfirmationToast;
