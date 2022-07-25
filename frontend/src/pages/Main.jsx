import { Link } from "react-router-dom";
import { BsArrowDownSquareFill } from "react-icons/bs";
import Notification from "../components/shared/Notification";

function Main() {
  // window.addEventListener("keydown", (e) => {
  //   e.keyCode === 73 && navigate("/incidents");
  //   e.keyCode === 72 && navigate("/handovers");
  //   e.keyCode === 80 && navigate("/plans");
  //   e.keyCode === 82 && navigate("/register");
  //   e.keyCode === 76 && navigate("/login");
  //   e.keyCode === 77 && navigate("/");
  //   e.keyCode === 65 && navigate("/about");
  //   // console.log(e.keyCode);
  // });
  return (
    <>
      <section id="login_page" className="h-full">
        {/* Flex Container */}
        <div className="container h-full mx-auto px-6 space-x-6 space-y-0 md:space-y-0  md:justify-around justify-center md:items-center flex flex-col md:flex-row">
          <div className="flex flex-col justify-center space-y-4 md:w-1/3">
            <h1 className="max-w-md text-3xl font-bold text-center">
              Select to start
            </h1>
            <div className="border flex flex-col space-y-4 p-6 rounded-lg bg-veryLightGray">
              <Link
                to="/incidents"
                className="shadow-lg p-2 rounded text-white bg-brightRed opacity-80 hover:bg-brightRedLight relative"
              >
                Incidents{" "}
                <BsArrowDownSquareFill className=" text-xl absolute top-2.5 right-3" />
              </Link>
              <Link
                to="/handovers"
                className="shadow-lg p-2 rounded text-white  bg-darkBlue hover:bg-darkGrayishBlue relative"
              >
                Handovers{" "}
                <BsArrowDownSquareFill className=" text-xl absolute top-2.5 right-3" />
              </Link>
              <Link
                to="/plans"
                className="shadow-lg p-2 rounded text-white bg-brightRed opacity-80 hover:bg-brightRedLight relative"
              >
                Plans{" "}
                <BsArrowDownSquareFill className=" text-xl absolute top-2.5 right-3" />
              </Link>
              <Notification txtColor={"brightRed"}>
                *Please
                <Link className="mx-1 hover:text-darkBlue" to={"/register"}>
                  Sign Up
                </Link>
                First
              </Notification>
            </div>
          </div>
          {/* Info */}
          <div className="hidden md:border-l-2 md:h-2/3 border-darkBlue md:flex flex-col md:justify-center space-y-3 md:w-1/2">
            <div className="mt-2 text-brightRedLight capitalize text-3xl font-bold text-end ">
              HotelCommunity
            </div>
            <div className="text-2xl capitalize text-end  text-darkGrayishBlue">
              Browse current & closed incidents
            </div>
            <div className="mt-2 capitalize text-2xl text-end">
              Report incidents
            </div>
            <div className="text-2xl capitalize text-end  text-darkGrayishBlue">
              Resolve incidents
            </div>
            <div className="text-2xl capitalize text-end">Share plans</div>
            <div className="text-2xl capitalize text-darkGrayishBlue text-end">
              Write handovers
            </div>
            <div className="text-2xl capitalize text-end">Help your team</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Main;
