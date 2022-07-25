function TableHead({ children }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-darkBlue dark:text-white">
      {children}
    </thead>
  );
}
export default TableHead;
