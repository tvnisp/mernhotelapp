import BackButton from "../../components/BackButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteHandover,
  getHandovers,
  reset,
} from "../../features/handover/handoverSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FilterButton from "../../components/FilterButton";
import Pagination from "../../components/Pagination";

function Handovers() {
  const { user } = useSelector((state) => state.auth);
  const { handovers, isLoading, isSuccess } = useSelector(
    (state) => state.handovers
  );
  const [item, setItem] = useState(handovers);
  const menuItems = [...new Set(handovers.map((Val) => Val.outlet))];

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
    setItem(handovers);
  }, [handovers]);

  if (isLoading) {
    return <Spinner />;
  }

  const onHandoverDelete = (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      dispatch(deleteHandover(id));
      navigate("/handovers");
      toast.success("Handover has been deleted");
    }
  };

  const filterItem = (curcat) => {
    const newItem = handovers.filter((newVal) => {
      return newVal.outlet === curcat;
    });
    setItem(newItem);
  };

  return (
    <>
      <div className="backButton">
        <BackButton url="/handovers" />
      </div>
      <div className="container-fluid">
        <h1 className="text-center">Handovers</h1>
        <hr />
        <FilterButton
          filterItem={filterItem}
          setItem={setItem}
          menuItems={menuItems}
          Data={handovers}
        />
        <hr />
        <div className="handovers mt-3">
          {[...currentItems].reverse().map((handover) => (
            <div className="p-2 mb-2 border">
              <h3>Employee: {handover.username}</h3>
              <hr />
              <h5>
                <b>Outlet:</b> {handover.outlet}
              </h5>
              <h5>
                <b>Shift:</b> {handover.shift}
              </h5>
              <h5>
                <b>Handover:</b> {handover.handoverDescription}
              </h5>
              <h5>
                <b>Date: </b>
                {new Date(handover.createdAt).toLocaleString("en-US")}
              </h5>
              {(user._id === handover.user || user.rights > 1) && (
                <>
                  <span> </span>
                  <button
                    onClick={(id) => onHandoverDelete(handover._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
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

export default Handovers;