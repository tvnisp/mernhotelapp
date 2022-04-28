import BackButton from "../../components/BackButton";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, getIncidents } from "../../features/incident/incidentSlice";
import Spinner from "../../components/Spinner";
import ClosedIncident from "../../components/ClosedIncident";

function Closed() {
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
        <div className="mt-2 row justify-content-center align-items-center">
          <h1 className="text-center mt-2">Closed Incidents</h1>
          <div className="incidents mt-3">
            <table className="table mb-2">
              <thead>
                <tr>
                  <th scope="col" className="table-secondary md-hidden">
                    ID
                  </th>
                  <th scope="col" className="table-secondary">
                    Created
                  </th>
                  <th scope="col" className="table-secondary md-hidden">
                    Resolved at
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
                </tr>
              </thead>
              <tbody>
                {incidents
                  .filter((incident) => incident.status.includes("closed"))
                  .map((incident) => (
                    <ClosedIncident key={incident._id} incident={incident} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Closed;
