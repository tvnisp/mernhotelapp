import Handover from "../../components/handovers/Handover";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteHandover,
  getHandovers,
  reset,
} from "../../features/handover/handoverSlice";
import Spinner from "../../components/shared/Spinner";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/shared/Pagination";
import { toast } from "react-toastify";
import Filters from "../../components/shared/Filters";

function DisplayHandovers() {
  const { handovers, isLoading, isSuccess } = useSelector(
    (state) => state.handovers
  );
  const [items, setItems] = useState([]);

  //Pagination
  //State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(6);
  //Get current posts
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirsItem = indexOfLastItem - itemPerPage;

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
    ...new Set(handovers.map((Val) => Val.outlet)),
  ];

  const filterItems = (curcat) => {
    const newItem = handovers.filter((newVal) => {
      return newVal.outlet === curcat;
    });
    setItems(newItem);
  };

  //Paginate function
  const paginate = (number) => setCurrentPage(number);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getHandovers());
  }, [dispatch]);

  useEffect(() => {
    setItems(handovers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handovers]);

  if (isLoading) {
    return <Spinner />;
  }

  const onHandoverDelete = (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      dispatch(deleteHandover(id));
      navigate("/handovers");
      toast.success("Handover has been deleted");
      toast.clearWaitingQueue();
    }
  };

  return (
    <>
      <section className="display_handovers_page m-2">
        <div className="container mx-auto mb-10 md:mb-20 mt-10 md:mt-18 md:mt-30 flex flex-col justify-center items-center space-y-6">
          <div className="heading">
            <h1 className="max-w-md text-3xl font-bold md:text-center">
              Handovers
            </h1>
          </div>

          <Filters
            link="/handovers/create"
            filterItems={filterItems}
            setItems={setItems}
            responsibleDepartmentItems={responsibleDepartmentItems}
            Data={handovers}
          />

          <div className="w-full grid grid-cols-1 items-start md:grid-cols-2 gap-4">
            {currentItems.map((handover) => (
              <Handover handover={handover} onClick={onHandoverDelete} />
            ))}
          </div>
          <Pagination
            itemPerPage={itemPerPage}
            totalItems={sortedItems.length}
            paginate={paginate}
          />
        </div>
      </section>
    </>
  );
}
export default DisplayHandovers;
