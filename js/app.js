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
// function addActiveClass(){
//   for (section of content){
//     const myClass = section.parentElement.classList;
//     if(myClass.contains('your-active-class')){
//       myClass.toggle('your-active-class');
//     }
//     else{
//       myClass.add('your-active-class');
//       myClass.toggle('your-active-class');
//     }
//   }
// }

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav(){
  const navItems = document.createDocumentFragment();

  navBar.innerHTML = "";

  for (let section of content){
    const newNavItem = document.createElement('li')
    const navText = section.parentElement.dataset.nav;
    const navId = section.parentElement.id;

    newNavItem.innerHTML = `<a class='menu__link' href='#${navId}'>${navText}</a>`;
    navItems.appendChild(newNavItem);
  }
  navBar.appendChild(navItems);
}

// Add class 'active' to section when near top of viewport
function scrollPosActive(){
  for (section of content){
    const sectionYPos = section.getBoundingClientRect().top;
    const sectionHeight = section.getBoundingClientRect().height;
    const myClass = section.parentElement.classList;
    const pos = sectionHeight;
    if(sectionYPos < pos && sectionYPos >= -pos/2){
      if(myClass.contains('your-active-class') === false){
        myClass.toggle('your-active-class');
      }
    }
    else{
      if(myClass.contains('your-active-class')){
        myClass.toggle('your-active-class');
      }
    }
  }
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/
//Add your-active-class to the section in <main> tag
// addActiveClass();
// Build menu
buildNav();
// Scroll to section on link click

// Set sections as active
