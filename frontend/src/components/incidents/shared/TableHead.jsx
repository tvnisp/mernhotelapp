function TableHead({ children }) {
  return (
    <thead className="text-xs md:text-sm uppercase bg-darkBlue text-white">
      {children}
    </thead>
  );
}
export default TableHead;
