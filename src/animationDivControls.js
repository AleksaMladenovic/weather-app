const animationDiv = document.querySelector(".animationDiv");
const container = document.querySelector(".container");

let animationPulse;
startPulsing();

export function focusElement() {
  animationDiv.classList.remove("bigger");
  animationDiv.classList.add("focus");
  container.classList.add("unfocus");
  clearInterval(animationPulse);
}

export function unFocusElement() {
  animationDiv.classList.remove("focus");
  container.classList.remove("unfocus");
  startPulsing();
}

function startPulsing() {
  animationDiv.classList.add("bigger");
  animationPulse = setInterval(() => {
    if (animationDiv.classList.contains("bigger"))
      animationDiv.classList.remove("bigger");
    else animationDiv.classList.add("bigger");
  }, 3000);
}
