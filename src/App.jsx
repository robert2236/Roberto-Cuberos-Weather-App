import axios from "axios";
import { useState, useEffect } from "react";
import "./style.css";
import ClipLoader from "react-spinners/ClipLoader";
import Clima1 from "./img/Clima1.jpg";

function App() {
  const [climate, setClimate] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(success);

      function success(pos) {
        const crd = pos.coords;

        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=b52c3983097db331b846b5b31be60ffc`
          )
          .then((res) => setClimate(res.data));
      }
      setLoading(false);
    }, 2000);
  }, []);

  console.log(climate);

  const changeUnits = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="container">
      {loading ? (
        <div className="circle-charge">
          <ClipLoader color={"#48D441"} loading={loading} size={150} />
        </div>
      ) : (
        <div className="wheather">
          <h1>The Weather Today </h1>
          <h2>
            <i className="fa-solid fa-location-pin "></i>
            {climate.name}, <i className="fa-solid fa-flag flag"></i>
            {climate.sys?.country}
          </h2>
          <div className="wheather-status">
            <img
              className="cloud"
              src={`http://openweathermap.org/img/wn/${climate.weather?.[0].icon}.png`}
              alt=""
            />
            <h2>{climate.weather?.[0].description}</h2>
          </div>
          <h1>
            <i
              className="fa-solid fa-temperature-three-quarters"
              style={{ color: "red" }}
            >
              {" "}
            </i>
            {isCelsius
              ? (climate.main?.temp - 273.15).toFixed(2)
              : ((climate.main?.temp - 273) * (9 / 5) + 32).toFixed(2)}{" "}
            {isCelsius ? "°C" : "°F"}{" "}
          </h1>
          <h1>
            <b>
              <i className="fa-solid fa-wind"></i>
              {climate.wind?.speed} m/s
            </b>
          </h1>
          <h1>
            <i class="fa-solid fa-temperature-empty"></i>
            {climate.main?.pressure} hPa
          </h1>
          <h1>
            <i class="fa-solid fa-droplet"></i>
            {climate.main?.humidity} %
          </h1>
          <button onClick={changeUnits}>°C/°F</button>
        </div>
      )}
    </div>
  );
}

export default App;
