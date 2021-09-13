// TASK 2
let table = document.getElementById("table");
let addBtn = document.getElementById("add-btn");
let delBtn = document.getElementById("delete-btn");

table.style.border = "1px solid black";

addBtn.style.background = "green";
addBtn.style.color = "white"
addBtn.style.marginTop = "5px";
addBtn.style.marginBottom = "5px";

delBtn.style.background = "red";
delBtn.style.color = "white"
delBtn.style.marginTop = "5px";
delBtn.style.marginBottom = "5px";

addBtn.addEventListener("click", () => {
    let newrow = table.insertRow();
    let cell = newrow.insertCell();
    cell.innerHTML = "New Row ADDED";
});

delBtn.addEventListener("click", () => {
    let rowCount = table.rows.length;
    table.deleteRow(rowCount - 1);
});