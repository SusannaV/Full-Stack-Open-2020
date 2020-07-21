import React from "react";

const Filter = (props) => {
  return (
    <div>
      Find countries:{" "}
      <input value={props.newSearch} onChange={props.handleSearch} />
    </div>
  );
};

export default Filter;
