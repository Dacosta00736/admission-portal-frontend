import { id, cssQry, cssQryAll, getFrmData } from './utility-functions.js';

// tab counter
let tabCounter = 0;

// method for showing tabs
const showTab = function(tabNo) {
  const tabs = cssQryAll('.tab-container .tab');
  const nextBtn = cssQry(document, '[data-next-btn]');
  const prevBtn = cssQry(document, '[data-prev-btn]');
  let totalTab = tabs.length;
  let indicatorTitle = cssQry(document, '.indicator-title');

  // display current tab
  tabs[tabNo].style.display = "block";
  indicatorTitle.innerText = tabs[tabNo].title;

  // toggle btw hiding/showing prevBtn
  if ( tabNo == 0 ) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'block';
  }

  // change next btn text
  if ( tabCounter == (totalTab - 1) ) {
    nextBtn.innerText = 'submit';
    setTimeout(() => {
      nextBtn.type = 'submit';
    }, 500);
  } else {
    nextBtn.innerText = 'next';
    nextBtn.type = 'button';
  }

  // activate correct steps indicator
  stepIndicator(tabCounter);

  console.log(`tabCounter: ${tabNo}. total tab: ${totalTab}`);
};

// @desc: method for transversing through the tabs
const prevNextTab = function(no) {
  // the tabs
  const tab = cssQryAll('.tab-container .tab');

  // hide current tab
  tab[tabCounter].style.display = 'none';

  // increment or decrement the current tab
  tabCounter = tabCounter + (no);

  // if reach the end of tabs
  if (tabCounter >= tab.length) {
    tabCounter = (tab.length - 1);
  }

  // otherwise continue to show next or previous tab
  showTab(tabCounter);
};

// @desc: for showing correct step indication
const stepIndicator = function(no) {
  let indicators = cssQryAll('.indicators');

  // convert to normal array type
  indicators = Array.from(indicators);

  // remove active class from other elements
  indicators.forEach((ele) => ele.classList.remove('active'));

  // add active class to the current element
  indicators[no].classList.add('active');
};

showTab(tabCounter);

// prevBtn event handler
cssQry(document, '[data-prev-btn]').addEventListener('click', () => {
  prevNextTab(-1);
});

// nextBtn event handler
cssQry(document, '[data-next-btn]').addEventListener('click', () => {
  prevNextTab(1);
});

// @desc: admission form submission
cssQry(document, '[data-admission-frm]').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('admission form submitted!');
});