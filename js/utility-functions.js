const id = (ele) => {
  return document.getElementById(ele);
}

const cssQry = (ele, cssQuery) => {
  return ele.querySelector(cssQuery);
}

const cssQryAll = (ele) => {
  return document.querySelectorAll(ele);
}

// get a form data through form's ID (forms with name attributes)
function getFrmData(frmID) {
  const frmEle = frmID.elements;
  let frmData = {};

  // iterate through the form, get its name attr. and values into frmData obj variable
  for(let x = 0; x < frmEle.length; x++) {
    frmData[frmEle[x].name] = frmEle[x].value;
  }

  // delete empty keys/values pairs
  delete frmData[""];

  return frmData;
}

const something = 'hello there JS modules';
const greet = function() {
  console.log('top of the morning to you, sir!');
};

export { something, greet, id, cssQry, cssQryAll, getFrmData };