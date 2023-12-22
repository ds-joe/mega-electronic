// Types
import { FormErrorProps } from "@/types/Components/Form/FormError";

const FormError: RC<FormErrorProps> = ({ message, className }) => {
  return (
    message && <p className={`form-error ${className}`}>{message}</p>
  )
}

export default FormError;
