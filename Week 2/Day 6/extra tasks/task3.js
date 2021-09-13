// TASK 3
const length = document.getElementById("first-input");
const breadth = document.getElementById("second-input");
const calcArea = document.getElementById("area");

calcArea.addEventListener("click", () => {
    let area = length.value * breadth.value;
    calcArea.replaceWith("The total Area is: " + area);
});