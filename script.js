/**
 * Main initialization function that runs when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTabSwitching();
    initSmoothScrolling();
    initAnimations();
    initParallaxEffect();
    setupGreetingAnimation();
    initCarousel();
});

/**
 * Utility function to log events with detailed information
 */
function logEvent(event, type) {
    const timestamp = new Date().toISOString();
    const eventType = type || event.type;
    const targetType = event.target.tagName.toLowerCase();
    const targetClass = event.target.className || 'no-class';
    
    console.log({
        timestamp,
        eventType,
        targetType,
        targetClass,
        eventDetails: {
            id: event.target.id || 'no-id',
            text: event.target.textContent?.trim() || 'no-text'
        }
    });
}

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', (e) => {
        logEvent(e, 'click');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

/**
 * Initialize tab switching functionality for the about section
 */
function initTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            logEvent(e, 'click');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            logEvent(e, 'click');
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open on small screens
                if (window.innerWidth <= 768) {
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks) {
                        navLinks.style.display = 'none';
                    }
                }
            }
        });
    });
}

/**
 * Initialize animations with Intersection Observer
 */
function initAnimations() {
    const observerOptions = { threshold: 0.1 };
    
    // Observer for fade-in animations
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logEvent({ target: entry.target }, 'view');
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const elementsToAnimate = document.querySelectorAll(
        '.skill-item, .achievement-item, .timeline-item, .about-text, .profile-photo'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        fadeInObserver.observe(el);
    });
    
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
}

/**
 * Initialize parallax effect for hero section
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
}

/**
 * Setup rotating greeting animations
 */
const greetings = [
    { text: "Veena", language: "English" },
    { text: "വീണ", language: "Malayalam" },
    { text: "वीना", language: "Hindi" },
    { text: "فينا", language: "Arabic" }
];

let currentGreetingIndex = 0;
let greetingElement;

function setupGreetingAnimation() {
    greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;
    
    updateGreeting();
    setInterval(updateGreeting, 5000);
}

function updateGreeting() {
    if (!greetingElement) return;
    
    const greeting = greetings[currentGreetingIndex];
    greetingElement.style.opacity = "0";
    greetingElement.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        greetingElement.textContent = greeting.text;
        greetingElement.style.opacity = "1";
        greetingElement.style.transform = "translateY(0)";
    }, 500);
    
    currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
}

/**
 * Initialize image carousel
 */
function initCarousel() {
    const images = [
        'images/Veena-2.jpeg',  // Profile photo
        'images/im1.png',       // Dubai Miracle Garden
        'images/im2.png',       // Kerala Traditional Building
        'images/im3.png',       // Kerala Landscape
        'images/im4.png',       // Burj Al Arab
        'images/im5.png',       // Dubai Museum
        'images/im6.png'        // Burj Khalifa
    ];
    
    const carouselContainer = document.querySelector('.about-image');
    if (!carouselContainer) return;
    
    // Clear existing content
    carouselContainer.innerHTML = '';
    
    // Create image elements
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('carousel-image');
        img.alt = `Image ${index + 1}`;
        if (index === 0) img.classList.add('active');
        carouselContainer.appendChild(img);
    });
    
    const carouselImages = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;
    
    function showNextImage() {
        // Fade out current image
        carouselImages[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % carouselImages.length;
        
        // Fade in new image
        carouselImages[currentIndex].classList.add('active');
    }
    
    // Start the carousel
    setInterval(showNextImage, 5000); // Change image every 5 seconds
}