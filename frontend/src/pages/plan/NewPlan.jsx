import BackButton from "../../components/BackButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPlan, reset } from "../../features/plan/planSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

function NewPlan() {
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState();

  const [formData, setFormData] = useState({
    outlet: "",
  });

  const { outlet } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.plans
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/plans/all");
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
    const planData = new FormData();
    planData.append("outlet", outlet);
    planData.append("file", file);
    // Axios.post("http://httpbin.org/anything", incidentData).then((res) =>
    //   console.log(res)
    // );
    dispatch(createPlan(planData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="backButton">
        <BackButton url="/plans" />
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-8">
            <section className="heading">
              <h1 className="mt-2 d-flex justify-content-center align-items-center">
                Add a new plan
              </h1>
            </section>

            <form
              className="d-flex flex-column custom_form"
              onSubmit={onSubmit}
            >
              <label htmlFor="name">EMPLOYEE NAME</label>
              <input value={user.name} type="text" name="name" disabled />
              <label htmlFor="email">EMPLOYEE EMAIL</label>
              <input value={user.email} type="text" name="email" disabled />

              <label htmlFor="outlet">OUTLET</label>
              <select
                name="outlet"
                id="outlet"
                onChange={onChange}
                value={outlet}
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

              <label htmlFor="image">PLAN</label>
              <span>.jpeg, .png, .gif, .bmp</span>
              <input
                type="file"
                onChange={onImageChange}
                accept="image/png, image/jpeg, image/gif ,image/bmp"
              />

              <button className="btn btn-outline-light mt-2 mb-2">ADD</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPlan;
