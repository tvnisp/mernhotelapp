import { v4 as uuidv4 } from "uuid";

function Select({ options, name, value, onChange, placeholder, required }) {
  return (
    <select
      onChange={(e) => onChange(e)}
      name={name}
      value={value}
      required={required}
      className="border-2 rounded border-black p-1 md:p-2 relative w-full input input-lg bg-brightRedLight text-white placeholder-white"
    >
      <option value="" hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={uuidv4()} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

Select.defaultProps = {
  required: false,
};
export default Select;
