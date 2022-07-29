import Plan from "../../components/plans/Plan";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlans, deletePlan, reset } from "../../features/plan/planSlice";
import Spinner from "../../components/shared/Spinner";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/shared/Pagination";
import { toast } from "react-toastify";
import Filters from "../../components/shared/Filters";

function DisplayHandovers() {
  const { plans, isLoading, isSuccess } = useSelector((state) => state.plans);
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
    ...new Set(plans.map((Val) => Val.outlet)),
  ];

  const filterItems = (curcat) => {
    const newItem = plans.filter((newVal) => {
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
    dispatch(getPlans());
  }, [dispatch]);

  useEffect(() => {
    setItems(plans);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plans]);

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

          <Filters
            link="/incidents/create"
            filterItems={filterItems}
            setItems={setItems}
            responsibleDepartmentItems={responsibleDepartmentItems}
            Data={plans}
          />

          <div className="min-w-full">
            {currentItems.map((plan) => (
              <Plan plan={plan} onClick={onPlanDelete} />
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
