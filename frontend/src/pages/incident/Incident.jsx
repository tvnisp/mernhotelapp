import BackButton from "../../components/BackButton";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getIncident,
  closeIncident,
  assignIncident,
} from "../../features/incident/incidentSlice";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { deleteIncident } from "../../features/incident/incidentSlice";

function Incident() {
  const { user } = useSelector((state) => state.auth);
  const { incident, isLoading, isError, message } = useSelector(
    (state) => state.incidents
  );

  const navigate = useNavigate();

  const { incidentId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getIncident(incidentId));
    //eslint-disable-next-line
  }, [isError, message, incidentId]);

  //Close incident
  const onIncidentClose = () => {
    dispatch(closeIncident(incidentId));
    toast.success("Incident closed");
    navigate("/incidents/closed");
  };

  const onIncidentDelete = (e) => {
    e.preventDefault();
    dispatch(deleteIncident(incident._id));
    navigate("/incidents");
    toast.success("Incident has been deleted");
  };

  const onAssign = (e) => {
    e.preventDefault();
    dispatch(assignIncident(incident._id));
    toast.success("You have been assigned");
    navigate("/incidents/open");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h5>Something went wrong</h5>;
  }
  const assignedTo = incident.assignedTo;

  return (
    <>
      <div className="backButton">
        {incident.status === "open" || incident.status === "new" ? (
          <BackButton url="/incidents/open" />
        ) : (
          <BackButton url="/incidents/closed" />
        )}
      </div>
      <div className="container">
        <div className="pd-2 row justify-content-center align-items-center">
          <h1 className="text-center mt-2 mb-4">View incident</h1>
          <hr />
          <section className="details d-flex flex-column justify-content-around align-items-between">
            <div className="row ">
              <div className="col">
                <h5 className="text-light bg-secondary border-bottom mb-0">
                  Incident ID:
                </h5>
                <p className="mb-1">{incident._id}</p>
                <h5 className="text-light bg-secondary border-bottom mb-0">
                  Posted by:{" "}
                </h5>
                <p className="mb-1">{incident.username}</p>
                {assignedTo && (
                  <>
                    <h5 className="text-light bg-secondary mb-0">
                      Assigned To:{" "}
                    </h5>
                    <p className="mb-1">
                      {assignedTo.name} {assignedTo.lastname}
                    </p>
                  </>
                )}
                <h5 className="text-light bg-secondary border-bottom mb-0">
                  Created at:
                </h5>
                <p className="mb-1">
                  {new Date(incident.createdAt).toLocaleString("en-US")}
                </p>
                {incident.resolvedAt && (
                  <div>
                    <h5 className="text-light bg-secondary border-bottom mb-0">
                      Resolved at:
                    </h5>
                    <p className="mb-1">
                      {new Date(incident.resolvedAt).toLocaleString("en-US")}
                    </p>
                  </div>
                )}

                <h5 className="text-light bg-secondary border-bottom mb-0">
                  Status:
                </h5>
                <p className="mb-1">
                  {incident.status === "open" ||
                  incident.status === "closed" ? (
                    <span className="badge bg-success">{incident.status}</span>
                  ) : (
                    <span className="badge bg-light text-dark">
                      {incident.status}
                    </span>
                  )}
                </p>
                <h5 className="text-light bg-secondary border-bottom mb-0">
                  Location:
                </h5>
                <p className="mb-1">{incident.location}</p>
                <h5 className="text-light bg-secondary border-bottom mb-0">
                  Responsible department
                </h5>
                <p className="mb-1">{incident.responsibleDepartment}</p>
                <h5 className="text-light bg-secondary border-bottom mb-0">
                  Priority Level:
                </h5>
                <p className="mb-1">
                  {incident.priorityLevel === "critical" ||
                  incident.priorityLevel === "high" ? (
                    <span className="badge bg-danger">
                      {incident.priorityLevel}
                    </span>
                  ) : (
                    <span className="badge bg-warning text-dark">
                      {incident.priorityLevel}
                    </span>
                  )}
                </p>
              </div>
              <div className="col">
                <h5 className="text-light bg-secondary border-bottom mb-0">
                  Description:{" "}
                </h5>
                <p className="mb-1">{incident.description}</p>
                {incident.productImage && (
                  <>
                    <h5 className="text-light bg-secondary border-bottom mb-0">
                      Image:
                    </h5>
                    <img
                      className="mt-2 mb-2"
                      src={`/${incident.productImage}`}
                      alt={incident.incidentId}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                {" "}
                {incident.status !== "closed" && (
                  <>
                    <div className="buttons mb-2 mt-3">
                      {/* <Link
                        className="btn btn-secondary"
                        to={`/incidents/${incident._id}`}
                      >
                        Edit
                      </Link>
                      <span> </span> */}
                      <button onClick={onAssign} className="btn btn-dark">
                        Assign
                      </button>
                      <span> </span>
                      <button
                        onClick={onIncidentClose}
                        className="btn btn-dark btn-block"
                      >
                        Close Incident
                      </button>
                      {user._id === incident.user && (
                        <>
                          <span> </span>
                          <button
                            onClick={onIncidentDelete}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Incident;
