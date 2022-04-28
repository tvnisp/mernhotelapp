import { FiLogIn } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Login({ version }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //Redirect when loggen in
    if (isSuccess || user) {
      navigate("/");
      toast.success(user.name + " has logged in");
    }
  });

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
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-sm-8 col-md-6">
        <h1 className="text-center mt-2 d-flex justify-content-center align-items-center">
          <FiLogIn className="m-2" /> Login
        </h1>
        <form className="d-flex flex-column custom_form" onSubmit={onSubmit}>
          <label htmlFor="email">EMAIL ADDRESS</label>
          <input name="email" value={email} type="email" onChange={onChange} />
          <label htmlFor="password">PASSWORD</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
          <button className="btn btn-outline-light mt-2">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
