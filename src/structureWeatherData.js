import { getLocalTimeFromTZOffset } from "./localTime";

export function createStructuredData(data) {
if(data==="")
    return "";
  const resolvedAddress = data.resolvedAddress;
  const currentConditions = getCurrentConditions(data);
  const days = [];

  const currentDay = getStructuredCurrentDay(data);
  days.push(currentDay);

  for (let i = 1; i < 10; i++) {
    const newDay = getStructuredDay(data.days[i]);

    days.push(newDay);
  }

  return {
    resolvedAddress,
    currentConditions,
    days,
  };
}

function getCurrentConditions(data){
  const conditions = data.currentConditions.conditions;
  const temp = data.currentConditions.temp;
  const precippercent = data.currentConditions.precipprob;
  const feelslike = data.currentConditions.feelslike;
  const uvindex = data.currentConditions.uvindex;
  const icon = data.currentConditions.icon;

  const currentConditions = {
    conditions, temp,precippercent,feelslike,uvindex,icon
  }
  return currentConditions;
}

function getStructuredCurrentDay(data) {
  const currentDay = getStructuredDay(data.days[0]);

  currentDay.conditions = data.currentConditions.conditions;
  currentDay.feelslike = data.currentConditions.feelslike;
  currentDay.icon = data.currentConditions.icon;
  currentDay.precippercent = data.currentConditions.precipprob;
  currentDay.temp = data.currentConditions.temp;
  currentDay.uvindex = data.currentConditions.uvindex;

  currentDay.hours = [];
  const findCurrentHourIndex = data.days[0].hours.findIndex((hour) => {
    const localTime = getLocalTimeFromTZOffset(data.tzoffset);
    const currentHour = localTime.getHours();
    const hourOfHour = parseInt(hour.datetime.slice(0, 2));
    return currentHour === hourOfHour;
  });
  for (let i = findCurrentHourIndex; i <= 23; i++) {
    const hour = data.days[0].hours[i];
    const newHour = getStructuredHour(hour);
    if(i===findCurrentHourIndex)
    newHour.currentHour = true;
    currentDay.hours.push(newHour);
  }

  return currentDay;
}

function getStructuredDay(day) {
  const datetime = day.datetime;
  const conditions = day.conditions;
  const feelslike = day.feelslike;
  const icon = day.icon;
  const precippercent = day.precipprob;
  const temp = day.temp;
  const tempmax = day.tempmax;
  const tempmin = day.tempmin;
  const uvindex = day.uvindex;

  const hours = [];
  day.hours.forEach((hour) => {
    const newHour = getStructuredHour(hour);
    hours.push(newHour);
  });

  const newDay = {
    datetime,
    conditions,
    feelslike,
    icon,
    precippercent,
    temp,
    tempmax,
    tempmin,
    uvindex,
    hours,
  };
  return newDay;
}

function getStructuredHour(hour) {
  const datetime = hour.datetime;
  const icon = hour.icon;
  const precippercent = hour.precipprob;
  const temp = hour.temp;
  const uvindex = hour.uvindex;

  const newHour = {
    datetime,
    icon,
    precippercent,
    temp,
    uvindex,
    currentHour:false,
  };
  return newHour;
}
