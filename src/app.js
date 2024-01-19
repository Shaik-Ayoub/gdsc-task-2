const calciNumbers = document.querySelectorAll(".calciNumber");
const operators = document.querySelectorAll(".o");
const clearEntry = document.querySelector(".delete");
const equals = document.querySelector(".equals");
const display = document.getElementById("display");
const backButton = document.getElementById("backButton");

let displayString = "";

clearEntry.addEventListener("click", (e) => {
  e.preventDefault();
  displayString = "";
  display.value = null;
});

backButton.addEventListener("click", (e) => {
  e.preventDefault();
  displayString = displayString.slice(0, displayString.length - 1);
  display.value = displayString;
});

calciNumbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    e.preventDefault();
    displayString += e.target.dataset.val;
    display.value = displayString;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    e.preventDefault();
    if (displayString.length) {
      displayString += e.target.dataset.val;
      display.value = displayString;
    }
  });
});

equals.addEventListener("click", (e) => {
  e.preventDefault();
  if (displayString.length) {
    try {
      // Replace custom symbols with their corresponding Math functions
      let evalString = displayString.replace(/x/g, "*");
      evalString = evalString.replace(/π/g, "Math.PI");
      evalString = evalString.replace(/√/g, "Math.sqrt");
      evalString = evalString.replace(/e/g, "Math.exp");

      // Convert degrees to radians for trigonometric functions
      evalString = evalString.replace(/sin\(/g, "Math.sin((Math.PI/180)*");
      evalString = evalString.replace(/cos\(/g, "Math.cos((Math.PI/180)*");
      evalString = evalString.replace(/tan\(/g, "Math.tan((Math.PI/180)*");

      evalString = evalString.replace(/log\(/g, "Math.log10(");
      evalString = evalString.replace(/ln\(/g, "Math.log(");

      display.value = eval(evalString);
      displayString = "";
    } catch (error) {
      display.value = "Error";
    }
  }
});
