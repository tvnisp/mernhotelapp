function Notification({ children, txtColor, font, size, hidden }) {
  return (
    <div
      className={`${font} ${size} ${hidden} rounded border self-end border-brightRedLight bg-brightRedSupLight flex justify-start items-center p-1 px-2 text-${txtColor}`}
    >
      {children}
    </div>
  );
}

Notification.defaultProps = {
  txtColor: "brightRedLight",
};
export default Notification;
