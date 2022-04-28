import React from "react";
import { Link } from "react-router-dom";
// import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineFolderOpen } from "react-icons/ai";
// import { deleteIncident } from "../features/incident/incidentSlice";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";

function ClosedIncident({ incident }) {
  // const dispatch = useDispatch();

  // const onIncidentDelete = (e) => {
  //   e.preventDefault();
  //   dispatch(deleteIncident(incident._id));
  //   toast.success("Incident has been deleted");
  // };
  return (
    <>
      <tr>
        <th className="md-hidden">{incident._id}</th>
        <th>{incident.username}</th>
        <th className="md-hidden">{incident.resolvedAt}</th>
        <th>{incident.location}</th>
        <th>
          {incident.status === "new" ? (
            <span className="badge bg-light text-dark">{incident.status}</span>
          ) : (
            <span className="badge bg-success">{incident.status}</span>
          )}
        </th>

        <th>
          {incident.priorityLevel === "critical" ||
          incident.priorityLevel === "high" ? (
            <span className="badge bg-danger">{incident.priorityLevel}</span>
          ) : (
            <span className="badge bg-warning text-dark">
              {incident.priorityLevel}
            </span>
          )}
        </th>
        <th>
          <Link
            to={`/incidents/${incident._id}`}
            className="btn btn-secondary text-white"
          >
            <AiOutlineFolderOpen />
          </Link>
        </th>
      </tr>
    </>
  );
}

export default ClosedIncident;
