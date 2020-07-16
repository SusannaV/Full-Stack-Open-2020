import React from "react";
import Person from "./Person";

const Persons = (props) => {
  const numbersToShow =
    props.search === ""
      ? props.persons
      : props.persons.filter((peep) =>
          peep.name.toUpperCase().includes(props.search.toUpperCase())
        );
  console.log("tämän haluan nähdä", numbersToShow);

  return (
    <div>
      {numbersToShow.map((dude) => (
        <Person key={dude.name} dude={dude} number={dude.number} />
      ))}
    </div>
  );
};

export default Persons;
