import React from "react";
import personservice from "../services/personservices";


const PersonForm = (props) => {
  const addPerson = (event) => {
    event.preventDefault();
    if (props.name===""){
      return;
    }
    const existing = props.persons.find((p) => p.name.toUpperCase() === props.name.toUpperCase());

    if (existing) {
      if(window.confirm(`${props.name} is already added to phonebook, replace the old number with a new one?`)){

        const changedPerson = {...existing, number: props.number};
        personservice
          .modifyPerson (existing.id, changedPerson)
          .then(returnedPerson => {
            props.personSetter(props.persons.map(person => person.id !== existing.id ? person : returnedPerson))
            props.okSetter(`Replaced the number for ${props.name}`)
            setTimeout(() => {
              props.okSetter(null)
            }, 5000)
            })
          .catch(error => {
            props.errorSetter(`Information of ${props.name} has already been removed from the server`)
            setTimeout(() => {
              props.okSetter(null)
            }, 5000)
          })     
      }
    } else {
      const noteObject = {
        name: props.name,
        number: props.number};
      personservice
      .create(noteObject)
      .then(newPerson => {
        props.personSetter(props.persons.concat(newPerson));
        })
      props.okSetter(`Added ${props.name}`)
      setTimeout(() => {
      props.okSetter(null)
      }, 5000)
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
