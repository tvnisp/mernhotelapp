import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createIncident, reset } from "../../features/incident/incidentSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../shared/Spinner";
import Input from "../shared/Input";
import Select from "../shared/Select";
import FormButton from "../shared/FormButton";
import Notification from "../shared/Notification";

function NewIncident() {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [file, setFile] = useState();

  const [formData, setFormData] = useState({
    description: "",
    location: "",
    responsibleDepartment: "",
    priorityLevel: "",
  });

  const { description, location, responsibleDepartment, priorityLevel } =
    formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.incidents
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/incidents");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

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

    const incidentData = new FormData();
    incidentData.append("description", description);
    incidentData.append("location", location);
    incidentData.append("responsibleDepartment", responsibleDepartment);
    incidentData.append("priorityLevel", priorityLevel);
    incidentData.append("file", file);

    dispatch(createIncident(incidentData));

    setFormData({
      description: "",
      location: "",
      responsibleDepartment: "",
      priorityLevel: "",
    });
    toast.success("Incident created");
    toast.clearWaitingQueue();
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-center">Add Incident</h1>
        <div className="border flex flex-col space-y-4 p-6 rounded-lg bg-veryLightGray">
          <form className="flex flex-col space-y-3" onSubmit={onSubmit}>
            <Input
              bg="bg-darkGrayishBlue"
              disabled={true}
              name="name"
              value={name}
              type="text"
              placeholder="Name"
            />
            <Input
              bg="bg-darkGrayishBlue"
              disabled={true}
              name="email"
              value={email}
              type="email"
              placeholder="Email"
            />
            <Input
              name="location"
              value={location}
              onChange={onChange}
              type="text"
              placeholder="Location"
              required={true}
            />
            <Select
              name="priorityLevel"
              onChange={onChange}
              value={priorityLevel}
              placeholder="Priority level"
              options={["Critical", "High", "Medium", "Low"]}
              required={true}
            />
            <Select
              name="responsibleDepartment"
              value={responsibleDepartment}
              onChange={onChange}
              placeholder="Responsible Department"
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
              name="description"
              value={description}
              onChange={onChange}
              type="textarea"
              placeholder="Description"
              required={true}
            />
            <Input
              onChange={onImageChange}
              accept="image/png, image/jpeg, image/gif ,image/bmp"
              name="file"
              type="file"
            />
            <Notification>.jpeg, .png, .gif, .bmp</Notification>
            <FormButton type="submit">Add</FormButton>
          </form>
        </div>
      </div>
    </>
  );
}
export default NewIncident;
