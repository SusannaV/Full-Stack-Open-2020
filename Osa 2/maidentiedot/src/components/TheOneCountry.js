import React from "react";
import Weather from "./Weather";


const Addimage = ({ flag }) => {
  return (
    <div>
      <img src={flag} alt="flag of the country" height="200" />
    </div>
  );
};



const TheOneCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}> {lang.name} </li>
        ))}
      </ul>
      <Addimage flag={country.flag} />
      <Weather location={country.capital}/>
    </div>
  );

 
};

export default TheOneCountry;

