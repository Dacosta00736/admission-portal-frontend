/* ====== @desc: utility functions ====== */
function id(ele) {
  return document.getElementById(ele);
}

function cssQry(ele, cssQuery) {
  return ele.querySelector(cssQuery);
}

function cssQryAll(ele) {
  return document.querySelectorAll(ele);
}

// for getting a form data through form's ID (forms with name attributes)
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

// for form validations
function validateFrm(frmID) {
  const frmEle = frmID.elements;
  for (let i = 0; i < frmEle.length; i++) {
    if( frmEle[i].value === "" || frmEle[i].value === "undefined" ) {
      console.log('Please fill all the required fields!');
      return false;
    }
  }
  return;
}

// check if tabs input fields not empty
function validateInptField(ele) {
  let valid = ele.every((inpt) => inpt.firstElementChild.value.length > 0);
  return valid;
}
/* ====== @desc: utility functions ends ====== */

const toggleLoginAndSignupFrm = (obj) => {
  const hideFrm = obj.hideFrm;
  const showFrm = obj.showFrm;
  let frmTitle = cssQry(document, '[data-form-title]');

  if ( hideFrm.classList.contains('fade-in') ) {
    hideFrm.classList.remove('fade-in');
    hideFrm.classList.remove('show');
  }

  if ( showFrm.classList.contains('fade-out') ) {
    showFrm.classList.remove('fade-out');
    showFrm.classList.remove('hide');
  }
  
  // add fade-out css class to the form that is to be hidden
  hideFrm.classList.add('fade-out');

  // add fade-in css class to the form that is to be shown
  showFrm.classList.add('fade-in');

  // wait for the fade-out effect to be done. then proceed to display showFrm
  setTimeout(() => {
    // set title of the form we are changing to
    frmTitle.innerHTML = obj.title;
    hideFrm.classList.add('hide');
    showFrm.classList.add('show');
  }, 600);
}

const ctrlSignupTabs = (no) => {
  const tab = cssQryAll('.tab-container .tab');
  let tabLen = tab.length;

  tab[tabCount].style.display = 'block';
  // toggle btw hide/show prev btn
  if (tabCount == 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }
  // change next btn text
  if ( tabCount == (tabLen - 1) ) {
    nextBtn.innerText = 'submit';
  } else {
    nextBtn.innerText = 'next';
  }

  // activate correct steps indicator
  signupStepIndicator(tabCount);
};

const prevNextTab = (no) => {
  // the next & prev. buttons
  const prevBtn =  cssQry(document, '[data-prev-btn]');
  const nextBtn =  cssQry(document, '[data-next-btn]');
  // the tabs
  const tab = cssQryAll('.tab-container .tab');

  // validate all current tab fields if not empty b4 proceeding
  // const tabInptFields = Array.from(tab[tabCount].children);
  // if (!validateInptField(tabInptFields)) {
  //   // warning messages
  //   console.log('Please all fields must be filled!');
  //   // exit the function
  //   return false;
  // }

  // hide current tab
  tab[tabCount].style.display = 'none';

  // increment or decrement the current tab
  tabCount = tabCount + (no);

  // if reach the end of tabs
  if (tabCount >= tab.length) {
    tabCount = (tab.length - 1);
    console.log('submit the form');
    return false;
  }

  ctrlSignupTabs(tabCount);
  console.log(tabCount, no);
};

// @desc: singup progress indicator
const signupStepIndicator = (no) => {
  let indicators = cssQryAll('.indicators');

  // convert to normal array type
  indicators = Array.from(indicators);

  // remove active class from other elements
  indicators.forEach((ele) => ele.classList.remove('active'));

  // add active class to the current element
  indicators[no].classList.add('active');
};

// @desc: signup form obj
const signupFrmObj = {
  title: "sign up",
  hideFrm: cssQry(document, '.login-form-container'),
  showFrm: cssQry(document, ".reg-form-container")
};

// @desc: login form obj
const loginFrmObj = {
  title: "login",
  hideFrm: cssQry(document, '.reg-form-container'),
  showFrm: cssQry(document, ".login-form-container")
};

// @desc: the form's containers toggle btns (signup & login forms)
const showSignupFrm = cssQry(document, '[data-show-reg-frm="show-reg-frm"]');
const showLoginFrm = cssQry(document, '[data-show-login-frm]');

// @desc: the forms (login & signup forms)
const loginFrm = cssQry(document, '[data-login-frm]');
const signupFrm = cssQry(document, '[data-signup-frm]');

// @desc: the signup tabs ctrl btns
const prevBtn = cssQry(document, '[data-prev-btn]');
const nextBtn = cssQry(document, '[data-next-btn]');
let tabCount = 0;

ctrlSignupTabs(tabCount);

/* ====== Event handlers ====== */
showSignupFrm.addEventListener('click', () => {
  toggleLoginAndSignupFrm(signupFrmObj);
});

showLoginFrm.addEventListener("click", () => {
  toggleLoginAndSignupFrm(loginFrmObj);
});

nextBtn.addEventListener("click", () => {
  prevNextTab(1);
});

prevBtn.addEventListener("click", () => {
  prevNextTab(-1);
});

// for login form submission
loginFrm.addEventListener('submit', (e) => {
  e.preventDefault();

  const frmData = getFrmData(loginFrm);
  console.log(frmData);
});
/* ====== Event handler ends ====== */