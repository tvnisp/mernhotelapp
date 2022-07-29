import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getIncident,
  closeIncident,
  assignIncident,
  deleteIncident,
} from "../../features/incident/incidentSlice";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/shared/Spinner";
import FormButton from "../../components/shared/FormButton";

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

  return (
    <section id="incident_page">
      <div className="container mx-auto mt-10 md:mt-28 mb-10 space-y-6 text-center flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Incident</h1>
        <div className="border p-6  rounded-lg bg-veryLightGray flex w-full flex-col md:flex-row  md:space-x-10">
          <div className="w-full md:w-1/2">
            <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
              Incident ID:
            </div>
            <div className=" bg-brightRedSupLight rounded text-left p-1 mb-2 text-darBlue">
              {incident._id}
            </div>
            <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
              Posted By:
            </div>
            <div className=" bg-brightRedSupLight rounded text-left p-1 mb-2 text-darBlue">
              {incident.username}
            </div>
            <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
              Created At:
            </div>
            <div className=" bg-brightRedSupLight rounded text-left p-1 mb-2 text-darBlue">
              {new Date(incident.createdAt).toLocaleString("en-US")}
            </div>
            {incident.resolvedAt && (
              <>
                <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
                  Resolved At:
                </div>
                <div className=" bg-brightRedSupLight rounded text-left p-1 mb-2 text-darBlue">
                  {new Date(incident.resolvedAt).toLocaleString("en-US")}
                </div>
              </>
            )}
            <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
              Status:
            </div>
            <div className=" bg-brightRedSupLight rounded text-left p-1 mb-2 text-darBlue">
              {incident.status === "open" || incident.status === "closed" ? (
                <div className="border bg-darkBlue w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                  {incident.status}
                </div>
              ) : (
                <div className="border bg-gray-700 w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                  {incident.status}
                </div>
              )}
            </div>
            <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
              Location:
            </div>
            <div className=" bg-brightRedSupLight rounded text-left p-1 mb-2 text-darBlue">
              {incident.location}
            </div>
            <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
              Responsible Department:
            </div>
            <div className=" bg-brightRedSupLight rounded text-left p-1 mb-2 text-darBlue">
              {incident.responsibleDepartment}
            </div>
            <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
              Priority Level:
            </div>
            <div className=" bg-brightRedSupLight rounded text-left p-1 mb-2 text-darBlue">
              {incident.priorityLevel === "Critical" || "Medium" ? (
                <div className="border bg-red-700 w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                  {incident.priorityLevel}
                </div>
              ) : (
                <div className="border bg-orange-600 w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                  {incident.priorityLevel}
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
              Description:
            </div>
            <div className=" bg-brightRedSupLight rounded text-left p-1 mb-2 text-darBlue">
              {incident.description}
            </div>
            <div className=" bg-brightRedLight text-left p-1 rounded text-brightRedSupLight">
              Image:
            </div>
            <div className="flex justify-center items-center bg-brightRedSupLight border-b rounded text-left p-1  text-darBlue">
              {incident.productImage &&
              incident.productImage.startsWith("up") ? (
                <img
                  className="h-80 rounded"
                  src={`/${incident.productImage}`}
                  alt="Incident"
                />
              ) : (
                <img
                  className="h-80 rounded"
                  src={`${incident.productImage}`}
                  alt="Incident"
                />
              )}
            </div>
            <div className="mt-3.5 flex items-center justify-start space-x-2">
              {incident.status !== "closed" ? (
                <>
                  <FormButton onClick={onAssign}>Assign</FormButton>
                  <FormButton onClick={onIncidentClose}>Close</FormButton>
                  {(user._id === incident.user || user.rights > 1) && (
                    <>
                      <FormButton
                        bg={"bg-brightRed"}
                        onClick={onIncidentDelete}
                      >
                        Delete
                      </FormButton>
                    </>
                  )}
                </>
              ) : (
                <>
                  {(user._id === incident.user || user.rights > 1) && (
                    <>
                      <FormButton bg="bg-brightRed" onClick={onIncidentDelete}>
                        Delete
                      </FormButton>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Incident;
