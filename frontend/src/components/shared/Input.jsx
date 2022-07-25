function Input({
  placeholder,
  type,
  onChange,
  name,
  value,
  disabled,
  accept,
  bg,
  required,
}) {
  return (
    <input
      onChange={(e) => onChange(e)}
      accept={accept}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={`border-2 rounded border-black p-1 md:p-2 relative w-full input input-lg ${bg} text-white placeholder-white`}
    />
  );
}

Input.defaultProps = {
  disabled: false,
  required: false,
  bg: "bg-brightRedLight",
};
export default Input;
