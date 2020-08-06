import React from "react";
import TheOneCountry from "./TheOneCountry";

const Countries = (props) => {

 const Button = ({handleClick}) => (
  <button onClick={handleClick}>Show</button>
);
  if (props.countries.length >= 11) {
    return (
      <div>
        <p>Too many matches, please specify</p>
      </div>
    );
  }
  if (props.countries.length >= 2 && props.countries.length <= 10) {
    return (
      <>
        {props.countries.map((country) => (
          <div key={country.name}>
          {country.name}
          <Button handleClick={() => props.handleClick(country.name)}/>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <div>
        {props.countries.map((country) => (
          <TheOneCountry key={country.name} country={country} />
        ))}
      </div>
    );
  }
};

export default Countries;