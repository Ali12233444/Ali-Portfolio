// ===================================
// SCROLL PROGRESS BAR
// ===================================
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// STICKY NAVBAR & ACTIVE SECTION HIGHLIGHTING
// ===================================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Highlight active section
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Initial check on page load
revealOnScroll();

// ===================================
// ANIMATED SKILL BARS
// ===================================
let skillsAnimated = false;

function animateSkills() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (!skillsSection) return;

    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 200 && !skillsAnimated) {
        skillsAnimated = true;
        
        skillBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, index * 150);
        });
    }
}

window.addEventListener('scroll', animateSkills);
// Initial check
animateSkills();

// ===================================
// ANIMATED COUNTERS (Stats Section)
// ===================================
let countersAnimated = false;

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;

    const firstCounter = counters[0];
    const counterTop = firstCounter.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (counterTop < windowHeight - 200 && !countersAnimated) {
        countersAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);
// Initial check
animateCounters();

// ===================================
// HIRE ME MODAL
// ===================================
const hireMeBtn = document.getElementById('hireMeBtn');
const modal = document.getElementById('hireModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

// Open modal
hireMeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty href or hire me button
        if (href === '#' || this.id === 'hireMeBtn') {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// LOADING ANIMATION (Optional)
// ===================================
window.addEventListener('load', () => {
    // Add a slight delay for smooth entrance
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ===================================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedReveal = debounce(revealOnScroll);
const debouncedSkills = debounce(animateSkills);
const debouncedCounters = debounce(animateCounters);

window.addEventListener('scroll', debouncedReveal);
window.addEventListener('scroll', debouncedSkills);
window.addEventListener('scroll', debouncedCounters);

// ===================================
// ADDITIONAL INTERACTIVE FEATURES
// ===================================

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        heroSection.style.transform = `translateY(${parallax}px)`;
    }
});

// Smooth fade-in on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add active state to service cards on hover
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons (Optional enhancement)
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');

    const existingRipple = button.getElementsByClassName('ripple')[0];
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(ripple);
}

const buttons = document.querySelectorAll('.btn, .btn-hire');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    button, .btn, .btn-hire {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// ---------------------------------------------------*******************
// ===================================
// PROJECTS CAROUSEL SLIDER
// ===================================
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselDots = document.getElementById('carouselDots');

let currentSlide = 0;
const totalSlides = document.querySelectorAll('.project-card').length;
let autoSlideInterval;

// Create dots
function createCarouselDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    }
}

// Update carousel position
function updateCarousel() {
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoSlide();
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Auto slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Event listeners for carousel
carouselPrev.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

carouselNext.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        nextSlide();
        resetAutoSlide();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        prevSlide();
        resetAutoSlide();
    }
}

// Initialize carousel
createCarouselDots();
startAutoSlide();

// Pause auto-slide when hovering over carousel
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// ===================================
// STATS COUNTERS ANIMATION
// ===================================
let statsAnimated = false;

function animateStatsCounters() {
    const counters = document.querySelectorAll('.stats-section .counter');
    
    if (counters.length === 0) return;

    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 200 && !statsAnimated) {
        statsAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    // Add "+" for certain counters
                    if (target < 100) {
                        counter.textContent = target + '+';
                    } else {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateStatsCounters);
animateStatsCounters(); // Initial check

// ===================================
// CONTACT FORM VALIDATION
// ===================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    return emailRegex.test(email.trim());
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error message
function showError(fieldId, message) {
    const formGroup = document.getElementById(fieldId).parentElement;
    const errorElement = document.getElementById(fieldId + 'Error');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
}

// Clear error message
function clearError(fieldId) {
    const formGroup = document.getElementById(fieldId).parentElement;
    const errorElement = document.getElementById(fieldId + 'Error');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time validation
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError('name', 'Name must be at least 2 characters');
    } else {
        clearError('name');
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError('email', 'Please enter a valid email address');
    } else {
        clearError('email');
    }
});

