function FormButton({ children, type, onClick, bg, txtColor }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`shadow-lg p-2 px-6 rounded md:self-start ${bg} ${txtColor} baseline hover:bg-darkGrayishBlue`}
    >
      {children}
    </button>
  );
}

FormButton.defaultProps = {
  bg: "bg-darkBlue",
  txtColor: "text-white",
};

export default FormButton;
