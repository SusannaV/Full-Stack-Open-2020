import React from "react";
import personservice from "../services/personservices";


const PersonForm = (props) => {
  const addPerson = (event) => {
    event.preventDefault();

    if (
      props.persons.find(
        (p) => p.name.toUpperCase() === props.name.toUpperCase()
      )
    ) {
      window.alert(`${props.name} is already added to phonebook`);
    } else {
      const noteObject = {
        name: props.name,
        number: props.number,
      };
      

      personservice
      .create(noteObject)
      .then(newPerson => {
      props.personSetter(props.persons.concat(newPerson));
    })
    }
    props.nameSetter("");
    props.numberSetter("");
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={props.name} onChange={props.nameChangeHandler} />
      </div>
      <div>
        Number:{" "}
        <input value={props.number} onChange={props.numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
