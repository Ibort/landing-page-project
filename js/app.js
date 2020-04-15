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
const navBar = document.getElementById('navbar__list');
window.addEventListener('scroll', scrollPosActive);

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function scrollTopBtn(vis){
  const topBtn = document.getElementById('topBtn');
  if (vis === 1){
    topBtn.classList.add('scroll__top-active')
  }
  if (vis === 0){
    topBtn.classList.remove('scroll__top-active')
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav(){
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

// Add class 'active' to section when near top of viewport
function scrollPosActive(){
  const sectionBtn = document.getElementsByClassName('menu__link');
  for (let i = 0; i < content.length; i++){
    const sectionYPos = content[i].parentElement.getBoundingClientRect().top;
    const sectionHeight = content[i].parentElement.getBoundingClientRect().height;
    const myClass = content[i].parentElement.classList;
    const pos = sectionHeight/2;
    if(sectionYPos < pos && sectionYPos >= -pos){
      if(myClass.contains('your-active-class') === false){
        myClass.toggle('your-active-class');
        sectionBtn[i].classList.toggle('menu__link__active');
      }
    }
    else{
      if(myClass.contains('your-active-class')){
        myClass.toggle('your-active-class');
        sectionBtn[i].classList.toggle('menu__link__active');
      }
    }
  }
  if(content[0].parentElement.getBoundingClientRect().top < 0){
    scrollTopBtn(1);
  }
  else {
    scrollTopBtn(0);
  }
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
