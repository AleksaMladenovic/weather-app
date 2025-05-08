import { createStructuredData } from "./structureWeatherData";

let requestString;

function setRequestString(location) {
  requestString =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    location +
    "?unitGroup=us&key=3P5CCE7RMMH75XLDDMTUXNRYJ&contentType=json";
}

async function getTheData(location) {
  setRequestString(location);
  const response = await fetch(requestString, {
    mode: "cors",
  });
  const data = response.json();
  return data;
}

export async function getStructuredData(location) {
  const data = await getTheData(location);
  console.log(data);
  const structuredData = createStructuredData(data);
  return structuredData;
}