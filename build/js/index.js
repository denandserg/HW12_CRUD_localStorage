"use strict";

window.addEventListener('load', function () {
  if (document.body.id === 'crud') {
    init();
  }
});
var input = document.querySelectorAll(".input-wrapper__inp-text");
var button = document.querySelectorAll(".input-wrapper__btn");
var table = document.getElementById("tablePerson");
var iD = input[0];
var firstName = input[1];
var lastName = input[2];
var age = input[3];
var btnCreate = button[0];
var btnUpdate = button[1];
var btnDelete = button[2];

function init() {
  btnCreate.addEventListener("click", createRow);
  btnDelete.addEventListener("click", deleteRow);
  btnUpdate.addEventListener("click", updateRow);
  createTableHeader(table);
}

function updateRow() {
  for (var i = 0, row; row = table.rows[i]; i++) {
    var col = row.cells[0];

    if (col.textContent === iD.value) {
      table.rows[i].cells[1].innerHTML = firstName.value;
      table.rows[i].cells[2].innerHTML = lastName.value;
      table.rows[i].cells[3].innerHTML = age.value;
      return;
    }
  }

  alert("This ID - ".concat(iD.value, ", not found in table, press - 'CREATE'"));
}

function deleteRow() {
  for (var i = 0, row; row = table.rows[i]; i++) {
    var col = row.cells[0];

    if (col.textContent === iD.value) {
      table.deleteRow(i);
      return;
    }
  }

  alert("This ID - ".concat(iD.value, ", not found in table"));
}

function createRow() {
  if (isCheckID(table, iD)) {
    return;
  }

  var outRow = document.createElement("tr");
  outRow.innerHTML = "<td>".concat(iD.value, "</td><td>").concat(firstName.value, "</td><td>").concat(lastName.value, "</td><td>").concat(age.value, "</td>");
  table.appendChild(outRow);
}

function isCheckID(tbl, id) {
  var table = tbl;
  var iD = id;

  for (var i = 0, row; row = table.rows[i]; i++) {
    var col = row.cells[0];

    if (col.textContent === iD.value) {
      alert("This ID - ".concat(iD.value, ", has already added"));
      return true;
    }

    if (iD.value === "") {
      return true;
    }
  }

  return false;
}

function createTableHeader(tbl) {
  var table = tbl;
  var tableHeader = document.createElement("tr");
  tableHeader.setAttribute('id', 'headerTable');
  tableHeader.innerHTML = "<th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th>";
  table.appendChild(tableHeader);
} // module.exports = {createTableHeader, isCheckID, createRow, deleteRow, updateRow, init};
"use strict";

window.addEventListener("load", function () {
  if (document.body.id === "crudLS") {
    initLS();
  }
});
var inputLS = document.querySelectorAll(".input-wrapper-ls__inp-text");
var buttonLS = document.querySelectorAll(".input-wrapper-ls__btn");
var tableLS = document.getElementById("tablePersonLS");
var iDLS = inputLS[0];
var firstNameLS = inputLS[1];
var lastNameLS = inputLS[2];
var ageLS = inputLS[3];
var btnReadLS = buttonLS[0];
var btnAddStartLS = buttonLS[1];
var btnAddMiddleLS = buttonLS[2];
var btnAddEndLS = buttonLS[3];
var btnSaveLS = buttonLS[4];
var btnDeleteLS = buttonLS[5];
var btnClearLS = buttonLS[6];
var resultArr = [];

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

  var outRow = document.createElement("tr");
  outRow.innerHTML = "<td>".concat(iDLS.value, "</td><td>").concat(firstNameLS.value, "</td><td>").concat(lastNameLS.value, "</td><td>").concat(ageLS.value, "</td>");
  tableLS.appendChild(outRow);
}

function addStartRow() {
  if (isCheckID(tableLS, iDLS)) {
    return;
  }

  var outRow = tableLS.insertRow(1);
  outRow.innerHTML = "<td>".concat(iDLS.value, "</td><td>").concat(firstNameLS.value, "</td><td>").concat(lastNameLS.value, "</td><td>").concat(ageLS.value, "</td>");
}

function addMiddleRow() {
  if (isCheckID(tableLS, iDLS)) {
    return;
  }

  var outRow = tableLS.insertRow(tableLS.rows.length / 2 + 1);
  outRow.innerHTML = "<td>".concat(iDLS.value, "</td><td>").concat(firstNameLS.value, "</td><td>").concat(lastNameLS.value, "</td><td>").concat(ageLS.value, "</td>");
}

function isCheckID(tableLS, iDLS) {
  var table = tableLS;
  var iD = iDLS;

  for (var i = 0, row; row = table.rows[i]; i++) {
    var col = row.cells[0];

    if (col.textContent === iD.value) {
      alert("This ID - ".concat(iD.value, ", has already added"));
      return true;
    }

    if (iD.value === "") {
      return true;
    }
  }

  return false;
}

function deleteRowLS() {
  for (var i = 0, row; row = tableLS.rows[i]; i++) {
    var col = row.cells[0];

    if (col.textContent === iDLS.value) {
      tableLS.deleteRow(i);
      return;
    }
  }

  alert("This ID - ".concat(iDLS.value, ", not found in table"));
}

function clearRowLS() {
  tableLS.innerHTML = "";
  createTableHeader(tableLS);
  localStorage.removeItem("arrayData");
  resultArr = [];
}

function saveLS() {
  resultArr = [];

  for (var i = 1; i < tableLS.rows.length; i++) {
    var id = tableLS.rows[i].cells[0].innerHTML;
    var firstName = tableLS.rows[i].cells[1].innerHTML;
    var lastName = tableLS.rows[i].cells[2].innerHTML;
    var age = tableLS.rows[i].cells[3].innerHTML;
    var curRow = new CurRow(id, firstName, lastName, age);
    resultArr.push(curRow);
  }

  localStorage.setItem("arrayData", JSON.stringify(resultArr));
}

function readLS() {
  try {
    resultArr = JSON.parse(localStorage.getItem("arrayData"));
    tableLS.innerHTML = "";
    createTableHeader(tableLS);
    resultArr.forEach(function (el) {
      var outRow = document.createElement("tr");
      outRow.innerHTML = "<td>".concat(el.id, "</td><td>").concat(el.fName, "</td><td>").concat(el.lName, "</td><td>").concat(el.age, "</td>");
      tableLS.appendChild(outRow);
    });
  } catch (e) {
    throw new Error('LocalStorage is empty');
  }
}

function CurRow(id, fName, lName, age) {
  this.id = id;
  this.fName = fName;
  this.lName = lName;
  this.age = age;
}