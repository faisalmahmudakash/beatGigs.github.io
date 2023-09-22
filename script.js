
//NAV-BAR ACTIVE EFFEC
const links = document.querySelectorAll(".navbar-ul ul li a");

// Check if there's a stored active link in local storage
const storedNavActiveLink = localStorage.getItem("activeLink");

// Add a click event listener to each link
links.forEach((link) => {
    link.addEventListener("click", (e) => {
        // Prevent the default link behavior
        e.preventDefault();

        // Remove the 'active' class from all links
        links.forEach((l) => l.classList.remove("navActive"));

        // Add the 'active' class to the clicked link
        link.classList.add("navActive");

        // Store the clicked link's href in local storage as the active link
        localStorage.setItem("activeLink", link.getAttribute("href"));

        // Perform the link's default action (e.g., navigate to the target URL)
        window.location.href = link.getAttribute("href");
    });

    // Check if this link is the stored active link and apply 'active' class if necessary
    if (storedNavActiveLink === link.getAttribute("href")) {
        link.classList.add("navActive");
    }
});


//Footer ACTIVE EFFECT
const Footerlinks = document.querySelectorAll(".footer-item p a");

// Check if there's a stored active link in local storage
const storedFooterNavActiveLink = localStorage.getItem("activeLink2");

// Add a click event listener to each link
Footerlinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        // Prevent the default link behavior
        e.preventDefault();

        // Remove the 'active' class from all links
        Footerlinks.forEach((l) => l.classList.remove("footerActive"));

        // Add the 'active' class to the clicked link
        link.classList.add("footerActive");

        // Store the clicked link's href in local storage as the active link
        localStorage.setItem("activeLink2", link.getAttribute("href"));

        // Perform the link's default action (e.g., navigate to the target URL)
        window.location.href = link.getAttribute("href");
    });

    // Check if this link is the stored active link and apply 'active' class if necessary
    if (storedFooterNavActiveLink === link.getAttribute("href")) {
        link.classList.add("footerActive");
    }
});





//light and dark mode
const bodyy = document.querySelector('body');

// Check if there's a stored state for the "activebg" class in local storage
const isBodyActive = localStorage.getItem("isBodyActive");

// Function to toggle the class and update the local storage state
function toggleActiveClass() {
    bodyy.classList.toggle("activebg");
    const isActive = bodyy.classList.contains("activebg");
    localStorage.setItem("isBodyActive", isActive ? "true" : "false");
}

// Add a click event listener to the toggle button
toggle.addEventListener("click", toggleActiveClass);

// Apply the "activebg" class based on the stored state
if (isBodyActive === "true") {
    bodyy.classList.add("activebg");
}



//nknavbar effect
const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 100) {
        body.classList.remove("scroll-up");
        return;
    }

    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up");
        body.classList.add("scroll-down");
    } else if (
        currentScroll < lastScroll &&
        body.classList.contains("scroll-down")
    ) {
        body.classList.remove("scroll-down");
        body.classList.add("scroll-up");
    }

    lastScroll = currentScroll;
});


//REMOVE NEVBAR POSITION FIXED STYLE FOR MOBILE DEVICE; 
const header = document.querySelector('.header');

// Function to check if the screen width is less than or equal to 767px
function isScreen767pxOrLess() {
    return window.innerWidth <= 767;
}

// Function to handle the header's position
function handleHeaderPosition() {
    if (isScreen767pxOrLess()) {
        header.style.position = 'relative'; // or set it to 'static' as needed
    } else {
        header.style.position = 'fixed';
    }
}

// Add an event listener for window resize
window.addEventListener('resize', handleHeaderPosition);

// Initial check when the page loads
handleHeaderPosition();

//nknavbar effect END


//shoping-bag button
const updated_counter = document.querySelector(".shopping-bag-notification");
updated_counter.setAttribute("current-count", 30);

//swipe slide
const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

//swipe slide END



// JavaScript to handle scrolling to top when the button is clicked
const scrollToTopButton = document.getElementById('scrollToTopBtn');

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide the button based on scroll position
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});