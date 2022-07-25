function LightRowTable({ children }) {
  return (
    <tr className="bg-gray-50 text-darkBlue border-b dark:bg-brightRedSupLight dark:border-gray-700">
      {children}
    </tr>
  );
}
export default LightRowTable;
