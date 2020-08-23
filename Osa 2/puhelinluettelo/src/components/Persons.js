import React from "react";
import Person from "./Person";

const Persons = (props) => {
  const numbersToShow =
    props.search === ""
      ? props.persons
      : props.persons.filter((peep) =>
          peep.name.toUpperCase().includes(props.search.toUpperCase())
        );

  return (
    <div>
      {numbersToShow.map((dude) => (
        <Person key={dude.name} dude={dude} number={dude.number} handleDelete={props.handleDelete} />
      ))}
    </div>
  );
};

export default Persons;
