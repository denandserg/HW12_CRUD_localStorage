window.addEventListener("load", () => {
  if (document.body.id === "crudLS") {
    initLS();
  }
});

const inputLS = document.querySelectorAll(".input-wrapper-ls__inp-text");
const buttonLS = document.querySelectorAll(".input-wrapper-ls__btn");
const tableLS = document.getElementById("tablePersonLS");
const iDLS = inputLS[0];
const firstNameLS = inputLS[1];
const lastNameLS = inputLS[2];
const ageLS = inputLS[3];
const btnReadLS = buttonLS[0];
const btnAddStartLS = buttonLS[1];
const btnAddMiddleLS = buttonLS[2];
const btnAddEndLS = buttonLS[3];
const btnSaveLS = buttonLS[4];
const btnDeleteLS = buttonLS[5];
const btnClearLS = buttonLS[6];
let resultArr = [];

function initLS() {
  createTableHeader(tableLS);
  btnAddEndLS.addEventListener("click", addEndRow);
  btnAddStartLS.addEventListener("click", addStartRow);
  btnAddMiddleLS.addEventListener("click", addMiddleRow);
  btnDeleteLS.addEventListener("click", deleteRowLS);
  btnClearLS.addEventListener("click", clearRowLS);
  btnSaveLS.addEventListener("click", saveLS);
  btnReadLS.addEventListener("click", readLS);
}

function addEndRow() {
  if (isCheckID(tableLS, iDLS)) {
    return;
  }
  const outRow = document.createElement("tr");
  outRow.innerHTML = `<td>${iDLS.value}</td><td>${firstNameLS.value}</td><td>${
    lastNameLS.value
  }</td><td>${ageLS.value}</td>`;
  tableLS.appendChild(outRow);
}

function addStartRow() {
  if (isCheckID(tableLS, iDLS)) {
    return;
  }
  const outRow = tableLS.insertRow(1);
  outRow.innerHTML = `<td>${iDLS.value}</td><td>${firstNameLS.value}</td><td>${
    lastNameLS.value
  }</td><td>${ageLS.value}</td>`;
}

function addMiddleRow() {
  if (isCheckID(tableLS, iDLS)) {
    return;
  }
  const outRow = tableLS.insertRow(tableLS.rows.length / 2 + 1);
  outRow.innerHTML = `<td>${iDLS.value}</td><td>${firstNameLS.value}</td><td>${
    lastNameLS.value
  }</td><td>${ageLS.value}</td>`;
}

function isCheckID(tableLS, iDLS) {
  const table = tableLS;
  const iD = iDLS;
  for (let i = 0, row; (row = table.rows[i]); i++) {
    let col = row.cells[0];
    if (col.textContent === iD.value) {
      alert(`This ID - ${iD.value}, has already added`);
      return true;
    }
    if (iD.value === "") {
      return true;
    }
  }
  return false;
}

function deleteRowLS() {
  for (let i = 0, row; (row = tableLS.rows[i]); i++) {
    let col = row.cells[0];
    if (col.textContent === iDLS.value) {
      tableLS.deleteRow(i);
      return;
    }
  }
  alert(`This ID - ${iDLS.value}, not found in table`);
}

function clearRowLS() {
  tableLS.innerHTML = "";
  createTableHeader(tableLS);
  localStorage.removeItem("arrayData");
  resultArr = [];
}

function saveLS() {
  resultArr = [];
  for (let i = 1; i < tableLS.rows.length; i++) {
    const id = tableLS.rows[i].cells[0].innerHTML;
    const firstName = tableLS.rows[i].cells[1].innerHTML;
    const lastName = tableLS.rows[i].cells[2].innerHTML;
    const age = tableLS.rows[i].cells[3].innerHTML;
    const curRow = new CurRow(id, firstName, lastName, age);
    resultArr.push(curRow);
  }
  localStorage.setItem("arrayData", JSON.stringify(resultArr));
}

function readLS() {
  try {
    resultArr = JSON.parse(localStorage.getItem("arrayData"));
    tableLS.innerHTML = "";
    createTableHeader(tableLS);
    resultArr.forEach(el => {
      const outRow = document.createElement("tr");
      outRow.innerHTML = `<td>${el.id}</td><td>${el.fName}</td><td>${
        el.lName
      }</td><td>${el.age}</td>`;
      tableLS.appendChild(outRow);
    });
  } catch (e) {
    throw new Error ('LocalStorage is empty');
  }
}

function CurRow(id, fName, lName, age) {
  this.id = id;
  this.fName = fName;
  this.lName = lName;
  this.age = age;
}
