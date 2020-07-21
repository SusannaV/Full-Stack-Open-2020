import React from "react";

const Addimage = ({ flag }) => {
  return (
    <div>
      <img src={flag} alt="flag of the country" width="30%" height="30%" />
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
    </div>
  );
};

export default TheOneCountry;
