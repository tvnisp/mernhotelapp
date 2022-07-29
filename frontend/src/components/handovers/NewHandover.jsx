import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createHandover, reset } from "../../features/handover/handoverSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../shared/Spinner";
import Input from "../shared/Input";
import Select from "../shared/Select";
import FormButton from "../shared/FormButton";

function NewIncident() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.handovers
  );

  const [formData, setFormData] = useState({
    handoverDescription: "",
    shift: "",
    outlet: "",
  });

  const { handoverDescription, shift, outlet } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/handovers");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createHandover(formData));
    setFormData({ handoverDescription: "", shift: "", outlet: "" });
    toast.success("Handover created");
    toast.clearWaitingQueue();
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-center">Add Handover</h1>
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
              name="shift"
              onChange={onChange}
              value={shift}
              placeholder="Shift"
              options={["Early", "Late"]}
              required={true}
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
              ]}
            />
            <textarea
              className="border-2 rounded border-black p-1 md:p-2 relative w-full input input-lg bg-brightRedLight text-white placeholder-white"
              rows={3}
              name="handoverDescription"
              value={handoverDescription}
              onChange={onChange}
              placeholder="Description"
              required
            />

            <FormButton type="submit">Add</FormButton>
          </form>
        </div>
      </div>
    </>
  );
}
export default NewIncident;
