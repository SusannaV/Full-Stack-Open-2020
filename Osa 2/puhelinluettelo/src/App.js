import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personservice from "./services/personservices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personservice
    .getAll()
    .then(personToBeAdded => {
      setPersons(personToBeAdded);
    })
  }, []);
  console.log("render", persons.length, "persons");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };


  const handleDelete = (props) => {
    if(window.confirm(`Delete ${props.dude.name}`)){
      personservice
      .deletePerson(props.dude.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== props.dude.id))
    })
      .catch(error => {
        alert(
          `Couldn't remove from database`
        )
      })
      console.log('persons', {persons})
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch} />

      <h2>Add a new number</h2>
      <PersonForm
        name={newName}
        nameChangeHandler={handleNameChange}
        number={newNumber}
        numberChangeHandler={handleNumberChange}
        persons={persons}
        personSetter={setPersons}
        nameSetter={setNewName}
        numberSetter={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons search={newSearch} persons={persons} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;

//*************************************************************** */
//
// jatka tästä seuraavaksi:
//pitää keksiä keino rerenderöidä lista poistamisen jälkeen
//
//*************************************************************** */