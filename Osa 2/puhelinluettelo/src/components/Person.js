import React from "react";

const Person = ({ dude }) => {
  return (
    <p>
      {dude.name} {dude.number}
    </p>
  );
};

export default Person;
