window.addEventListener('load', () => {
  if(document.body.id === 'crud') {
    init();
  }
});

const input = document.querySelectorAll(".input-wrapper__inp-text");
const button = document.querySelectorAll(".input-wrapper__btn");
const table = document.getElementById("tablePerson");
const iD = input[0];
const firstName = input[1];
const lastName = input[2];
const age = input[3];
const btnCreate = button[0];
const btnUpdate = button[1];
const btnDelete = button[2];

function init() {
  btnCreate.addEventListener("click", createRow);
  btnDelete.addEventListener("click", deleteRow);
  btnUpdate.addEventListener("click", updateRow);
  createTableHeader(table);
}

function updateRow() {
  for (let i = 0, row; (row = table.rows[i]); i++) {
    let col = row.cells[0];
    if (col.textContent === iD.value) {
      table.rows[i].cells[1].innerHTML = firstName.value;
      table.rows[i].cells[2].innerHTML = lastName.value;
      table.rows[i].cells[3].innerHTML = age.value;
      return;
    }
  }
  alert(`This ID - ${iD.value}, not found in table, press - 'CREATE'`);
}

function deleteRow() {
  for (let i = 0, row; (row = table.rows[i]); i++) {
    let col = row.cells[0];
    if (col.textContent === iD.value) {
      table.deleteRow(i);
      return;
    }
  }
  alert(`This ID - ${iD.value}, not found in table`);
}

function createRow() {
  if (isCheckID(table,iD)) {
    return;
  }
  const outRow = document.createElement("tr");
  outRow.innerHTML = `<td>${iD.value}</td><td>${firstName.value}</td><td>${
    lastName.value
  }</td><td>${age.value}</td>`;
  table.appendChild(outRow);
}

function isCheckID(tbl,id) {
  const table = tbl;
  const iD = id;
  for (let i = 0, row; row = table.rows[i]; i++) {
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

function createTableHeader(tbl) {
  const table = tbl;
  const tableHeader = document.createElement("tr");
  tableHeader.setAttribute('id', 'headerTable');
  tableHeader.innerHTML =
    "<th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th>";
  table.appendChild(tableHeader);
}

// module.exports = {createTableHeader, isCheckID, createRow, deleteRow, updateRow, init};


