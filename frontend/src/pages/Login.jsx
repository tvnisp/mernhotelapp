import Input from "../components/shared/Input";
import FormButton from "../components/shared/FormButton";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Spinner from "../components/shared/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../components/shared/Notification";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      toast.clearWaitingQueue();
    }

    //Redirect when loggen in
    if (isSuccess || user) {
      navigate("/");
      toast.success(user.name + " has logged in");
      toast.clearWaitingQueue();
    }
  }, [user, isLoading, isError, isSuccess, message, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section id="login_page" className="h-full">
        {/* Flex Container */}
        <div className="container h-full mx-auto px-6 space-x-6 space-y-0 md:space-y-0 md:justify-center md:items-center justify-center flex flex-col md:flex-row">
          <div className="flex flex-col space-y-4 md:w-1/3">
            <h1 className="max-w-md text-3xl font-bold text-center">Login</h1>
            <div className="border flex flex-col space-y-4 p-6 rounded-lg bg-veryLightGray">
              <form onSubmit={onSubmit} className="flex flex-col space-y-4">
                <Input
                  onChange={onChange}
                  name={"email"}
                  value={email}
                  type="email"
                  placeholder="E-mail"
                />
                <Input
                  onChange={onChange}
                  name={"password"}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
                <div className="flex flex-col xl:flex-row justify-between">
                  <FormButton type="submit">
                    Login <FaSignInAlt className="inline" />
                  </FormButton>
                  <div className="mt-4 xl:mt-0">
                    <Notification txtColor={"brightRed"}>
                      Not a member?
                      <Link
                        className="mx-1 hover:text-darkBlue"
                        to={"/register"}
                      >
                        Sign Up
                      </Link>
                    </Notification>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Info */}
          <div className="hidden md:border-l-2 md:h-2/3 border-darkBlue md:flex flex-col md:justify-center space-y-3 md:w-1/2">
            <div className="mt-2 text-brightRedLight capitalize text-3xl font-bold text-end ">
              <Link to="/">HotelCommunity</Link>
            </div>
            <div className="mt-2 capitalize text-2xl text-end">
              Communicate with your team
            </div>
            <div className="text-2xl capitalize text-end  text-darkGrayishBlue">
              <Link to="/incidents/create">Report incidents</Link>
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
export default Login;
