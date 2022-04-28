import BackButton from "../../components/BackButton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIncidents, reset } from "../../features/incident/incidentSlice";
import Spinner from "../../components/Spinner";
import OpenIncident from "../../components/OpenIncident";

function Incidents() {
  const { incidents, isLoading, isSuccess } = useSelector(
    (state) => state.incidents
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getIncidents());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="backButton">
        <BackButton url="/incidents" />
      </div>
      <div className="container-fluid">
        <h1 className="text-center mt-2">Incidents</h1>
        <div className="incidents mt-3">
          <table className="table mb-2">
            <thead>
              <tr>
                <th scope="col" className="table-secondary md-hidden">
                  ID
                </th>
                <th scope="col" className="table-secondary">
                  Creator
                </th>
                <th scope="col" className="table-secondary md-hidden">
                  Created at
                </th>
                <th scope="col" className="table-secondary">
                  Location
                </th>
                <th scope="col" className="table-secondary">
                  Status
                </th>
                <th scope="col" className="table-secondary">
                  Priority
                </th>
                <th scope="col" className="table-secondary">
                  View
                </th>
                <th scope="col" className="table-secondary">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {incidents
                .filter(
                  (incident) =>
                    incident.status === "new" || incident.status === "open"
                )
                .map((incident) => (
                  <OpenIncident key={incident._id} incident={incident} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Incidents;
