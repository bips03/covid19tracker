import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const caseTypeColors = {
  cases: {
    hex: "#1F75FE",
    multiplier: 220,
  },
  recovered: {
    hex: "#17B169",
    multiplier: 300,
  },
  deaths: {
    hex: "#ff0000",
    multiplier: 1200,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => b.cases - a.cases);

  return sortedData;
};

export const prettyData = (num) => {
  return num ? `+${numeral(num).format("0.0a")}` : "0";
};

// for circles
export const showDataOnMap = (data, casesType = "cases") => {
  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        color: caseTypeColors[casesType].hex,
        fillColor: caseTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="infobox">
          <div
            className="infoflag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="infoname">{country.country}</div>

          <div className="infocases">
            {" "}
            Cases : {numeral(country.cases).format("0,0")}
          </div>

          <div className="inforecovered">
            {" "}
            Recovered : {numeral(country.recovered).format("0,0")}
          </div>
          <div className="infodeath">
            {" "}
            Deaths : {numeral(country.deaths).format("0,0")}
          </div>
          <div className="infotested">
            {" "}
            Tested : {numeral(country.tests).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
