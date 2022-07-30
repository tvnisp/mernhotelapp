import { Link } from "react-router-dom";

function LinkCard({ children, to }) {
  return (
    <Link
      to={to}
      className="w-full md:w-4/5 h-40 drop-shadow-xl bg-brightRedLight hover:bg-darkBlue md:bg-darkBlue md:hover:bg-brightRedLight transition-colors hover:cursor-pointer border-2 border-darkBlue md:border-brightRedLight flex items-center justify-center p-6 space-y-6 rounded-lg text-white text-sm md:text-lg"
    >
      {children}
    </Link>
  );
}
export default LinkCard;
