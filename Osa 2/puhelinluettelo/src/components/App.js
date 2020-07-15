import React, { useState } from "react";
import Person from "./Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((p) => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const noteObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(noteObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setNewSearch(event.target.value);
    console.log(newSearch);
  };

  const numbersToShow =
    newSearch === ""
      ? persons
      : persons.filter((peep) => peep.name.includes(newSearch));

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        Filter shown with: <input value={newSearch} onChange={handleSearch} />
      </div>

      <h2>Add a new number</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {numbersToShow.map((dude) => (
          <Person key={dude.name} dude={dude} number={dude.number} />
        ))}
      </div>
    </div>
  );
};

export default App;
