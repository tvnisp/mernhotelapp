import Plan from "../../components/plans/Plan";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlans, deletePlan, reset } from "../../features/plan/planSlice";
import Spinner from "../../components/shared/Spinner";
import { useNavigate } from "react-router-dom";
import FilterButton from "../../components/shared/FilterButton";
import Pagination from "../../components/shared/Pagination";
import { toast } from "react-toastify";

function DisplayHandovers() {
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
      <section className="display_plans_page m-2">
        <div className="container mx-auto mb-10 md:mb-20 mt-10 md:mt-18 md:mt-30 flex flex-col justify-center items-center space-y-6">
          <div className="heading">
            <h1 className="max-w-md text-3xl font-bold md:text-center">
              Plans
            </h1>
          </div>
          <FilterButton
            filterItem={filterItem}
            setItem={setItem}
            menuItems={menuItems}
            Data={plans}
          />
          <div className="min-w-full">
            {[...currentItems].reverse().map((plan) => (
              <Plan plan={plan} onClick={onPlanDelete} />
            ))}
          </div>
          <Pagination
            itemPerPage={itemPerPage}
            totalItems={item.length}
            paginate={paginate}
          />
        </div>
      </section>
    </>
  );
}
export default DisplayHandovers;
