import React from "react";

const FilterButton = ({
  filterItems,
  setItems,
  responsibleDepartmentItems,
  priorityLevelItems,
  Data,
}) => {
  return (
    <div className="flex w-full justify-end">
      <div className="flex flex-col items-end mr-2">
        <p className="text-lg text-darklue ">Filter by department:</p>
        <select
          className="border-2 rounded border-black p-1 md:p-2 relative w-full input input-lg bg-brightRedLight text-white placeholder-white"
          onChange={(e) => {
            e.target.value === "All"
              ? setItems(Data)
              : filterItems(e.target.value, "responsibleDepartment");
          }}
        >
          <option value={"All"}>All</option>
          {responsibleDepartmentItems.map((val, id) => {
            return (
              <option key={id} value={val}>
                {val}
              </option>
            );
          })}
        </select>
      </div>
      {/* <div className="flex flex-col items-end mr-2">
        <p className="text-lg text-darklue ">Filter by priority:</p>
        <select
          className="border-2 rounded border-black p-1 md:p-2 relative w-full input input-lg bg-brightRedLight text-white placeholder-white"
          onChange={(e) => {
            e.target.value === "All"
              ? setItems(Data)
              : filterItems(e.target.value, "priorityLevel");
          }}
        >
          <option value={"All"}>All</option>
          {priorityLevelItems.map((val, id) => {
            return (
              <option key={id} value={val}>
                {val}
              </option>
            );
          })}
        </select>
      </div> */}
    </div>
  );
};

export default FilterButton;
