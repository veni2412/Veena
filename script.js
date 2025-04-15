document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
            btn.addEventListener('click', () => {
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

    // Add fade-in animation to elements as they appear in viewport
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should fade in
    const elementsToAnimate = document.querySelectorAll(
        '.skill-card, .about-content, .about-image, .project-card, ' +
        '.certification-card, .contact-method, .social-link'
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

  // Utility function to get a readable description of the element
  function getElementType(el) {
    if (el.tagName === "IMG") return "image";
    if (el.tagName === "P" || el.tagName === "SPAN") return "text";
    if (el.tagName === "BUTTON") return "button";
    if (el.tagName === "A" && el.href.endsWith(".pdf")) return "CV (PDF link)";
    if (el.tagName === "A") return "hyperlink";
    if (el.tagName === "SELECT") return "drop-down";
    if (el.tagName === "INPUT") return "input field";
    return el.tagName.toLowerCase();
  }

  // Capture click events
  document.addEventListener("click", function (e) {
    const timestamp = new Date().toLocaleString();
    const elementType = getElementType(e.target);
    console.log(`${timestamp}, click, ${elementType}`);
  });

  // Capture initial page views
  window.addEventListener("DOMContentLoaded", function () {
    const timestamp = new Date().toLocaleString();
    console.log(`${timestamp}, view, entire page loaded`);

    // Optionally log each key section that was loaded
    document.querySelectorAll("section, img, p, a, button, select, input").forEach((el) => {
      const elementType = getElementType(el);
      const timeNow = new Date().toLocaleString();
      console.log(`${timeNow}, view, ${elementType}`);
    });
  });

  function analyzeText() {
    const text = document.getElementById("textInput").value;

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = ""; // Clear old output

    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.trim().match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    // Helper for counting words from a set
    function countWordsFromList(tokens, list) {
      const counts = {};
      list.forEach((item) => counts[item] = 0);
      tokens.forEach((word) => {
        const lower = word.toLowerCase();
        if (counts.hasOwnProperty(lower)) {
          counts[lower]++;
        }
      });
      return counts;
    }

    const tokens = text.split(/\s+/);

    // Common pronouns, prepositions, and indefinite articles
    const pronouns = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "its", "our", "their", "mine", "yours", "hers", "ours", "theirs"];
    const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "of", "off", "for", "under", "over"];
    const articles = ["a", "an"];

    const pronounCounts = countWordsFromList(tokens, pronouns);
    const prepositionCounts = countWordsFromList(tokens, prepositions);
    const articleCounts = countWordsFromList(tokens, articles);

    // Create output HTML
    outputDiv.innerHTML += `<h3>Basic Stats:</h3>
      <p>Letters: ${letters}</p>
      <p>Words: ${words}</p>
      <p>Spaces: ${spaces}</p>
      <p>Newlines: ${newlines}</p>
      <p>Special Symbols: ${specialSymbols}</p>`;

    outputDiv.innerHTML += `<h3>Pronoun Counts:</h3><pre>${JSON.stringify(pronounCounts, null, 2)}</pre>`;
    outputDiv.innerHTML += `<h3>Preposition Counts:</h3><pre>${JSON.stringify(prepositionCounts, null, 2)}</pre>`;
    outputDiv.innerHTML += `<h3>Indefinite Article Counts:</h3><pre>${JSON.stringify(articleCounts, null, 2)}</pre>`;
  }