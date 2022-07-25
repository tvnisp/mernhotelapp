import React from "react";

const FilterButton = ({ filterItem, setItem, menuItems, Data }) => {
  return (
    <div className="d-flex flex-column align-items-end">
      <p>Filter by department:</p>
      <select
        className="d-block"
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
      {/* <div className="d-flex justify-content-center">
        {menuItems.map((Val, id) => {
          return (
            <button
              className="btn btn-dark border-light d-flex align-items-center  p-1 px-3 mx-5 "
              onClick={() => filterItem(Val)}
              key={id}
            >
              {Val}
            </button>
          );
        })}
        <button
          className="btn btn-dark border-light d-flex align-items-center p-1 px-3 mx-5 "
          onClick={() => setItem(Data)}
        >
          All
        </button>
      </div> */}
    </div>
  );
};

export default FilterButton;
