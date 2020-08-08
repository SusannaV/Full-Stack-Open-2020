import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather  = ({location}) => {

console.log('Weather propsit ' + location)
const [weather, setWeather] = useState({});
const [loaded, setLoaded] = useState(false);

const api_key = process.env.REACT_APP_API_KEY

const params = {
  access_key: api_key,
  query: {location}
}

useEffect(() => {
  axios
    .get('http://api.weatherstack.com/current', {params})
    .then(response => {
      const apiResponse = response.data;
      console.log('useEffect', response.data)
      setWeather(apiResponse)
      setLoaded(true)
      console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`) 
}).catch(error => {
  console.log(error);
})
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const Addimage = ({ image }) => {
  return (
    <>
      <img src={image} alt="weather symbol" height="60" />
    </>
  );
};


if (!loaded){
  return (
    <div>Loading weather.... Please wait</div>
  )
}
  return (
    console.log('returning weather:', weather),
      <>
      <h3>
          Weather in {location}
      </h3>
    <p>
        Temperature: {weather.current.temperature}°C
        
    </p>
    <p>
    <Addimage image={weather.current.weather_icons} />
    </p>
    <p>
      Wind: {weather.current.wind_speed} m/h, direction: {weather.current.wind_dir}
    </p>
  </>)
}
  export default Weather;