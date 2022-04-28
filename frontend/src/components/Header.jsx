import { Link, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import NavButton from "../components/NavButton";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    toast.success("You have logged out");
  };

  return (
    <header className="d-flex align-items-center justify-content-between header">
      <Link to="/" style={{ color: "white", textShadow: "2px 2px black" }}>
        <h2>Hotel application</h2>
      </Link>
      <nav className="d-flex justify-content-end align-items-center">
        {user ? (
          <button
            className="btn btn-dark border-light d-flex align-items-center"
            onClick={onLogout}
          >
            <FiLogOut />
            <span></span>
            Logout - {user.name}
          </button>
        ) : (
          <>
            <NavButton url="/register">
              <AiOutlineUserAdd />
              Sign up
            </NavButton>
            <span> </span>
            <NavButton url="/login">
              <FiLogIn />
              <span></span>Login
            </NavButton>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
