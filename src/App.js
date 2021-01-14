import "./App.css";
import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem, Card } from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import { sortData, prettyData } from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  // creating state countries of array of objects
  // *************************************
  const [country, setCountry] = useState("worldwide");
  // creating state for current country state
  const [countryInfo, setCountryInfo] = useState({});
  // creating state for country info of current country

  const [tableData, setTableData] = useState([]);

  const [mapCenter, setMapCenter] = useState({ lat: +20.5937, lng: +78.9629 });
  const [mapZoom, setMapZoom] = useState(3.2);
  const [mapCountries, setMapCountries] = useState([]);

  // state for current displayed info

  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const country = data.map((cntry) => ({
            name: cntry.country,
            value: cntry.countryInfo.iso2,
          }));
          // map((d) => return ({object})))
          setCountries(country);
          //inside getdata we make array country and set this array as state

          const sortedData = sortData(data);

          setTableData(sortedData);
          // using this useeffect since other one has 2 urls for cases

          setMapCountries(data);
        });
    };
    // end of async

    getCountriesData();
  }, []);

  /* [] is triggering the function when change occurs
      now we are setting values of countries */

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    // used backtick ` and not ""

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        if (countryCode === "worldwide") {
          setMapCenter({ lat: +20.5937, lng: +78.9629 });
          setMapZoom(3.2);
        } else {
          setMapCenter({
            lat: data.countryInfo.lat,
            lng: data.countryInfo.long,
          });
          setMapZoom(4);
        }
      });

    // for drop down we have countries state
    // for selecting current country we have country
    // for current country info we have countryInfo
  };

  // **************************************
  const options = countries.map((country) => (
    <MenuItem value={country.value}>{country.name}</MenuItem>
  ));
  // THIS IS FOR OPTIONS COMING FROM COUNTRIES STATE
  /* Loop through array and for every element give a menu item component for the form */
  //MenuItem is pure HTML so {} is neccesary
  // ******************************************

  return (
    <div>
     
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
                {/* Select value shows on the box but onchange event value is from menu item*/}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            {/* infobox title = "cases" */}
            <InfoBox
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              cases={prettyData(countryInfo.todayCases)}
              total={prettyData(countryInfo.cases)}
            />

            {/* infobox title = "recoveries" */}

            <InfoBox
              isGreen={casesType === "recovered"}
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              greenText="true"
              cases={prettyData(countryInfo.todayRecovered)}
              total={prettyData(countryInfo.recovered)}
            />
            {/* infobox title = "deaths" */}

            <InfoBox
              isRed={casesType === "deaths"}
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              redText="true"
              cases={prettyData(countryInfo.todayDeaths)}
              total={prettyData(countryInfo.deaths)}
            />
          </div>

          {/* Map */}
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>

        <Card className="app__right">
          <h3> Live Cases by country</h3>

          <Table data={tableData} />

          {/* Graphs */}
          <h3> Worldwide new {casesType}</h3>

          <LineGraph className="app__graph" casesType={casesType} />
        </Card>
      </div>
    </div>
  );
}

export default App;
