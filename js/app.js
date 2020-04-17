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
const nav = document.getElementsByClassName('page__header')[0];
const sectionBtn = document.getElementsByClassName('menu__link');
const hideNav = () => setTimeout(() => nav.style.top = nav.style.top = `${-nav.offsetHeight}px`,2000);
let sectIsCollapsed = false;
let scrollTimer = -1;
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
window.addEventListener('scroll', scrollPosActive);


function checkAndActivateSect(){
  for (let i = 0; i < content.length; i++){
    const sectionYPos = content[i].parentElement.getBoundingClientRect().top;
    const sectionHeight = content[i].parentElement.getBoundingClientRect().height;
    const myClass = content[i].parentElement.classList;
    const pos = sectionHeight/2;
    if(sectionYPos < pos && sectionYPos >= -pos){
      if(myClass.contains('your-active-class') === false){
        myClass.add('your-active-class');
        sectionBtn[i].classList.add('menu__link__active');
      }
    }
    else{
      if(myClass.contains('your-active-class')){
        myClass.remove('your-active-class');
        sectionBtn[i].classList.remove('menu__link__active');
      }
    }
  }
}

function showTopBtn(){
  const topBtn = document.getElementById('topBtn');
  if(content[0].parentElement.getBoundingClientRect().top < 0){
    topBtn.classList.add('scroll__top-active');
  }
  else {
    topBtn.classList.remove('scroll__top-active');
  }
}

function hideNavScroll(){
  if(nav.style.top !== "0px"){
    nav.style.top = "0px";
  }
  if(window.pageYOffset > 100) {
    if(scrollTimer !== -1) {
      window.clearTimeout(scrollTimer);
    }
    scrollTimer = hideNav();
  }
  else{
    window.clearTimeout(scrollTimer);
  }
}

function toggleSect(){
  if(this.style.minHeight !== "0px") {
    this.style.minHeight = "0px";
    sectIsCollapsed = true;
    checkAndActivateSect()
  }
  else {
    this.style.minHeight = "80vh";
    sectIsCollapsed = false;
    checkAndActivateSect()
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
    navItems.appendChild(newNavItem);
  }
  navBar.addEventListener('click', scrollToPos);
  navBar.appendChild(navItems);
  document.getElementById('topBtn').addEventListener('click', scrollToPos);
}

//Make section collapsable
function sectionColl(){
  for(section of content){
    const height = section.firstElementChild.offsetHeight;
    section.style.height = `${height}px`;
    section.addEventListener('click', toggleSect);
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
  scrollTarget.scrollIntoView({behavior: "smooth"});
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
sectionColl();
