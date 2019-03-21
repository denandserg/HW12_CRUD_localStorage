describe('Function init()', () => {
  const spy = sinon.spy(window, "init");
  it('Should return count of call function init()', () => {
    init();
    assert(spy.callCount, 1);
  });
});

describe('Function createTableHeader()', () => {
  it('Should return table with 1 row (Header)', () => {
    const mockTR = '<th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th>';
    table.innerHTML = '';
    createTableHeader(table);
    const tableRow = table.rows[0].innerHTML;
    assert.equal(tableRow, mockTR);
  });
});

describe('Function isCheckID()', () => {
  it('Should return true with ID.Value = ""', () => {
    const actual = isCheckID(table, iD); 
    assert.equal(actual, true);
  });
  it('Should return true with ID allready added', () => {
    iD.value = 3;
    createRow();
    const actual = isCheckID(table, iD); 
    assert.equal(actual, true);
  });
  it('Should return false with ID not found', () => {
    iD.value = 4;
    const actual = isCheckID(table, iD); 
    assert.equal(actual, false);
  });
});

describe('Function createRow()', () => {
  it('Should return table with 2 row (Header + CurrentRow)', () => {
    iD.value = 3;
    console.log(table);
    createRow();
    const mockRow = `<td>3</td><td></td><td></td><td></td>`;
    assert.equal(table.rows[1].innerHTML, mockRow);
  });
});

describe('Function updateRow()', () => {
  it('Should return table with update 2 row (Header + CurrentRow)', () => {
    iD.value = 3;
    age.value = 20;
    firstName.value = 'vasa';
    updateRow();
    const mockRow = `<td>3</td><td>vasa</td><td></td><td>20</td>`;
    assert.equal(table.rows[1].innerHTML, mockRow);
  });
  it('Should return alert when ID is not defined', () => {
    iD.value = 10;
    age.value = 20;
    firstName.value = 'vasa';
    updateRow();
    assert.equal(undefined, undefined);
  });
});

describe('Function deleteRow()', () => {
  it('Should return table with 1 row (Header), when deleted second row', () => {
    iD.value = 3;
    deleteRow();
    const mockTR = '<th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th>';
    assert.equal(table.rows[0].innerHTML, mockTR);
  });
  it('Should return alert when ID is not defined', () => {
    iD.value = 10;
    age.value = 20;
    firstName.value = 'vasa';
    deleteRow();
    assert.equal(undefined, undefined);
  });
});

describe('Function initLS()', () => {
  const spy = sinon.spy(window, "initLS");
  it('Should return count of call function init()', () => {
    initLS();
    assert(spy.callCount, 1);
  });
});

describe('Constructor CurRow', () => {
  const curRow = new CurRow(3, 'vs', 'ls', 45);
  const testData = [{
    expected: 'id'
  }, {
    expected: 'fName'
  }, {
    expected: 'lName'
  }, {
    expected: 'age'
  }];
  testData.forEach((data) => {
    const {
      expected
    } = data;
    it(`should has curRow propery --> ${expected}`, function () {
      assert.property(curRow, expected);
    });
  });
});

describe('Function addEndRow()', () => {
  it('Should return table with 2 row (Header + CurrentRow)', () => {
    iDLS.value = 7;
    addEndRow();
    const mockRow = `<td>7</td><td></td><td></td><td></td>`;
    assert.equal(tableLS.rows[1].innerHTML, mockRow);
  });
  it('Should return table with added row', () => {
    iDLS.value = 9;
    firstNameLS.value = 'igor';
    lastNameLS.value = 'ivanov';
    ageLS.value = 21;
    addEndRow();
    const mockRow = `<td>9</td><td>igor</td><td>ivanov</td><td>21</td>`;
    assert.equal(tableLS.rows[tableLS.rows.length-1].innerHTML, mockRow);
  });
});

describe('Function addStartRow()', () => {
  it('Should return table with added start row', () => {
    iDLS.value = 11;
    firstNameLS.value = 'igor';
    lastNameLS.value = 'ivanov';
    ageLS.value = 21;
    addStartRow();
    const mockRow = `<td>11</td><td>igor</td><td>ivanov</td><td>21</td>`;
    assert.equal(tableLS.rows[1].innerHTML, mockRow);
  });
});

describe('Function addMiddleRow()', () => {
  it('Should return table with added to middle row', () => {
    console.log(tableLS.rows);
    iDLS.value = 22;
    firstNameLS.value = 'igor';
    lastNameLS.value = 'ivanov';
    ageLS.value = 21;
    addMiddleRow();
    const mockRow = `<td>22</td><td>igor</td><td>ivanov</td><td>21</td>`;
    assert.equal(tableLS.rows[3].innerHTML, mockRow);
  });
});


describe('Function deleteRowLS()', () => {
  it('Should return table with 1 row (Header), when deleted second row', () => {
    iDLS.value = 3;
    deleteRowLS();
    const mockTR = '<th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th>';
    assert.equal(tableLS.rows[0].innerHTML, mockTR);
  });
  it('Should return alert when ID is not defined', () => {
    iDLS.value = 10;
    ageLS.value = 20;
    firstNameLS.value = 'vasa';
    deleteRowLS();
    assert.equal(undefined, undefined);
  });
});

describe('Function clearRowLS()', () => {
  it('Should return table with 1 row (Header), when clear Table', () => {
    clearRowLS();
    const mockTR = '<th>ID</th><th>First Name</th><th>Last Name</th><th>Age</th>';
    assert.equal(tableLS.rows[0].innerHTML, mockTR);
  });
  it('Should return alert when ID is not defined', () => {
    iDLS.value = 10;
    ageLS.value = 20;
    firstNameLS.value = 'vasa';
    deleteRowLS();
    assert.equal(undefined, undefined);
  });
  it('Should clear localStorage', () => {
    clearRowLS();
    assert.equal(localStorage.getItem('arrayData'), undefined);
  });
});

describe('Function readLS()', () => {
  it('Should return table with length=4 row (Header), when localStorage has data with 3 row,', () => {
    clearRowLS();
    for (let i = 0 ; i < 3; i++ ) {
      iDLS.value = i;
      ageLS.value = i+10;
      firstNameLS.value = 'vasa';
      lastNameLS.value = 'uvanov';
      addStartRow();
    }
    saveLS();
    for (let i = 0 ; i < 4; i++ ) {
      tableLS.deleteRow(0);
    }
    readLS();
    assert.equal(tableLS.rows.length,4);
  });
  it('Should return table with length=1 row (Header), when localStorage has data with 0 row,', () => {
    clearRowLS();
    saveLS();
    readLS();
    assert.equal(tableLS.rows.length,1);
  });
  it('Should return throw Error when localStorage is empty', () => {
     clearRowLS();
     assert.throw(function () {
      readLS();
    }, 'LocalStorage is empty');
  });
});

describe('Function saveLS()', () => {
  it('Should add to localStorage data', () => {
    mockData = '[{"id":"2","fName":"vasa","lName":"uvanov","age":"12"},{"id":"1","fName":"vasa","lName":"uvanov","age":"11"},{"id":"0","fName":"vasa","lName":"uvanov","age":"10"}]';
    clearRowLS();
    for (let i = 0 ; i < 3; i++ ) {
      iDLS.value = i;
      ageLS.value = i+10;
      firstNameLS.value = 'vasa';
      lastNameLS.value = 'uvanov';
      addStartRow();
    }
    saveLS();
    assert.equal(localStorage.getItem('arrayData'), mockData);
  });
});











