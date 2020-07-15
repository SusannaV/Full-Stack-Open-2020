import React, { useState } from "react";
import Person from "./Person";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const noteObject = {
      name: newName,
    };

    setPersons(persons.concat(noteObject));
    setNewName("");
  };

  const handleNoteChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((dude) => (
          <Person key={dude.name} dude={dude} />
        ))}
      </div>
    </div>
  );
};

export default App;
