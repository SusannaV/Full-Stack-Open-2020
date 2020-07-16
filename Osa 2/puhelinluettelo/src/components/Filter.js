import React from "react";

const Filter = (props) => {
  return (
    <div>
      Filter shown with:{" "}
      <input value={props.newSearch} onChange={props.handleSearch} />
    </div>
  );
};

export default Filter;
