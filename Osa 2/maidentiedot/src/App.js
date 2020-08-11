import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow =
  newSearch === ""
      ? countries
      : countries.filter((land) =>
          land.name.toUpperCase().includes(newSearch.toUpperCase())
        );
  

  const handleSearch = (event) => {
    event.preventDefault()
    setNewSearch(event.target.value);
  };

  const handleClick = (props) => (
     setNewSearch(props)
 );
  
  return (
    <div>
      <h1>REST Countries</h1>
      <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <Countries countries={countriesToShow} handleClick={handleClick}/>
    </div>
  );
};
export default App;
