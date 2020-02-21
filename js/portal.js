import { cssQry, cssQryAll } from "./utility-functions.js";

// ====== Mobile navigation menu ======
const nav = cssQry(document, '.nav');
const mobileNavBtn = cssQry(document, '.toggle-mobile-nav-btn');

// event handler for mobile navigation toggle
mobileNavBtn.addEventListener('click', () => {
  // change the mobile menu btn
  mobileNavBtn.classList.toggle('ti-menu');
  mobileNavBtn.classList.toggle('ti-close');
  nav.classList.toggle('show-mobile-nav');
  console.log(nav.scrollHeight);
});

// ====== Mobile navigation menu ends ======