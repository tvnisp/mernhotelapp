import { Link } from "react-router-dom";

const NavButton = ({ children, url }) => {
  return (
    <Link to={url} className="btn btn-outline-light">
      {children}
    </Link>
  );
};

export default NavButton;
