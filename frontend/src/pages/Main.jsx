import { Link } from "react-router-dom";
import { BsArrowDownSquareFill } from "react-icons/bs";

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
            </div>
          </div>
          {/* Info */}
          <div className="hidden md:border-l-2 md:h-2/3 border-darkBlue md:flex flex-col md:justify-center space-y-3 md:w-1/2">
            <div className="mt-2 text-brightRedLight capitalize text-3xl font-bold text-end ">
              <Link to="/">HotelCommunity</Link>
            </div>
            <div className="text-2xl capitalize text-end  text-darkGrayishBlue">
              <Link to="/incidents">Browse current & closed incidents</Link>
            </div>
            <div className="mt-2 capitalize text-2xl text-end">
              <Link to="/incidents/create">Report incidents</Link>
            </div>
            <div className="text-2xl capitalize text-end  text-darkGrayishBlue">
              <Link to="/incidents/open">Resolve incidents</Link>
            </div>
            <div className="text-2xl capitalize text-end">
              <Link to="/plans/create">Share plans</Link>
            </div>
            <div className="text-2xl capitalize text-darkGrayishBlue text-end">
              <Link to="/handovers/create">Write handovers</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Main;
