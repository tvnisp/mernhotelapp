import { BsArrowDownLeftSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

const LinkButton = ({ children, url }) => {
  return (
    <Link
      to={url}
      className="btn btn-outline-light btn-block mt-2 position-relative"
    >
      <BsArrowDownLeftSquare className="fixed-icon" /> {children}
    </Link>
  );
};

export default LinkButton;
