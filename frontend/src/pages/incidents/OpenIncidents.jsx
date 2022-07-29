import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getIncidents,
  deleteIncident,
  reset,
} from "../../features/incident/incidentSlice";
import Spinner from "../../components/shared/Spinner";
import DarkRowTable from "../../components/incidents/shared/DarkRowTable";
import LightRowTable from "../../components/incidents/shared/LightRowTable";
import TableHead from "../../components/incidents/shared/TableHead";
import { Link } from "react-router-dom";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Pagination from "../../components/shared/Pagination";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Filters from "../../components/shared/Filters";

function OpenIncidents() {
  const { user } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);
  const { incidents, isLoading, isSuccess } = useSelector(
    (state) => state.incidents
  );

  //Pagination
  //State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);
  //Get current posts
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirsItem = indexOfLastItem - itemPerPage;

  //Filter the items
  const filteredItems = incidents.filter(
    (item) => item.status === "open" || item.status === "new"
  );

  //Sort the items
  const sortedItems = [...items].sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    } else {
      return 1;
    }
  });

  //Get current items
  const currentItems = sortedItems.slice(indexOfFirsItem, indexOfLastItem);

  //Filter by department
  const responsibleDepartmentItems = [
    ...new Set(filteredItems.map((Val) => Val.responsibleDepartment)),
  ];

  const priorityLevelItems = [
    ...new Set(filteredItems.map((Val) => Val.priorityLevel)),
  ];

  const filterItems = (curcat, type) => {
    const newItem = filteredItems.filter((newVal) => {
      // return newVal[type] === curcat;
      return newVal.responsibleDepartment === curcat;
    });
    setItems(newItem);
  };

  //Paginate function
  const paginate = (number) => setCurrentPage(number);

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
    setItems(filteredItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incidents]);

  const handleIncidentDelete = (incident) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      dispatch(deleteIncident(incident._id));
      if (user._id === incident.user || user.rights > 1) {
        toast.success("Incident deleted");
        toast.clearWaitingQueue();
      } else {
        toast.error("Not authorised");
        toast.clearWaitingQueue();
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="openincidents_page m-2">
      <div className="container mx-auto mb-10 md:mb-20 mt-10 md:mt-18 md:mt-30 flex flex-col justify-center items-center space-y-6">
        <div className="heading">
          <h1 className="max-w-md text-3xl font-bold md:text-center">
            Current Incidents
          </h1>
        </div>

        <Filters
          link="/incidents/create"
          filterItems={filterItems}
          setItems={setItems}
          priorityLevelItems={priorityLevelItems}
          responsibleDepartmentItems={responsibleDepartmentItems}
          Data={filteredItems}
        />

        <div className="overflow-x-auto w-full relative shadow-md sm:rounded-lg border p-6 rounded-lg bg-veryLightGray">
          <table className="w-full text-sm md:text-md lg:text-lg text-left text-darkGrayishBlue ">
            <TableHead>
              <tr>
                <th
                  scope="col"
                  className="py-3 px-6 hidden md:table-cell md:rounded-tl"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 rounded-tl md:rounded-none"
                >
                  Creator
                </th>
                <th scope="col" className="py-3 px-6 w-42 md:w-auto">
                  Created At
                </th>
                <th scope="col" className="py-3 px-6 hidden md:table-cell">
                  Location
                </th>
                <th scope="col" className="py-3 px-6 hidden xl:table-cell">
                  Status
                </th>
                <th scope="col" className="py-3 px-6 hidden xl:table-cell">
                  Priority
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 rounded-tr lg:rounded-none"
                >
                  View
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 hidden lg:table-cell md:rounded-tr"
                >
                  Delete
                </th>
              </tr>
            </TableHead>
            <tbody>
              {currentItems
                // .filter(
                //   (incident) =>
                //     incident.status === "new" || incident.status === "open"
                // )
                .map((incident, index) => {
                  return index % 2 === 0 ? (
                    <DarkRowTable key={uuidv4()}>
                      <td className="py-4 px-6 hidden md:table-cell">
                        {`${incident._id.substr(0, 5)}...`}
                      </td>
                      <td className="py-4 px-6">{incident.username}</td>
                      <td className="py-4 px-6">{`${incident.createdAt.substr(
                        0,
                        10
                      )} at ${incident.createdAt.substr(11, 5)}`}</td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        {incident.location}
                      </td>
                      {incident.status === "open" ? (
                        <td className="py-4 px-6 hidden xl:table-cell">
                          <div className="bg-darkBlue w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                            {incident.status}
                          </div>
                        </td>
                      ) : (
                        <td className="py-4 px-6 hidden xl:table-cell">
                          <div className="bg-gray-700 w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                            {incident.status}
                          </div>
                        </td>
                      )}
                      {incident.priorityLevel === "Critical" || "Medium" ? (
                        <td className="py-4 px-6 hidden xl:table-cell">
                          <div className="bg-red-700 w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                            {incident.priorityLevel}
                          </div>
                        </td>
                      ) : (
                        <td className="py-4 px-6 hidden xl:table-cell">
                          <div className="bg-orange-600 w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                            {incident.priorityLevel}
                          </div>
                        </td>
                      )}

                      <td className="py-4 px-6 text-center">
                        <Link to={`/incidents/${incident._id}`}>
                          <div className="text-2xl">
                            <AiOutlineFolderOpen />
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-6 md:pl-8 hidden lg:table-cell">
                        <button onClick={() => handleIncidentDelete(incident)}>
                          <div className="text-2xl">
                            <MdOutlineDeleteOutline />
                          </div>
                        </button>
                      </td>
                    </DarkRowTable>
                  ) : (
                    <LightRowTable key={uuidv4()}>
                      <td className="py-4 px-6 hidden md:table-cell">
                        {`${incident._id.substr(0, 5)}...`}
                      </td>
                      <td className="py-4 px-6">{incident.username}</td>
                      <td className="py-4 px-6">{`${incident.createdAt.substr(
                        0,
                        10
                      )} at ${incident.createdAt.substr(11, 5)}`}</td>
                      <td className="py-4 px-6 hidden md:table-cell">
                        {incident.location}
                      </td>
                      {incident.status === "open" ? (
                        <td className="py-4 px-6 hidden xl:table-cell">
                          <div className="bg-darkBlue w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                            {incident.status}
                          </div>
                        </td>
                      ) : (
                        <td className="py-4 px-6 hidden xl:table-cell">
                          <div className="bg-gray-700 w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                            {incident.status}
                          </div>
                        </td>
                      )}
                      {incident.priorityLevel === "Critical" || "Medium" ? (
                        <td className="py-4 px-6 hidden xl:table-cell">
                          <div className="bg-red-700 w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                            {incident.priorityLevel}
                          </div>
                        </td>
                      ) : (
                        <td className="py-4 px-6 hidden xl:table-cell">
                          <div className="bg-orange-600 w-20 flex justify-center items-center px-3 text-white rounded-lg py-1">
                            {incident.priorityLevel}
                          </div>
                        </td>
                      )}

                      <td className="py-4 px-6 text-center">
                        <Link to={`/incidents/${incident._id}`}>
                          <div className="text-2xl">
                            <AiOutlineFolderOpen />
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-6 md:pl-8 hidden lg:table-cell">
                        <button onClick={() => handleIncidentDelete(incident)}>
                          <div className="text-2xl">
                            <MdOutlineDeleteOutline />
                          </div>
                        </button>
                      </td>
                    </LightRowTable>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Pagination
          itemPerPage={itemPerPage}
          totalItems={filteredItems.length}
          paginate={paginate}
        />
      </div>
    </section>
  );
}
export default OpenIncidents;
