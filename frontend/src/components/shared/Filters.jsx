import FilterButton from "./FilterButton";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

function Filters({
  link,
  filterItems,
  setItems,
  priorityLevelItems,
  responsibleDepartmentItems,
  Data,
}) {
  return (
    <div className="w-full flex justify-between items-center">
      <div>
        <Link to={link}>
          <BsPlusSquare className="text-3xl ml-1 mt-8 text-darkBlue" />
        </Link>
      </div>
      <div>
        <FilterButton
          filterItems={filterItems}
          setItems={setItems}
          priorityLevelItems={priorityLevelItems}
          responsibleDepartmentItems={responsibleDepartmentItems}
          Data={Data}
        />
      </div>
    </div>
  );
}
export default Filters;
