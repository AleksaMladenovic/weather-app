let selectedDayDiv;
let selectedDay;
let savedData;

export function displayData(data) {
  if (data === "") {
    return;
  }
  savedData = data;
  resetVariables();
  document.querySelector("p.locationName").textContent = data.resolvedAddress;
  displayDayConditions(data.currentConditions);
  displayDays(data.days);
}


function displayDayConditions(day) {
  document.querySelector("p.condition").textContent = day.conditions;
  displayIcon(document.querySelector("div.icon>img"),day.icon)
  const currentParametarsDiv = document.querySelector("div.currentParametars");
  currentParametarsDiv.querySelector(".currentTemp").textContent = Math.round(
    day.temp,
  );
  currentParametarsDiv.querySelector(".precippercent").textContent =
    Math.round(day.precippercent) + "%";
  currentParametarsDiv.querySelector(".feelslike").textContent =
    Math.round(day.feelslike) + "°";
  currentParametarsDiv.querySelector(".uvindex").textContent = day.uvindex;
}

function resetVariables() {
  selectedDayDiv = undefined;
  selectedDay = undefined;
}

function displayDays(days) {
  const dailyDiv = document.querySelector("div.daily");
  dailyDiv.innerHTML = "";
  const listOfDayDivs = [];
  days.forEach((day) => {
    const dayDiv = createDayDiv(day);
    listOfDayDivs.push(dayDiv);
    dailyDiv.appendChild(dayDiv);

    dayDiv.addEventListener("click", () => {
      clickedDayDivEvent(day, dayDiv);
    });
  });

  clickedDayDivEvent(days[0], listOfDayDivs[0]);
}
function createDayDiv(day) {
  const dayTemplate = document.querySelector("#template-day");
  const dayClone = dayTemplate.content.cloneNode(true);
  const dayDiv = dayClone.querySelector(".day");

  dayDiv.querySelector(".maxtemp").textContent = Math.round(day.tempmax) + "°";
  dayDiv.querySelector(".mintemp").textContent = Math.round(day.tempmin) + "°";
  displayUVindex(dayDiv.querySelector(".uvindexPhoto"), day.uvindex);
  displayIcon(dayDiv.querySelector(".icon>img"), day.icon);
  dayDiv.querySelector(".precipercent").textContent =
    Math.round(day.precippercent) + "%";
  dayDiv.querySelector(".dayOfWeek").textContent = getDayOfWeek(day.datetime);
  dayDiv.querySelector(".date").textContent = formatDate(day.datetime);

  return dayDiv;
}

function displayUVindex(divUVindex, uvindex) {
  if (uvindex === 0) {
    divUVindex.innerHTML = "";
    return;
  }
  divUVindex.querySelector("p").textContent = uvindex;
  const img = divUVindex.querySelector("img");
  let intensity;
  if (uvindex <= 2) intensity = "low";
  else if (uvindex <= 5) intensity = "medium";
  else if (uvindex <= 7) intensity = "high";
  else if (uvindex <= 10) intensity = "very-high";
  else intensity = "extreme";

  import(`./uv-index/uv-index-${intensity}.svg`).then((photo) => {
    img.setAttribute("src", photo.default);
    img.setAttribute("alt", intensity + " level of UV");
  });
}

function displayIcon(img, iconStr) {
  import(`./icons/${iconStr}.svg`).then((photo) => {
    img.setAttribute("src", photo.default);
    img.setAttribute("alt", `Icon of ${iconStr}`);
  });
}

function getDayOfWeek(datetime) {
  const date = new Date(datetime);
  if (isToday(date)) return "Today";
  return date.toDateString().slice(0, 3);
}

function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

function formatDate(datetime) {
  const date = new Date(datetime);
  const dayOfMonth = date.getDate();
  const month = date.toUTCString().slice(8, 11);
  return dayOfMonth + ". " + month;
}

function clickedDayDivEvent(day, dayDiv) {
  if (selectedDay === day) return;
  if (selectedDayDiv !== undefined) {
    selectedDayDiv.classList.remove("selected");
  }
  dayDiv.classList.add("selected");
  selectedDayDiv = dayDiv;
  selectedDay = day;

  if (isToday(new Date(selectedDay.datetime)))
    displayDayConditions(savedData.currentConditions);
  else displayDayConditions(day);
  displayHours(day.hours);
}

function displayHours(hours) {
  const hourlySegment = document.querySelector(".hourly");
  hourlySegment.innerHTML = "";
  hours.forEach((hour) => {
    const hourDiv = createHourDiv(hour);
    hourlySegment.appendChild(hourDiv);
  });
}

function createHourDiv(hour) {
  const hourTemplate = document.querySelector("#template-hour");
  const hourClone = hourTemplate.content.cloneNode(true);
  const hourDiv = hourClone.querySelector("div.hourSegment");

  hourDiv.querySelector(".time").textContent = hour.currentHour
    ? "Now"
    : hour.datetime.slice(0, 5);
  setHeightBasedOnTemp(hourDiv.querySelector(".coloredTemp"), hour.temp);
  hourDiv.querySelector(".temp").textContent = Math.round(hour.temp) + "°";
  displayUVindex(hourDiv.querySelector(".uvindexPhoto"), hour.uvindex);
  displayIcon(hourDiv.querySelector(".icon>img"), hour.icon);
  const roundedPrecippercent = Math.round(hour.precippercent);
  hourDiv.querySelector(".precippercent").textContent =
    roundedPrecippercent === 0 ? "" : roundedPrecippercent + "%";
  return hourDiv;
}

function setHeightBasedOnTemp(div, temp) {
  const tempmax = selectedDay.tempmax;
  const tempmin = selectedDay.tempmin;
  const minpercent = 20;
  const maxpercent = 80;
  const percentHave = maxpercent - minpercent;
  const tempRatio = (temp - tempmin) / (tempmax - tempmin);
  const height = tempRatio * percentHave + minpercent;

  div.style.height = height + "%";
}
