import Input from "../components/shared/Input";
import FormButton from "../components/shared/FormButton";
import Select from "../components/shared/Select";
import Spinner from "../components/shared/Spinner";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../components/shared/Notification";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    position: "",
    department: "",
  });

  const { name, lastname, email, password, password2, position, department } =
    formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
      toast.success(`Welcome ${user.name}`);
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("The passwords do not match");
    } else {
      const userData = {
        name,
        lastname,
        email,
        password,
        position,
        department,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section id="register_page" className="h-full">
        <div className="container h-full mx-auto px-6 space-x-6 space-y-0 md:space-y-0 md:items-center justify-center flex flex-col md:flex-row">
          <div className="flex flex-col space-y-3 md:w-1/3">
            <h1 className="max-w-md text-3xl font-bold text-center">
              Register
            </h1>
            <div className="border flex flex-col space-y-4 p-6 rounded-lg bg-veryLightGray">
              <form className="flex flex-col space-y-3" onSubmit={onSubmit}>
                <Input
                  name="name"
                  value={name}
                  onChange={onChange}
                  type="text"
                  placeholder="Name"
                  required={true}
                />
                <Input
                  name="lastname"
                  value={lastname}
                  onChange={onChange}
                  type="text"
                  placeholder="Lastname"
                  required={true}
                />
                <Input
                  name="email"
                  value={email}
                  onChange={onChange}
                  type="email"
                  placeholder="E-mail"
                  required={true}
                />
                <Input
                  name="password"
                  value={password}
                  onChange={onChange}
                  type="password"
                  placeholder="Password"
                  required={true}
                />
                <Input
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  type="password"
                  placeholder="Repeat password"
                  required={true}
                />
                <Input
                  name="position"
                  value={position}
                  onChange={onChange}
                  type="text"
                  placeholder="Position"
                  required={true}
                />
                <Select
                  name="department"
                  value={department}
                  onChange={onChange}
                  required={true}
                  placeholder="Department"
                  options={[
                    "-- select an option --",
                    "Executive",
                    "Spa",
                    "F&B",
                    "Human Resources",
                    "Housekeeping",
                    "Kitchen",
                    "Reception",
                    "Kids Club",
                    "Technician",
                    "Concierge",
                    "Sales and Marketing",
                    "Finance",
                    "Groom",
                  ]}
                />
                <div className="flex flex-col xl:flex-row justify-between">
                  <FormButton type="submit">Register</FormButton>
                  <div className="mt-4 xl:mt-0">
                    <Notification txtColor={"brightRed"}>
                      Already a member?
                      <Link className="mx-1 hover:text-darkBlue" to={"/login"}>
                        Sign In
                      </Link>
                    </Notification>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Info */}
          <div className="hidden md:border-l-2 md:h-2/3 border-darkBlue md:flex flex-col md:justify-center space-y-3 md:w-1/2">
            <div className="mt-2 text-brightRedLight text-3xl capitalize font-bold text-end">
              HotelCommunity
            </div>
            <div className="mt-2 text-2xl text-end">Join today</div>
            <div className="text-2xl text-end capitalize text-darkGrayishBlue">
              With Just a few clicks
            </div>
            <div className="text-2xl capitalize text-end">and</div>
            <div className="text-2xl capitalize text-darkGrayishBlue text-end">
              Start Using the App
            </div>
            <div className="text-2xl capitalize text-end">It's free!!!</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Register;
