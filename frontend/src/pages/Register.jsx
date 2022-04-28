import { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register({ version }) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    emai: "",
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
      toast.success("User created");
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
      <div className="backButton"></div>
      <div className="container">
        <div className="register d-flex justify-content-center align-items-center">
          <div className="col-12 col-sm-10 col-md-6">
            <h1 className="mt-2 d-flex justify-content-center align-items-center">
              <AiOutlineUserAdd />
              <span>Register</span>
            </h1>
            <p className="text-center mt-2">Please create an account</p>
            <form
              className="d-flex flex-column custom_form"
              onSubmit={onSubmit}
            >
              <label htmlFor="name">NAME</label>
              <input
                value={name}
                type="text"
                name="name"
                onChange={onChange}
                required
              />
              <label htmlFor="lastname">LASTNAME</label>
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={onChange}
                required
              />
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                required
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                required
              />
              <label htmlFor="password2">REPEAT PASSWORD</label>
              <input
                name="password2"
                type="password"
                value={password2}
                onChange={onChange}
                required
              />
              <label htmlFor="position">POSITION</label>
              <input
                type="text"
                name="position"
                value={position}
                onChange={onChange}
                required
              />
              <label htmlFor="department">DEPARTMENT</label>
              <select
                name="department"
                id="department"
                onChange={onChange}
                value={department}
              >
                <option hidden selected>
                  -- select an option --
                </option>
                <option value="Executive">Executive</option>
                <option value="f&b">F&B</option>
                <option value="spa">Spa</option>
                <option value="human_resources">Human resources</option>
                <option value="hsk">Housekeeping</option>
                <option value="kitchen">Kitchen</option>
                <option value="reception">Reception</option>
                <option value="kids club">Kids club</option>
                <option value="technician">Technician</option>
                <option value="concierge">Concierge</option>
                <option value="sales">Sales and marketing</option>
                <option value="finance">Finance</option>
              </select>
              <button className="btn btn-outline-light mt-2 mb-2">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
