const Pagination = ({ itemPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="">
      <ul className="inline-flex">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              href="#"
              className="mx-1 py-2 px-3 text-brightRedLight rounded border border-brightRedLight bg-brightRedSupLight flex justify-start items-center"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
