/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const content = document.getElementsByClassName('landing__container');
let scrollTimer = -1;
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
// adding scroll eventlisterent to window
window.addEventListener('scroll', scrollPosActive);

// check every main scetion element scroll position and active style in viewport
function checkAndActivateSect(){
  const sectionBtn = document.getElementsByClassName('menu__link');
  for (let i = 0; i < content.length; i++){
    const sectionYPos = content[i].parentElement.getBoundingClientRect().top;
    const sectionHeight = content[i].parentElement.getBoundingClientRect().height;
    const myClass = content[i].parentElement.classList;
    const pos = sectionHeight/2;
    const toggleClass = (add) => {
      if(add){
        myClass.add('your-active-class');
        sectionBtn[i].classList.add('menu__link__active');
      }
      else{
        myClass.remove('your-active-class');
        sectionBtn[i].classList.remove('menu__link__active');
      }
    }
    if(content[i].classList.contains('collapsed') === false){
      if(sectionYPos < pos && sectionYPos >= -pos){
        if(myClass.contains('your-active-class') === false){
          toggleClass(true);
        }
      }
      else{
          toggleClass(false);
      }
    }
    else {
      toggleClass(false);
    }
  }
}

// scroll top button hide and show function
function showTopBtn(){
  const topBtn = document.getElementById('topBtn');
  if(content[0].parentElement.getBoundingClientRect().top < 0){
    topBtn.classList.add('scroll__top__active');
  }
  else {
    topBtn.classList.remove('scroll__top__active');
  }
}

// navigation bar hide and show after scroll function
function hideNavScroll(){
  const nav = document.getElementsByClassName('page__header')[0];
  if(nav.style.top !== "0px"){
    nav.style.top = "0px";
  }
  if(window.pageYOffset > 100) {
    if(scrollTimer !== -1) {
      window.clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => nav.style.top = `${-nav.offsetHeight}px`,2000);
  }
  else{
    window.clearTimeout(scrollTimer);
  }
}

// main section collapse in and out on click function
function toggleSect(){
  const landCont = this.parentElement;
  const getStyle = window.getComputedStyle(landCont)
  const padding = parseFloat(getStyle.paddingTop) + parseFloat(getStyle.paddingBottom);
  const height = this.offsetHeight + padding;
  const toggle = (maxHe, minHe, timeOut) => {
    landCont.style.maxHeight = maxHe;
    landCont.style.minHeight = minHe;
    landCont.classList.toggle('collapsed');
    setTimeout(checkAndActivateSect, timeOut);
  }
  if(landCont.style.minHeight !== "0px") {
    toggle(`${height}px`, '0', 0);
  }
  else {
    toggle(null, null, 1000);
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav(){
  const navBar = document.getElementById('navbar__list');
  const navItems = document.createDocumentFragment();
  navBar.innerHTML = "";

  for (const section of content){
    const newNavItem = document.createElement('li')
    const navText = section.parentElement.dataset.nav;
    const navId = section.parentElement.id;
    newNavItem.innerHTML = `<button class='menu__link' data-nav='${navId}'>${navText}</button>`;
    newNavItem.addEventListener('mouseenter', () => event.target.firstElementChild.classList.add('menu__link__hover'));
    newNavItem.addEventListener('mouseleave', () => event.target.firstElementChild.classList.remove('menu__link__hover'));
    navItems.appendChild(newNavItem);
  }
  navBar.addEventListener('click', scrollToPos);

  navBar.appendChild(navItems);
  document.getElementById('topBtn').addEventListener('click', scrollToPos);
  sectionColl();
}

//Make section collapsable
function sectionColl(){
  for(section of content){
    section.firstElementChild.addEventListener('click', toggleSect);
  }
}

// Add class 'active' to section when near top of viewport
function scrollPosActive(){
  checkAndActivateSect();
  showTopBtn();
  hideNavScroll();
}

// Scroll to anchor ID using scrollTO event
function scrollToPos(){
  const clickedBtn = event.target.dataset.nav;
  const scrollTarget = document.getElementById(clickedBtn);
  // remove hower at touchscreen
  event.target.classList.remove('menu__link__hover')
  setTimeout(() => scrollTarget.scrollIntoView({behavior: "smooth"}), 200);
  // open section tab if it is colapsed
  if(scrollTarget.firstElementChild.classList.contains('collapsed')){
    scrollTarget.firstElementChild.firstElementChild.click();
  }
}

/**
 * End Main Functions
 * Begin Events
 *
*/
//Add your-active-class to the section in <main> tag

// Build menu
buildNav();
// Scroll to section on link click
//scrollToPos()
// Set sections as active
//scrollPosActive()
//Section collapsable
//toggleSect()
