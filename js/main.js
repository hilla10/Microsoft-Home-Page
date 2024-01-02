// Accordion


document.addEventListener('DOMContentLoaded', function () {
    var accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(function (header) {
        header.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor tag behavior

            var accordionItem = this.parentNode;

            if (accordionItem.classList.contains('active')) {
                accordionItem.classList.remove('active');
            } else {
                var activeItem = document.querySelector('.accordion-item.active');

                if (activeItem) {
                    activeItem.classList.remove('active');
                }

                accordionItem.classList.add('active');
            }
        });
    });
});


// Hamburger

const hamburger = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.mobile');
let activeMenu = null;

// Toggle the menu when a hamburger menu is clicked
hamburger.addEventListener('click', function () {
    toggleMenu(hamburger, menu);
});

// Hide the menu when clicking outside of it
document.addEventListener('click', function (event) {
    const targetElement = event.target;

    // Check if the clicked element is outside of the mobile menu
    if (!menu.contains(targetElement) && !hamburger.contains(targetElement)) {
        closeMenu(hamburger, menu);
    }
});

// Hide the menu when the screen size changes from larger to smaller
window.addEventListener('resize', function () {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 860) { // Adjust the breakpoint value as needed
        closeMenu(hamburger, menu);
    }
});

// Close the currently active menu and open the clicked menu
function toggleMenu(clickedHamburger, clickedMenu) {
    if (activeMenu === clickedMenu) {
        closeMenu(clickedHamburger, clickedMenu);
    } else {
        if (activeMenu) {
            closeMenu(hamburger, activeMenu);
        }
        activeMenu = clickedMenu;
        clickedHamburger.classList.add('active');
        clickedMenu.classList.add('active');
    }
}

// Close the menu by removing the 'active' class from the hamburger menu and the mobile menu
function closeMenu(hamburger, menu) {
    hamburger.classList.remove('active');
    menu.classList.remove('active');
    activeMenu = null;
}


// DropDown


window.onclick = function (event) {
    // Handle dropdown 1
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }

    // Handle dropdown 2
    if (!event.target.matches('.dropbtn1')) {
        var dropdowns1 = document.getElementsByClassName("dropdown-content1");
        var j;
        for (j = 0; j < dropdowns1.length; j++) {
            var openDropdown1 = dropdowns1[j];
            if (openDropdown1.classList.contains('show1')) {
                openDropdown1.classList.remove('show1');
            }
        }
    }
};

function myFunction() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

function myFunction1() {
    document.getElementById("dropdown-content1").classList.toggle("show1");
}


// Scroll and back

var backToTop = document.querySelector('.back-to-top');
var isLinkFocused = false;

backToTop.addEventListener('click', function (event) {
    event.preventDefault();
    scrollToTop();
    backToTop.focus();
    isLinkFocused = true;
});

function scrollToTop() {
    var currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 12);
    }
}

window.addEventListener('scroll', function () {
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;

    if (scrollPosition >= 700) {
        backToTop.style.opacity = '1';
    } else {
        backToTop.style.opacity = '0';
    }

    if (isLinkFocused && scrollPosition === 0) {
        backToTop.querySelector('.btn-top').style.outline = 'none'; // Remove focus outline when scrolled back to the top
        isLinkFocused = false; // Reset the flag
    }
});

//  hide the content

document.addEventListener('DOMContentLoaded', function () {
    var noThanks = document.querySelector('.btn-none');
    var mainHeader = document.querySelector('.main-header');
    var dropdownContent = document.querySelector('.dropdown-content');

    // Check if the link was previously clicked and hide the header accordingly
    var isHeaderHidden = localStorage.getItem('isHeaderHidden');
    if (isHeaderHidden === 'true') {
        mainHeader.style.display = 'none';
        dropdownContent.style.top = '3.5rem';
    }

    noThanks.addEventListener('click', function () {
        // Add the 'reject' class to the header
        mainHeader.classList.add('reject');

        // Hide the header and store the state in localStorage
        mainHeader.style.display = 'none';
        dropdownContent.style.top = '3.5rem';
        localStorage.setItem('isHeaderHidden', 'true');
    });
});


// Slide show for the first

// Access the Images
let slideImages = document.querySelectorAll('.bg-img');
// Access the next and prev buttons
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
// Access the indicators
let dots = document.querySelectorAll('.dot');

var counter = 0;
var pause = false;

// Code for next button
next.addEventListener('click', slideNext);

function slideNext() {
    slideImages[counter].style.animation = 'next1 1s ease forwards';
    if (counter >= slideImages.length - 1) {
        counter = 0;
    } else {
        counter++;
    }
    slideImages[counter].style.animation = 'next2 1s ease forwards';
    indicators();
}

// Code for prev button
prev.addEventListener('click', slidePrev);

function slidePrev() {
    slideImages[counter].style.animation = 'prev1 1s ease forwards';
    if (counter == 0) {
        counter = slideImages.length - 1;
    } else {
        counter--;
    }
    slideImages[counter].style.animation = 'prev2 1s ease forwards';
    indicators();
}

// Auto sliding
var interval;

function autoSliding() {
    interval = setInterval(timer, 10000);

    function timer() {
        if (!pause) {
            slideNext();
            indicators();
        }
    }
}

autoSliding();

// Stop auto sliding when mouse is over
const container = document.querySelector('.slide-container');
container.addEventListener('mouseover', function () {
    clearInterval(interval);
});

// Resume sliding when mouse is out
container.addEventListener('mouseout', function () {
    autoSliding();
});

// Add and remove active class from the indicators
function indicators() {
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    dots[counter].className += ' active';
}

// Add event listener to the play/pause button
const playPauseBtn = document.querySelector('.slide-btn.play-pause-btn');
playPauseBtn.addEventListener('click', playPause);

function playPause() {
    let state = document.querySelector(".icon");
    if (state.innerHTML == "pause") {
        state.innerHTML = "play_arrow";
        pause = true;
    } else {
        state.innerHTML = "pause";
        pause = false;
    }
}