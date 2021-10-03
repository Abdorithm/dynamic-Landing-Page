// Define Global Variables
const doc = document;
const win = window;
const fragment = doc.createDocumentFragment();
const sections = doc.querySelectorAll('section');
const navList = doc.getElementById('navbar__list');

// build the nav
const navBuild = () => {
    
    sections.forEach(section => {

        // populating nav with li elements and anchor elements
        const newLi = doc.createElement('li');
        const newLink = doc.createElement('a');

        // adding class and id attributes, also adding the content 
        // from the data attribute of each section
        newLink.classList.add('menu__link');
        newLink.setAttribute('href', '#' + section.id);
        newLink.textContent = section.dataset.nav;

        // using a document fragment to reduce reflows & repaints
        fragment.appendChild(newLi);
        newLi.appendChild(newLink);

    });

    // finally, adding the fragment to the nav list
    navList.appendChild(fragment);

};
navBuild();

// mobile nav 
// Note: For this specific functionality, I got the main idea of implementation from 
// the tutorial (https://www.youtube.com/watch?v=gXkqy0b4M5g), after which 
// I wrote my code from scratch.
const slideNav = () => {

    const navButton = doc.querySelector('.mobile__nav');
    
    navButton.addEventListener('click', () => {
    
        // toggle the nav
        navList.classList.toggle('navbar-active');

        // animate the nav button
        doc.querySelector('.mobile__nav').classList.toggle('animate-nav');

    });
    
};
slideNav();


// Add class 'active' to section when near top of viewport
sections.forEach(section => {
    win.addEventListener('scroll', () => {

        // clientHeight returns the viewport's height when used on the <html> element
        const viewportHeight = doc.documentElement.clientHeight;
        const sectionHeight = section.clientHeight;

        // getting the top and bottom positions of each section
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        
        // I tried to make the conditions as cross-device compatible as possible 
        if (sectionTop < sectionHeight /5 && sectionBottom > sectionHeight *(0.95)) {
            section.classList.add('active');
        }
        if (sectionBottom < sectionHeight /1.5 || sectionTop > viewportHeight /2.6) {
            section.classList.remove('active');
        }

    });

});

// Scroll to anchor ID using scrollTO event, ScrollIntoView is much
// simpler, but it doesn't work on IOS devices
const navLinks = doc.querySelectorAll('.menu__link');

const linkScroll = () => {

    navLinks.forEach(anchor => anchor.addEventListener('click', anchor => {

        // Prevent the anchor elements from scrolling instantly
        anchor.preventDefault();
        const targetSection = anchor.currentTarget.getAttribute('href');
        
        // scroll smoothly
        win.scrollTo({
            top: doc.querySelector(targetSection).offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    
        // closing the nav in mobile devices when a menu link is clicked
        navList.classList.remove('navbar-active');
        doc.querySelector('.mobile__nav').classList.remove('animate-nav');
        
    }));

};
linkScroll();






