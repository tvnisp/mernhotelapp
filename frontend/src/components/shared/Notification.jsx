function Notification({ children, txtColor, font, size, hidden }) {
  return (
    <div
      className={`${font} ${size} ${hidden} text-sm lg:text-lg rounded border text-center border-brightRedLight bg-brightRedSupLight lg:flex justify-center items-center p-1 px-2 text-${txtColor}`}
    >
      {children}
    </div>
  );
}

Notification.defaultProps = {
  txtColor: "brightRedLight",
};
export default Notification;
