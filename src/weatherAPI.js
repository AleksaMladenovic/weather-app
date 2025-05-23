import { createStructuredData } from "./structureWeatherData";

let requestString;
function setRequestString(location) {
  requestString =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    location +
    "?unitGroup=metric&key=3P5CCE7RMMH75XLDDMTUXNRYJ&contentType=json";
}

async function getTheData(location) {
  setRequestString(location);
  try {
    const response = await fetch(requestString, {
      mode: "cors",
    });
    if(!response.ok)
        return "";
    const data = response.json();
    return data;
  } catch (ex) {
    console.log(ex);
    return "";
  }
}

export async function getStructuredData(location) {
  const data = await getTheData(location);
  console.log(data);
  const structuredData = createStructuredData(data);
  return structuredData;
}
