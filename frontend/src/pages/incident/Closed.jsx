import BackButton from "../../components/BackButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, getIncidents } from "../../features/incident/incidentSlice";
import Spinner from "../../components/Spinner";
import ClosedIncident from "../../components/ClosedIncident";
import FilterButton from "../../components/FilterButton";
import Pagination from "../../components/Pagination";

function Closed() {
  const { incidents, isLoading, isSuccess } = useSelector(
    (state) => state.incidents
  );
  const filterItems = incidents.filter((incident) =>
    incident.status.includes("closed")
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
        <h1 className="text-center">Closed incidents</h1>

        <hr />
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
              {currentItems
                .filter((incident) => incident.status.includes("closed"))
                .map((incident) => (
                  <ClosedIncident key={incident._id} incident={incident} />
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

export default Closed;
