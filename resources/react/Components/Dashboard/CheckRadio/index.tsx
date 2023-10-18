// Dependencies
import { FC } from "react";

// Types
import { CheckRadioProps } from "@/types/Components/Dashboard/CheckRadio";

const CheckRadio: FC<CheckRadioProps> = ({ type, className, label, onChange, id, name }) => {
  return (
    <label className={`${type} ${className}`}>
      <input type={type === 'switch' ? 'checkbox' : type} id={id} name={name} onChange={onChange} />
      <span className="check" />
      <span className="px-2 form-label">{label}</span>
    </label>
  )
}

export default CheckRadio;
