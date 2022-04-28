function Button({ children, version, isDisabled, onClick }) {
  return (
    <button onClick={onClick} disabled={isDisabled} className={version}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: "btn btn-outline-light",
  isDisabled: false,
};

export default Button;