subjectInput.addEventListener('blur', () => {
    if (!validateSubject(subjectInput.value)) {
        showError('subject', 'Subject must be at least 3 characters');
    } else {
        clearError('subject');
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError('message', 'Message must be at least 10 characters');
    } else {
        clearError('message');
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear all previous errors
    clearError('name');
    clearError('email');
    clearError('subject');
    clearError('message');

    // Get form values
    const name = nameInput.value;
    const email = emailInput.value;
    const subject = subjectInput.value;
    const message = messageInput.value;

    // Validation
    let isValid = true;

    if (!validateName(name)) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    if (!validateSubject(subject)) {
        showError('subject', 'Subject must be at least 3 characters');
        isValid = false;
    }

    if (!validateMessage(message)) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    // If form is valid
    if (isValid) {
        // Hide form temporarily
        contactForm.style.opacity = '0';
        
        setTimeout(() => {
            // Show success message
            formSuccess.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message and show form after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
                contactForm.style.opacity = '1';
            }, 5000);
        }, 300);

        // Here you would normally send the form data to a server
        // For now, we'll just log it
        console.log('Form submitted:', { name, email, subject, message });
    }
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTopButton() {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', toggleScrollTopButton);

// ===================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or modal trigger
        if (href === '#' || href.length === 1) {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with reveal class
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ===================================
// PROJECT CARD HOVER EFFECTS
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Pause auto-slide when hovering over a card
        clearInterval(autoSlideInterval);
    });

    card.addEventListener('mouseleave', function() {
        // Resume auto-slide
        startAutoSlide();
    });
});

// ===================================
// TESTIMONIAL CARDS STAGGER ANIMATION
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// ===================================
// LAZY LOADING FOR PERFORMANCE
// ===================================
if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add any lazy loading logic here
                // For example, loading background images
                if (element.dataset.bg) {
                    element.style.backgroundImage = `url(${element.dataset.bg})`;
                }
                
                lazyObserver.unobserve(element);
            }
        });
    });

    // Observe elements that need lazy loading
    document.querySelectorAll('[data-bg]').forEach(el => {
        lazyObserver.observe(el);
    });
}

// ===================================
// FORM INPUT ANIMATIONS
// ===================================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    // Add focus animation
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });

    // Check if input has value on page load
    if (input.value !== '') {
        input.parentElement.classList.add('focused');
    }
});

// ===================================
// PERFORMANCE: DEBOUNCE FUNCTION
// ===================================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedStatsCounters = debounce(animateStatsCounters);
const debouncedScrollTop = debounce(toggleScrollTopButton);

window.addEventListener('scroll', debouncedStatsCounters);
window.addEventListener('scroll', debouncedScrollTop);

