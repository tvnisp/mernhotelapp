import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPlan, reset } from "../../features/plan/planSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../shared/Spinner";
import Input from "../shared/Input";
import Select from "../shared/Select";
import FormButton from "../shared/FormButton";
import Notification from "../shared/Notification";

function NewPlan() {
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState();

  const [formData, setFormData] = useState({
    outlet: "",
  });

  const { outlet } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loc = useLocation();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.plans
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && loc.pathname === "/plans") {
      dispatch(reset());
      navigate("/plans");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message, loc.pathname]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const planData = new FormData();
    planData.append("outlet", outlet);
    planData.append("file", file);
    dispatch(createPlan(planData));
    setFormData({
      outlet: "",
    });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-center">Add Plan</h1>
        <div className="border flex flex-col space-y-4 p-6 rounded-lg bg-veryLightGray">
          <form className="flex flex-col space-y-3" onSubmit={onSubmit}>
            <Input
              bg="bg-darkGrayishBlue"
              disabled={true}
              name="name"
              value={user.name}
              type="text"
              placeholder="Name"
            />
            <Input
              bg="bg-darkGrayishBlue"
              disabled={true}
              name="email"
              value={user.email}
              type="email"
              placeholder="Email"
            />
            <Select
              name="outlet"
              onChange={onChange}
              value={outlet}
              placeholder="Outlet"
              required={true}
              options={[
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
            <Input
              onChange={onImageChange}
              accept="image/png, image/jpeg, image/gif ,image/bmp"
              name="file"
              type="file"
              required={true}
            />
            <Notification>.jpeg, .png, .gif, .bmp</Notification>
            <FormButton type="submit">Add</FormButton>
          </form>
        </div>
      </div>
    </>
  );
}
export default NewPlan;
