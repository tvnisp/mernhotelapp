import FilterButton from "./FilterButton";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import FormButton from "./FormButton";

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
          <div className="pt-6">
            <FormButton>
              Add new <BsPlusLg className="inline pb-1 ml-1" />
            </FormButton>
          </div>
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
