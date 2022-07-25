import { Link } from "react-router-dom";

function LinkCard({ children, to }) {
  return (
    <Link
      to={to}
      className="w-full md:w-4/5 h-40 bg-brightRedSupLight hover:bg-darkBlue transition-colors hover:cursor-pointer border border-brightRed flex items-center justify-center p-6 space-y-6 rounded-lg text-brightRed font-mono text-sm md:text-lg"
    >
      {children}
    </Link>
  );
}
export default LinkCard;
