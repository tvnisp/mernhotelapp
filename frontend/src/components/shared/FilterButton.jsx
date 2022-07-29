import React from "react";

const FilterButton = ({ filterItem, setItem, menuItems, Data }) => {
  return (
    <div className="self-end flex flex-col items-end mr-2">
      <p className="text-lg text-darklue ">Filter by department:</p>
      <select
        className="border-2 rounded border-black p-1 md:p-2 relative w-full input input-lg bg-brightRedLight text-white placeholder-white"
        onChange={(e) => {
          e.target.value === "All" ? setItem(Data) : filterItem(e.target.value);
        }}
      >
        <option value={"All"}>All</option>
        {menuItems.map((val, id) => {
          return (
            <option key={id} value={val}>
              {val}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterButton;
