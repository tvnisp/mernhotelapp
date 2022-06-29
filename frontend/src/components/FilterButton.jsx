import React from "react";

const FilterButton = ({ filterItem, setItem, menuItems, Data }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
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
      </div>
    </>
  );
};

export default FilterButton;
