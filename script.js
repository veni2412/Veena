document.addEventListener('DOMContentLoaded', () => {
    // Function to log event details
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

    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', (e) => {
        logEvent(e, 'click');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            logEvent(e, 'click');
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            logEvent(e, 'click');
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Project filters functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                logEvent(e, 'click');
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            logEvent(e, 'submit');
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add view event logging for elements in viewport
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logEvent({ target: entry.target }, 'view');
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should fade in
    const elementsToAnimate = document.querySelectorAll(
        '.skill-item, .achievement-item, .timeline-item, .about-text, .profile-photo'
    );

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
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

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // Carousel functionality
    initCarousel();
});

// Greeting animations
const greetings = [
    { text: "Veena", language: "English" },
    { text: "വീണ", language: "Malayalam" },
    { text: "वीना", language: "Veena" },
    { text: "فينا", language: "Arabic" }
];

let currentGreetingIndex = 0;
const greetingElement = document.getElementById('greeting');

function updateGreeting() {
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

// Initial greeting
updateGreeting();

// Change greeting every 5 seconds
setInterval(updateGreeting, 5000);

// Carousel functionality
function initCarousel() {
    const images = [
        'images/Veena-2.jpeg',  // Your profile photo
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