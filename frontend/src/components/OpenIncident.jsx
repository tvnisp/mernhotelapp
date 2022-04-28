import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteIncident } from "../features/incident/incidentSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function OpenIncident({ incident }) {
  const dispatch = useDispatch();

  const onIncidentDelete = (e) => {
    e.preventDefault();
    dispatch(deleteIncident(incident._id));
    toast.success("Incident has been deleted");
  };
  return (
    <>
      <tr>
        <th className="md-hidden">{incident._id}</th>
        <th>{incident.username}</th>
        <th className="md-hidden">
          {new Date(incident.createdAt).toLocaleString("en-US")}
        </th>
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
        <th>
          <button onClick={onIncidentDelete} className="btn btn-light">
            <FaRegTrashAlt />
          </button>
        </th>
      </tr>
    </>
  );
}

export default OpenIncident;
