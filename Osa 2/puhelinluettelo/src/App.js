import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personservice from "./services/personservices";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [okMessage, setokMessage] = useState(null);

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

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  const Errormessagehandler = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const handleDelete = (props) => {
    if(window.confirm(`Delete ${props.dude.name}`)){
      personservice
      .deletePerson(props.dude.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== props.dude.id))
    })
      .catch(error => {
        setErrorMessage("Couldn't remove from database")
      })
      setokMessage(`Deleted ${props.dude.name}`)
      setTimeout(() => {
        setokMessage(null)
      }, 5000)
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={okMessage} />
      <Errormessagehandler message={errorMessage} />
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
        errorSetter={setErrorMessage}
        okSetter={setokMessage}
      />

      <h2>Numbers</h2>
      <Persons search={newSearch} persons={persons} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;