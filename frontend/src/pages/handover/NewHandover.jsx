import BackButton from "../../components/BackButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createHandover, reset } from "../../features/handover/handoverSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
// import Axios from "axios";

function NewHandover() {
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
      navigate("/handovers/all");
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

    // const handoverData = new FormData();
    // handoverData.append("handoverDescription", handoverDescription);
    // handoverData.append("shift", shift);
    // handoverData.append("outlet", outlet);

    // console.log(handoverData);
    // add api call here
    dispatch(createHandover(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="backButton">
        <BackButton url="/handovers" />
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-sm-12 col-md-10 col-lg-8">
            <section className="heading">
              <h1 className="mt-2 d-flex justify-content-center align-items-center">
                Add a new handover
              </h1>
              <p className="text-center mt-2">Please describe the handover</p>
            </section>

            <form
              className="d-flex flex-column custom_form"
              onSubmit={onSubmit}
            >
              <label htmlFor="name">EMPLOYEE NAME</label>
              <input value={user.name} type="text" name="name" disabled />
              <label htmlFor="email">EMPLOYEE EMAIL</label>
              <input value={user.email} type="text" name="email" disabled />

              <label htmlFor="shift">SHIFT</label>
              <select name="shift" id="shift" onChange={onChange} value={shift}>
                <option value="" hidden>
                  -- select an option --
                </option>
                <option value="early">Early</option>
                <option value="late">Late</option>
              </select>

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
              <label htmlFor="handoverDescription">HANDOVER DESCRIPTION</label>
              <textarea
                value={handoverDescription}
                type="text"
                rows="2"
                name="handoverDescription"
                onChange={onChange}
                required
              />

              <button className="btn btn-outline-light mt-2 mb-2">ADD</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewHandover;
