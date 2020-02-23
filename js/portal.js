import { cssQry, cssQryAll } from "./utility-functions.js";

// ====== Mobile navigation menu ======
const nav = cssQry(document, '.nav');
const mobileNavBtn = cssQry(document, '.toggle-mobile-nav-btn');

// event handler for mobile navigation toggle
mobileNavBtn.addEventListener('click', () => {
  // change the mobile menu btn
  mobileNavBtn.classList.toggle('ti-menu');
  mobileNavBtn.classList.toggle('ti-close');
  // animate nav menu height when displaying and out of view
  if(nav.style.maxHeight) {
    nav.style.maxHeight = null;
    setTimeout(() => {
      nav.classList.toggle('show-mobile-nav');
    }, 600);
  } else {
    nav.classList.toggle('show-mobile-nav');
    nav.style.maxHeight = nav.scrollHeight + 'px';
  }
  // console.log(nav.scrollHeight);
});

// ====== Mobile navigation menu ends ======