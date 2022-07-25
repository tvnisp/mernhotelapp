import BackButton from "../../components/BackButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIncidents, reset } from "../../features/incident/incidentSlice";
import Spinner from "../../components/Spinner";
import OpenIncident from "../../components/OpenIncident";
import FilterButton from "../../components/FilterButton";
import Pagination from "../../components/Pagination";

function Incidents() {
  const { incidents, isLoading, isSuccess } = useSelector(
    (state) => state.incidents
  );

  const filterItems = incidents.filter(
    (incident) =>
      incident.status.includes("new") || incident.status.includes("open")
  );
  const [item, setItem] = useState(filterItems);
  const menuItems = [
    ...new Set(filterItems.map((Val) => Val.responsibleDepartment)),
  ];

  //------

  //Pagination
  //State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  // Get current posts
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //---------

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

  useEffect(() => {
    setItem(filterItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incidents]);

  const filterItem = (curcat) => {
    const newItem = incidents.filter((newVal) => {
      return newVal.responsibleDepartment === curcat;
    });
    setItem(newItem);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="backButton">
        <BackButton url="/incidents" />
      </div>
      <div className="container-fluid">
        <h1 className="text-center">Incidents</h1>

        <hr />
        <h3 className="text-center">Filter by responsible department:</h3>
        <FilterButton
          filterItem={filterItem}
          setItem={setItem}
          menuItems={menuItems}
          Data={filterItems}
        />
        <hr />
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
              {currentItems
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
        <Pagination
          itemPerPage={itemPerPage}
          totalItems={item.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default Incidents;