// ===================================
// COPY EMAIL ON CLICK (BONUS FEATURE)
// ===================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const email = this.href.replace('mailto:', '');
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Show a subtle notification
                const notification = document.createElement('div');
                notification.textContent = 'Email copied to clipboard!';
                notification.style.cssText = `
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: linear-gradient(135deg, #3b82f6, #ec4899);
                    color: white;
                    padding: 15px 30px;
                    border-radius: 50px;
                    z-index: 10000;
                    font-weight: 600;
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
                    animation: slideUp 0.5s ease;
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideDown 0.5s ease';
                    setTimeout(() => notification.remove(), 500);
                }, 2000);
            });
        }
    });
});

// Add animation keyframes for notification
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===================================
// whatsapp widget 
// ===================================

// ===================================
// WHATSAPP WIDGET INTEGRATION
// ===================================
function initializeWhatsAppWidget() {
    // Check if widget already exists
    if (document.getElementById('widgetsContainer')) {
        return;
    }

    // Create and inject CSS
    const head = document.getElementsByTagName('HEAD')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://social-widgets.netlify.app/css/widget.css';
    head.appendChild(link);

    // Create main widget container
    const mainDiv = document.createElement("div");
    mainDiv.id = "widgetsContainer";
    mainDiv.innerHTML = `
        <ul id="iconsList" style="display: none">
            <li>
                <a class="widget-circle widget-whatsapp" target="_blank" 
                   href="https://wa.me/923131159582?text=Hello%20I%20saw%20your%20site%20and%20want%20to%20know%20more">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" 
                         class="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                </a>
            </li>
        </ul>
        <button id="whatsappToggle" class="whatsapp-toggle-btn">
            <i class="fab fa-whatsapp"></i>
        </button>
    `;
    
    // Custom styling for better integration
    mainDiv.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        position: fixed;
        right: 25px;
        bottom: 30px;
        width: auto;
        z-index: 9998;
        gap: 10px;
    `;

    document.body.appendChild(mainDiv);

    // Add custom styles for better appearance
    const customStyles = `
        .whatsapp-toggle-btn {
            background: linear-gradient(135deg, #25D366, #128C7E);
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            font-size: 24px;
            z-index: 9999;
        }
        
        .whatsapp-toggle-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
        }
        
        #iconsList {
            list-style: none;
            padding: 0;
            margin: 0;
            display: none;
            animation: slideUp 0.3s ease;
        }
        
        #iconsList li {
            margin-bottom: 10px;
        }
        
        .widget-circle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #25D366, #128C7E);
            color: white;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
        }
        
        .widget-circle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);

    // Toggle functionality
    const toggleBtn = document.getElementById('whatsappToggle');
    const iconsList = document.getElementById('iconsList');

    toggleBtn.addEventListener('click', function() {
        const isVisible = iconsList.style.display === 'block';
        
        if (isVisible) {
            iconsList.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                iconsList.style.display = 'none';
            }, 250);
        } else {
            iconsList.style.display = 'block';
            iconsList.style.animation = 'slideUp 0.3s ease';
        }
    });

    // Close when clicking outside
    document.addEventListener('click', function(event) {
        if (!mainDiv.contains(event.target) && iconsList.style.display === 'block') {
            iconsList.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                iconsList.style.display = 'none';
            }, 250);
        }
    });
}

// Initialize WhatsApp widget when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeWhatsAppWidget();
});

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log(
    '%c🚀 New Sections Loaded Successfully!',
    'color: #3b82f6; font-size: 16px; font-weight: bold; background: #0f172a; padding: 10px; border-radius: 5px;'
);

console.log(
    '%c✨ Projects Carousel | Case Study | Testimonials | Stats | Contact Form | Footer',
    'color: #ec4899; font-size: 12px;'
);

// ===================================
// INITIALIZE EVERYTHING
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial checks
    animateStatsCounters();
    toggleScrollTopButton();
    
    console.log('✅ All sections initialized successfully!');
    
    // Add smooth entrance animation
    document.body.style.opacity = '1';
});

// ===================================
// HANDLE PAGE VISIBILITY
// ===================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        clearInterval(autoSlideInterval);
    } else {
        // Resume animations when tab becomes visible
        startAutoSlide();
    }
});

// ===================================
// PREVENT CONSOLE ERRORS
// ===================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
    // Prevent the error from breaking the page
    e.preventDefault();
});

// ===================================
// PRINT PERFORMANCE METRICS (DEV)
// ===================================
if (window.performance && performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
        }, 0);
    });
}
// ===================================
// CONSOLE MESSAGE (Fun Easter Egg)
// ===================================
console.log(
    '%c👋 Hello, Developer! ',
    'color: #3b82f6; font-size: 20px; font-weight: bold; background: #0f172a; padding: 10px;'
);
console.log(
    '%cLooking for a talented developer? Let\'s connect!',
    'color: #ec4899; font-size: 14px;'
);
console.log(
    '%c📧 malishafique2002@gmail.com',
    'color: #3b82f6; font-size: 12px;'
);

// ===================================
// INITIALIZE EVERYTHING ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    revealOnScroll();
    animateSkills();
    animateCounters();
    highlightNavigation();
    updateScrollProgress();

    // Log that everything is loaded
    console.log('✅ Portfolio loaded successfully!');
});


