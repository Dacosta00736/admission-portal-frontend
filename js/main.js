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

// help compare password if it matches
function comparePwd(pwd, rePwd, errMsg) {
  if (pwd.value != rePwd.value) {
    errMsg.innerHTML = "<i>&#8520;</i> <span>Password do not match!</span>";
    rePwd.style.borderColor = "var(--danger-color)";
  } else {
    errMsg.innerHTML = "";
    rePwd.style.borderColor = "var(--light-grey-color)";
  }
}

function nonDigitalSearch(eleVal) {
  // a global digital search pattern for non-digits
  let pattern = /[^0-9]/g;
  let valid = pattern.test(eleVal);
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
    setTimeout(() => {
      nextBtn.type = 'submit';
    }, 500);
  } else {
    nextBtn.innerText = 'next';
    nextBtn.type = 'button';
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

  // hide current tab
  tab[tabCount].style.display = 'none';

  // increment or decrement the current tab
  tabCount = tabCount + (no);

  // if reach the end of tabs
  if (tabCount >= tab.length) {
    tabCount = (tab.length - 1);
  }

  // otherwise continue to show next or previous tab
  ctrlSignupTabs(tabCount);
};

const checkCardPin = function() {
  const val = cssQry(document, '[name=cardPIN]');

  if ( nonDigitalSearch(val.value) ) {
    val.value =  val.value.slice( 0, (val.value.length - 1) );
    return false;
  }
};

const checkCVV = function() {
  const val = cssQry(document, '[name=cardCVV]');
  if ( nonDigitalSearch(val.value) ) {
    val.value = val.value.slice( 0, (val.value.length - 1) );
    return false;
  }
};

const checkExpiryDate = function() {
  const val = cssQry(document, '[name=cardExpire]');
  const pattern = /[a-zA-Z]/g;
  let valid = pattern.test(val.value);
  let slash = '/';
  if (valid) {
    val.value = val.value.slice( 0, (val.value.length - 1) );
    return false;
  }
};

const checkAcNo = function() {
  const val = cssQry(document, '[name=accNo]');
  if ( nonDigitalSearch(val.value) ) {
    val.value = val.value.slice( 0, (val.value.length - 1) );
    return false;
  }
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

// checks card pin event
cssQry(document, '[name=cardPIN]').addEventListener('keyup', checkCardPin);

// checks card CVV event
cssQry(document, '[name=cardCVV]').addEventListener('keyup', checkCVV);

// checks card expiry date event
cssQry(document, '[name=cardExpire]').addEventListener('keyup', checkExpiryDate);

// checks acc. no_ inputs event
cssQry(document, '[name=accNo]').addEventListener('keyup', checkAcNo);

// compare password on singup form
cssQry(document, "[data-signup-repwd]").addEventListener('keyup', () => {
  comparePwd(
    cssQry(document, "[data-signup-pwd]"),
    cssQry(document, "[data-signup-repwd]"),
    cssQry(document, "[data-repwd-error-msg]")
  );
});

// for login form submission
loginFrm.addEventListener('submit', (e) => {
  e.preventDefault();

  const frmData = getFrmData(loginFrm);
  console.log(frmData);
});

signupFrm.addEventListener('submit', (e) => {
  e.preventDefault();
  const frmData = getFrmData(signupFrm);
  console.log(frmData);
});
/* ====== Event handler ends ====== */