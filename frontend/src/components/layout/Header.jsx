import { Link, useLocation } from "react-router-dom";
import { SiHotelsdotcom } from "react-icons/si";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import Notification from "../shared/Notification";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState("");
  const [btnToggle, setBtnToggle] = useState("hidden");
  const { pathname } = useLocation();

  const onLogout = (e) => {
    dispatch(logout());
    dispatch(reset());
    toast.success(`${user.name} has logged out`);
  };

  const handleBtnToggle = () => {
    setBtnToggle((prev) => {
      return prev === "hidden" ? "flex" : "hidden";
    });
  };

  const onClick = () => {
    setBtnToggle("hidden");
  };

  const onClickLogoutMob = () => {
    onLogout();
    onClick();
  };

  useEffect(() => {
    pathname === "/login" || pathname === "/register"
      ? setIsLogin(true)
      : setIsLogin(false);
  }, [pathname]);

  return (
    <nav className="relative container mx-auto py-6 px-2">
      <div className="flex items-center justify-between">
        <div className="">
          <div className=" text-3xl shadow-xl text-darkBlue">
            <Link to={"/"} onClick={onClick}>
              <SiHotelsdotcom />
            </Link>
          </div>
        </div>

        {!isLogin && (
          <div className="hidden space-x-6 md:flex text-xl">
            <Link className="hover:text-darkGrayishBlue" to={"/"}>
              Main
            </Link>
            {/* Incidents hover */}
            <div>
              <Link
                className="hover:text-darkGrayishBlue peer"
                to={"/incidents"}
              >
                Incidents
              </Link>
              <div className="absolute hidden peer-hover:flex hover:flex flex-col w-34 bg-brightRedSupLight border rounded border-brightRedLight">
                <Link
                  className="p-1 w-full text-brightRed hover:text-darkBlue"
                  to={"/incidents/create"}
                >
                  Add new
                </Link>
                <Link
                  className="p-1 w-full text-brightRed hover:text-darkBlue"
                  to={"/incidents/open"}
                >
                  Show Incidents
                </Link>
                <Link
                  className="p-1 w-full text-brightRed hover:text-darkBlue"
                  to={"/incidents/closed"}
                >
                  Closed Incidents
                </Link>
              </div>
            </div>

            {/* Handovers Hover */}
            <div>
              <Link
                className="hover:text-darkGrayishBlue peer"
                to={"/handovers"}
              >
                Handovers
              </Link>
              <div className="absolute hidden peer-hover:flex hover:flex flex-col w-34 bg-brightRedSupLight border rounded border-brightRedLight">
                <Link
                  className="p-1 w-full text-brightRed hover:text-darkBlue"
                  to={"/handovers/create"}
                >
                  Add new
                </Link>
                <Link
                  className="p-1 w-full text-brightRed hover:text-darkBlue"
                  to={"/handovers/all"}
                >
                  Show Handovers
                </Link>
              </div>
            </div>

            {/* Plans Hover */}
            <div>
              <Link className="hover:text-darkGrayishBlue peer" to={"/plans"}>
                Plans
              </Link>
              <div className="absolute hidden peer-hover:flex hover:flex flex-col w-34 bg-brightRedSupLight border rounded border-brightRedLight">
                <Link
                  className="p-1 w-full text-brightRed hover:text-darkBlue"
                  to={"/plans/create"}
                >
                  Add new
                </Link>
                <Link
                  className="p-1 w-full text-brightRed hover:text-darkBlue"
                  to={"/plans/all"}
                >
                  Show Plans
                </Link>
              </div>
            </div>

            <Link className="hover:text-darkGrayishBlue" to={"/about"}>
              About
            </Link>
          </div>
        )}
        <div className="md:flex space-x-2 items-center">
          {user ? (
            <>
              <div className="hidden md:block">
                <Notification
                  txtColor={"brightRedLight"}
                >{`${user.name}`}</Notification>
              </div>
              <Link
                onClick={onLogout}
                to="/"
                className="hidden shadow-lg md:block p-1 px-4 text-white bg-darkBlue rounded-full baseline hover:bg-darkGrayishBlue"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="hidden shadow-lg md:block p-1 px-4 text-white bg-darkBlue rounded-full baseline hover:bg-darkGrayishBlue"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="hidden shadow-lg md:block p-1 px-4 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              >
                Sign In
              </Link>
            </>
          )}
          <button
            onClick={handleBtnToggle}
            className="block md:hidden focus:outline-none"
          >
            {btnToggle === "hidden" ? (
              <GiHamburgerMenu className="text-3xl text-darkBlue shadow-sm" />
            ) : (
              <AiOutlineClose className="text-3xl text-darkBlue shadow-sm" />
            )}
          </button>
        </div>
      </div>
      <div className="md:hidden">
        <div
          id="menu"
          className={`z-10 absolute flex-col items-center py-8 mt-4 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md ${btnToggle}`}
        >
          <Link
            onClick={onClick}
            className="hover:text-darkGrayishBlue"
            to={"/"}
          >
            Main
          </Link>
          <Link
            onClick={onClick}
            className="hover:text-darkGrayishBlue"
            to={"/incidents"}
          >
            Incidents
          </Link>
          <Link
            onClick={onClick}
            className="hover:text-darkGrayishBlue"
            to={"/handovers"}
          >
            Handovers
          </Link>
          <Link
            onClick={onClick}
            className="hover:text-darkGrayishBlue"
            to={"/plans"}
          >
            Plans
          </Link>
          <Link
            onClick={onClick}
            className="hover:text-darkGrayishBlue"
            to={"/about"}
          >
            About
          </Link>
          {user ? (
            <Link
              onClick={onClickLogoutMob}
              to="/"
              className="shadow-lg md:block p-1 px-4 text-white bg-darkBlue rounded-full baseline hover:bg-darkGrayishBlue"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                onClick={onClick}
                to="/register"
                className="shadow-lg md:block p-1 px-4 text-white bg-darkBlue rounded-full baseline hover:bg-darkGrayishBlue"
              >
                Sign up
              </Link>
              <Link
                onClick={onClick}
                to="/login"
                className="shadow-lg md:block p-1 px-4 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Header;
