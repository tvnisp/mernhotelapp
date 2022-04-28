import BackButton from "../../components/BackButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createIncident, reset } from "../../features/incident/incidentSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
// import Axios from "axios";

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
      navigate("/incidents/open");
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
    // const incidentData = {
    //   description,
    //   location,
    //   responsibleDepartment,
    //   priorityLevel,
    // };
    const incidentData = new FormData();
    incidentData.append("description", description);
    incidentData.append("location", location);
    incidentData.append("responsibleDepartment", responsibleDepartment);
    incidentData.append("priorityLevel", priorityLevel);
    incidentData.append("file", file);
    // Axios.post("http://httpbin.org/anything", incidentData).then((res) =>
    //   console.log(res)
    // );
    dispatch(createIncident(incidentData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="backButton">
        <BackButton url="/incidents" />
      </div>
      <div className="container">
        <div className="mt-2 row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-8">
            <section className="heading">
              <h1 className="mt-2 d-flex justify-content-center align-items-center">
                Add a new incident
              </h1>
              <p className="text-center mt-2">Please describe the incident</p>
            </section>

            <form
              className="d-flex flex-column custom_form"
              onSubmit={onSubmit}
            >
              <label htmlFor="name">EMPLOYEE NAME</label>
              <input value={name} type="text" name="name" disabled />
              <label htmlFor="email">EMPLOYEE EMAIL</label>
              <input value={email} type="text" name="email" disabled />
              <label htmlFor="location">LOCATION</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={onChange}
                required
              />
              <label htmlFor="priorityLevel">PRIORITY LEVEL</label>
              <select
                name="priorityLevel"
                id="priorityLevel"
                onChange={onChange}
                value={priorityLevel}
              >
                <option value="" hidden>
                  -- select an option --
                </option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <label htmlFor="responsibleDepartment">
                RESPONSIBLE DEPARTMENT
              </label>
              <select
                name="responsibleDepartment"
                id="responsibleDepartment"
                onChange={onChange}
                value={responsibleDepartment}
              >
                <option value="" hidden>
                  -- select an option --
                </option>
                <option value="Executive">Executive</option>
                <option value="F&B">F&B</option>
                <option value="Spa">Spa</option>
                <option value="Human resources">Human resources</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Reception">Reception</option>
                <option value="Kids club">Kids club</option>
                <option value="Technician">Technician</option>
                <option value="Concierge">Concierge</option>
                <option value="Sales and marketing">Sales and marketing</option>
                <option value="Finance">Finance</option>
              </select>
              <label htmlFor="description">DESCRIPTION</label>
              <textarea
                value={description}
                type="text"
                rows="2"
                name="description"
                onChange={onChange}
                required
              />

              <label htmlFor="image">IMAGE</label>
              <span>.jpeg, .jpg, .png</span>
              <input type="file" onChange={onImageChange} />

              <button className="btn btn-outline-light mt-2 mb-2">ADD</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewIncident;
