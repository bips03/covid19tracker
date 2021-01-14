import "./App.css";
import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem,Card } from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

function App() {
  const [countries, setCountries] = useState([]);
  // creating state countries of array of objects
  // *************************************
  const [country, setCountry] = useState(["worldwide"]);
  // creating state for current country state
  const [countryInfo,setCountryInfo] = useState([])
  // creating state for country info of current country
  useEffect( () => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  })
  
  
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const country = data.map((cntry) => ({
            name: cntry.country,
            value: cntry.countryInfo.iso2,
            flag : cntry.countryInfo.flag
          }));
          // map((d) => return ({object})))
          setCountries(country);
          //inside getdata we make array country and set this array as state
        });
    };
    // end of async

    getCountriesData();
  }, []);

  /* [] is triggering the function when change occurs
      now we are setting values of countries */

  const onCountryChange = async (event) => {
    const countryCode = event.target.value

    const url = countryCode === 'worldwide'?
    "https://disease.sh/v3/covid-19/all" :
    `https://disease.sh/v3/covid-19/countries/${countryCode}`
    // used backtick ` and not ""

    await fetch(url)
    .then(response => response.json())
    .then( data => {
        setCountry(countryCode);
        setCountryInfo(data)
    })
    // for drop down we have countries state 
    // for selecting current country we have country
    // for current country info we have countryInfo
  };

  // **************************************
  const options = countries.map((country) => (
    
    
    <MenuItem value={country.value}>
    {country.name}
    </MenuItem>

  ));
  // THIS IS FOR OPTIONS COMING FROM COUNTRIES STATE
  /* Loop through array and for every element give a menu item component for the form */
  //MenuItem is pure HTML so {} is neccesary
  // ******************************************

  return (
    <div className="app">
      <div className="app__left">
        
        
        <div className="app__header">
          <h1> COVID-19 Tracker</h1>
          <FormControl className="header__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {options}
              {/* display the array of menu items*/}
            </Select>
          </FormControl>

        </div>

        <div className="app__stats">
          
          {/* infobox title = "cases" */}
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

          {/* infobox title = "recoveries" */}

          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          {/* infobox title = "deaths" */}

          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}
        <Map />

      </div>

      <Card className="app__right">
      <h3> Live Cases by country</h3>
      {/* Table */ }

      {/* Graphs */}
      <h3> Worldwide new cases</h3>

      </Card>
    </div>
  );
}

export default App;
