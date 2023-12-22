// Types
import { CheckRadioProps } from "@/types/Components/Form/CheckRadio";

const CheckRadio: RC<CheckRadioProps> = ({ type, className, label, onChange, id, name, checked }) => {
  return (
    <label className={`${type} ${className}`}>
      <input type={type === 'switch' ? 'checkbox' : type} id={id} name={name} onChange={onChange} checked={checked} />
      <span className="check" />
      <span className="px-2 form-label mt-2">{label}</span>
    </label>
  )
}

export default CheckRadio;
