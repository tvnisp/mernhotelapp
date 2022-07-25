function DarkRowTable({ children }) {
  return (
    <tr className="bg-white border-b dark:bg-brightRedLight dark:border-gray-700 text-white">
      {children}{" "}
    </tr>
  );
}
export default DarkRowTable;
