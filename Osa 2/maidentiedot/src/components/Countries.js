import React from "react";
import Country from "./Country";
import TheOneCountry from "./TheOneCountry";

const Countries = (props) => {
  const countriesToShow =
    props.search === ""
      ? props.countries
      : props.countries.filter((land) =>
          land.name.toUpperCase().includes(props.search.toUpperCase())
        );

  let list = [];
  countriesToShow.map((land) => list.push(land));

  if (list.length >= 11) {
    return (
      <div>
        <p>Too many matches, please specify</p>
      </div>
    );
  }

  if (list.length >= 2 && list.length <= 10) {
    return (
      <div>
        {countriesToShow.map((country) => (
          <Country key={country.name} country={country} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {countriesToShow.map((country) => (
          <TheOneCountry key={country.name} country={country} />
        ))}
      </div>
    );
  }
};

export default Countries;
