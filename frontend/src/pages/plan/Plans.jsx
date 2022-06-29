import BackButton from "../../components/BackButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlans, deletePlan, reset } from "../../features/plan/planSlice";
import Spinner from "../../components/Spinner";
import FilterButton from "../../components/FilterButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";

function Plans() {
  const { user } = useSelector((state) => state.auth);
  const { plans, isLoading, isSuccess } = useSelector((state) => state.plans);
  const [item, setItem] = useState(plans);
  const menuItems = [...new Set(plans.map((Val) => Val.outlet))];

  //------

  //Pagination
  //State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(2);
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
    dispatch(getPlans());
  }, [dispatch]);

  useEffect(() => {
    setItem(plans);
  }, [plans]);

  const filterItem = (curcat) => {
    const newItem = plans.filter((newVal) => {
      return newVal.outlet === curcat;
    });
    setItem(newItem);
  };

  const onPlanDelete = (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      dispatch(deletePlan(id));
      navigate("/plans");
      toast.success("Plan has been deleted");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="backButton">
        <BackButton url="/plans" />
      </div>
      <div className="container-fluid">
        <h1 className="text-center">Plans</h1>
        <hr />
        <FilterButton
          filterItem={filterItem}
          setItem={setItem}
          menuItems={menuItems}
          Data={plans}
        />
        <hr />
        <div className="plans mt-3">
          {[...currentItems].reverse().map((plan) => (
            <div className="p-2 mb-2 border">
              <h3>Employee: {plan.username}</h3>
              <hr />
              <h5>
                <b>Outlet:</b> {plan.outlet}
              </h5>

              <h5>
                <b>Date: </b>
                {new Date(plan.createdAt).toLocaleString("en-US")}
              </h5>
              {plan.planImage && (
                <img
                  className="mt-2 mb-2 plan"
                  src={`/${plan.planImage}`}
                  alt={plan.planID}
                />
              )}
              {(user._id === plan.user || plan.rights > 1) && (
                <>
                  <span> </span>
                  <button
                    onClick={(id) => onPlanDelete(plan._id)}
                    className="btn btn-danger d-block"
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

export default Plans;
