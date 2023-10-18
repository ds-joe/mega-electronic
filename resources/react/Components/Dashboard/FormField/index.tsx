// Dependencies
import { FC } from "react";

// Types
import { FormFieldProps } from "@/types/Components/Dashboard/FormField";

const FormField: FC<FormFieldProps> = ({ placeholder, label, error, icon, id, name, onChange, className }) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={id} className="form-label">
        {icon && <i className={`${icon} icon`} />}
        {label}
      </label>
      <input className="form-control" id={id} name={name} placeholder={placeholder} onChange={onChange} />
      <p className="form-error">{error}</p>
    </div>
  )
}

export default FormField;
