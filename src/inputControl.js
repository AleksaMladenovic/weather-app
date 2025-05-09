import { focusElement, unFocusElement } from "./animationDivControls";
import { displayData, displayNoDataMessage, hideNoDataMessage } from "./displayingData";
import { getStructuredData } from "./weatherAPI";

const input = document.querySelector("input");

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const location = input.value;
    getStructuredData(location).then((structuredData) => {
      if (structuredData !== "") {
        displayData(structuredData);
        input.blur();
      }
      else{
        displayNoDataMessage();
      }
    });
  }
});

input.addEventListener("focus", () => {
  focusElement();
});
input.addEventListener("focusout", () => {
  unFocusElement();
  hideNoDataMessage();
});

input.addEventListener("input",()=>{
  hideNoDataMessage();
})