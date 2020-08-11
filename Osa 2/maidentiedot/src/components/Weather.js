import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather  = ({location}) => {
const [weather, setWeather] = useState({});
const [loaded, setLoaded] = useState(false);

useEffect(() => {
  const access_key= process.env.REACT_APP_API_KEY

  axios
    .get('http://api.weatherstack.com/current'
    .concat('?access_key='.concat(access_key))
    .concat('&query='.concat(location))
    
    )
    .then(response => {
      const apiResponse = response.data;
      setWeather(apiResponse)
      setLoaded(true)
}).catch(error => {
  console.log(error);
})
}, [location]);

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