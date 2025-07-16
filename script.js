// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.workshop-card, .service-card, .gallery-item, .timeline-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Hero video rotation
let currentVideoIndex = 0;
const videoSources = [
    'videos/Banner1Video.MP4',
    'videos/Banner2Video.MP4',
    'videos/Banner3Video.MP4',
    'videos/Banner4Video.MP4',
    'videos/Banner5Video.MP4'
];

function rotateHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        heroVideo.src = videoSources[currentVideoIndex];
        heroVideo.load();
        heroVideo.play();
    }
}

// Rotate video every 30 seconds
setInterval(rotateHeroVideo, 30000);

// Workshop booking form handling
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message
        showNotification('Thank you! We will contact you soon to confirm your workshop booking.', 'success');
        
        // Reset form
        this.reset();
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
`;
document.head.appendChild(notificationStyle);

// Workshop card hover effects
document.querySelectorAll('.workshop-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Gallery image click to enlarge
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        createLightbox(this.src, this.alt);
    });
});

function createLightbox(src, alt) {
    // Remove existing lightbox
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.style.cssText = `
        width: 100%;
        height: auto;
        border-radius: 10px;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
        padding: 0;
    `;
    
    // Add to page
    document.body.appendChild(lightbox);
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        lightbox.remove();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            lightbox.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Add CSS for lightbox animation
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(lightboxStyle);

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is in view
const heroSection = document.querySelector('.hero');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (heroSection) {
    heroObserver.observe(heroSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Workshop booking urgency timer
function createUrgencyTimer() {
    const workshopCards = document.querySelectorAll('.workshop-card');
    
    workshopCards.forEach(card => {
        const priceElement = card.querySelector('.price');
        if (priceElement && priceElement.textContent.includes('₹2,500')) {
            // Add urgency timer to featured workshop
            const urgencyTimer = document.createElement('div');
            urgencyTimer.className = 'urgency-timer';
            urgencyTimer.innerHTML = `
                <div class="timer-content">
                    <span class="timer-label">Limited Time Offer!</span>
                    <div class="timer-display">
                        <span class="timer-hours">24</span>:<span class="timer-minutes">00</span>:<span class="timer-seconds">00</span>
                    </div>
                </div>
            `;
            
            // Add styles
            urgencyTimer.style.cssText = `
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
                color: white;
                padding: 10px 15px;
                border-radius: 10px;
                margin-bottom: 15px;
                text-align: center;
                font-weight: 600;
            `;
            
            const timerContent = urgencyTimer.querySelector('.timer-content');
            timerContent.style.cssText = `
                display: flex;
                flex-direction: column;
                gap: 5px;
            `;
            
            const timerDisplay = urgencyTimer.querySelector('.timer-display');
            timerDisplay.style.cssText = `
                font-size: 1.2rem;
                font-weight: 700;
            `;
            
            // Insert before the price
            priceElement.parentNode.insertBefore(urgencyTimer, priceElement);
            
            // Start countdown
            startCountdown(urgencyTimer);
        }
    });
}

function startCountdown(timerElement) {
    let hours = 24;
    let minutes = 0;
    let seconds = 0;
    
    const hoursEl = timerElement.querySelector('.timer-hours');
    const minutesEl = timerElement.querySelector('.timer-minutes');
    const secondsEl = timerElement.querySelector('.timer-seconds');
    
    const countdown = setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        } else {
            clearInterval(countdown);
            timerElement.innerHTML = '<div class="timer-content"><span class="timer-label">Offer Expired!</span></div>';
            timerElement.style.background = '#666';
            return;
        }
        
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Initialize urgency timer
document.addEventListener('DOMContentLoaded', createUrgencyTimer);

// Smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.pageYOffset;
        
        if (scrollY + windowHeight > sectionTop + 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Add initial styles for sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
    });
});

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on load
revealOnScroll(); 

// Bento Videos Section
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
document.addEventListener('DOMContentLoaded', () => {
    const bentoGrid = document.getElementById('bentoVideosGrid');
    if (bentoGrid) {
        const videoFiles = [
            'videos/Banner1Video.MP4',
            'videos/Banner2Video.MP4',
            'videos/Banner3Video.MP4',
            'videos/Banner4Video.MP4',
            'videos/Banner5Video.MP4',
            'videos/Banner6Video.MP4',
            'videos/Banner7Video.MP4',
            'videos/Banner8Video.MP4',
            'videos/Banner9Video.MOV',
            'videos/Banner10Video.MP4',
            'videos/Banner11Video.MP4',
            'videos/Banner12Video.MP4',
            'videos/Banner13Video.MP4'
        ];
        // Shuffle and duplicate for infinite effect
        let allVideos = videoFiles.concat(videoFiles);
        allVideos.forEach((src, i) => {
            const div = document.createElement('div');
            div.className = 'bento-video';
            // Randomly assign bento size classes for 2-row bento effect
            if (i % 7 === 0) div.classList.add('large');
            else if (i % 5 === 0) div.classList.add('tall');
            else if (i % 4 === 0) div.classList.add('wide');
            const vid = document.createElement('video');
            vid.src = src;
            vid.autoplay = true;
            vid.muted = true;
            vid.loop = true;
            vid.playsInline = true;
            vid.setAttribute('tabindex', '0');
            // Hover play/pause
            div.addEventListener('mouseenter', () => vid.play());
            div.addEventListener('mouseleave', () => vid.pause());
            div.appendChild(vid);
            bentoGrid.appendChild(div);
        });
    }
});

// Promo Timer for Hero Side Promo
function startPromoTimer(durationSeconds) {
    const timerEl = document.getElementById('promoTimer');
    if (!timerEl) return;
    let remaining = durationSeconds;
    function updateTimer() {
        if (remaining <= 0) {
            timerEl.textContent = 'Offer Expired!';
            timerEl.style.color = '#ff6b6b';
            return;
        }
        const hrs = Math.floor(remaining / 3600);
        const mins = Math.floor((remaining % 3600) / 60);
        const secs = remaining % 60;
        timerEl.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        remaining--;
        setTimeout(updateTimer, 1000);
    }
    updateTimer();
}
document.addEventListener('DOMContentLoaded', () => {
    startPromoTimer(3 * 60 * 60); // 3 hours in seconds
}); 

// Testimonials Carousel
const testimonials = [
    {
        avatar: 'photos/usmankhanMain1.JPG',
        name: 'Priya Sharma',
        location: 'Bangalore',
        quote: 'Usman’s workshop completely transformed my approach to fitness. His energy is infectious and the choreography was amazing!'
    },
    {
        avatar: 'photos/usmankhanMain2.JPG',
        name: 'Rahul Patel',
        location: 'Chennai',
        quote: 'The choreography workshop was incredible. I learned so much and the wedding performance was a huge success!'
    },
    {
        avatar: 'photos/usmankhanMain3.JPG',
        name: 'Anjali Desai',
        location: 'Hyderabad',
        quote: 'Best fitness experience ever! Usman’s fusion of dance and fitness is unique and highly effective.'
    }
];
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('testimonialsCarousel');
    if (carousel) {
        testimonials.forEach(t => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <img class="testimonial-avatar" src="${t.avatar}" alt="${t.name}">
                <div class="testimonial-quote">“${t.quote}”</div>
                <div class="testimonial-name">${t.name}</div>
                <div class="testimonial-location">${t.location}</div>
            `;
            carousel.appendChild(card);
        });
    }
});
// Achievements Animated Counters
function animateAchievements() {
    document.querySelectorAll('.achievement-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 100));
        function updateCounter() {
            if (current < target) {
                current += increment;
                counter.textContent = Math.min(current, target);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        updateCounter();
    });
}
const achievementsSection = document.querySelector('.achievements-section');
if (achievementsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAchievements();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(achievementsSection);
}
// FAQ Accordion
const faqs = [
    {
        q: 'Do I need any prior dance experience to join your workshops?',
        a: 'No prior experience is needed! My workshops are designed for all levels, from beginners to advanced.'
    },
    {
        q: 'What should I bring to the workshop?',
        a: 'Just bring comfortable clothes, a water bottle, and lots of energy! I’ll take care of the rest.'
    },
    {
        q: 'How do I book a private session?',
        a: 'Simply use the contact form or WhatsApp link on this site, and I’ll get in touch to schedule your session.'
    },
    {
        q: 'Are your workshops suitable for kids?',
        a: 'Absolutely! I offer special sessions for kids and families. Just mention your interest in the booking form.'
    }
];
document.addEventListener('DOMContentLoaded', () => {
    const faqAccordion = document.getElementById('faqAccordion');
    if (faqAccordion) {
        faqs.forEach((faq, i) => {
            const item = document.createElement('div');
            item.className = 'faq-item';
            item.innerHTML = `
                <button class="faq-question">${faq.q}</button>
                <div class="faq-answer">${faq.a}</div>
            `;
            faqAccordion.appendChild(item);
        });
        // Accordion logic
        faqAccordion.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.parentElement;
                item.classList.toggle('open');
            });
        });
    }
}); 

// Reviews Wall Section
const reviews = [
    {
        avatar: 'photos/client-1male.jpeg',
        name: 'Aarav S.',
        quote: 'Usman’s workshops are a game changer! I never thought I could dance with so much confidence. The way he breaks down every move makes it easy for anyone to follow. I look forward to every session!'
    },
    {
        avatar: 'photos/client-1male.jpeg',
        name: 'Rahul P.',
        quote: 'I lost 10kg and gained a new love for fitness. Usman’s classes are always challenging, but he motivates you to push your limits. The group is so supportive and the results speak for themselves.'
    },
    {
        avatar: 'photos/client-5male.jpeg',
        name: 'Priya M.',
        quote: 'The energy and passion Usman brings is unmatched. Every session is pure joy! I’ve made new friends and discovered a love for dance I never knew I had. Highly recommended for anyone looking to have fun and get fit.'
    },
    {
        avatar: 'photos/client-2female.jpeg',
        name: 'Sneha D.',
        quote: 'From shy to stage-ready—Usman’s coaching is the best investment I made in myself. He creates a safe space for everyone to express themselves. I performed at my first event thanks to his encouragement!'
    },
    {
        avatar: 'photos/client-2female.jpeg',
        name: 'Anjali R.',
        quote: 'Workshops are always fun, challenging, and super effective. Love the vibe! Usman’s attention to detail and personal feedback helped me improve so much. I can’t wait for the next one!'
    }
];
document.addEventListener('DOMContentLoaded', () => {
    const wallGrid = document.getElementById('reviewsWallGrid');
    if (wallGrid) {
        // Duplicate reviews for infinite scroll effect
        const allReviews = reviews.concat(reviews);
        allReviews.forEach(r => {
            const card = document.createElement('div');
            card.className = 'review-card';
            let meta = '';
            if (r.name === 'Vikram K.' || r.name === 'Priya M.') {
                meta = `<span class="review-meta"><span class="meta-verified"><i class='fas fa-badge-check'></i></span></span>`;
            }
            card.innerHTML = `
                <img class="review-avatar" src="${r.avatar}" alt="${r.name}">
                <div class="review-name-row"><span class="review-name">${r.name}</span>${meta}</div>
                <div class="review-quote">${r.quote}</div>
            `;
            wallGrid.appendChild(card);
        });
    }
}); 

// Workshops Data Loading and Rendering
async function loadWorkshopsData() {
  try {
    const response = await fetch('data/workshops.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading workshops data:', error);
    // Fallback to hardcoded data if JSON fails to load
    return {
      workshops: [
        {
          id: "bangalore-zumba",
          title: "Zumba & Dance Workshop",
          location: "Bangalore",
          date: "2025-12-17",
          time: "17:00",
          description: "High-energy session combining Zumba fitness with dance choreography. Perfect for all skill levels.",
          image: "photos/banglore17thdec.PNG",
          features: ["Group Session", "2 Hours", "All Levels"],
          price: 2500,
          originalPrice: 3500,
          featured: true,
          badge: "Most Popular",
          available: true
        },
        {
          id: "chennai-choreography",
          title: "Dance Choreography Intensive",
          location: "Chennai",
          date: "2025-07-21",
          time: "16:00",
          description: "Advanced choreography techniques for wedding performances and corporate events.",
          image: "photos/chennai21stjuly.PNG",
          features: ["Private Available", "3 Hours", "Intermediate+"],
          price: 3000,
          originalPrice: null,
          featured: false,
          badge: null,
          available: true
        },
        {
          id: "hyderabad-fitness",
          title: "Fitness & Dance Fusion",
          location: "Hyderabad",
          date: "2025-07-27",
          time: "18:00",
          description: "Unique blend of cardio fitness and dance moves for maximum results.",
          image: "photos/hyd27thjuly.PNG",
          features: ["Group Session", "2.5 Hours", "All Levels"],
          price: 2800,
          originalPrice: null,
          featured: false,
          badge: null,
          available: true
        },
        {
          id: "kolkata-zumba",
          title: "Zumba & Dance Workshop",
          location: "Kolkata",
          date: "2025-06-02",
          time: "15:00",
          description: "Energetic Zumba session with Bollywood dance elements for all fitness levels.",
          image: "photos/kolkata2ndjune.JPG",
          features: ["Group Session", "2 Hours", "All Levels"],
          price: 2200,
          originalPrice: null,
          featured: false,
          badge: null,
          available: true
        },
        {
          id: "hyderabad-regular",
          title: "Regular Dance & Fitness Classes",
          location: "Hyderabad (Vibe Studio)",
          date: null,
          time: null,
          recurring: "Mon, Wed, Fri",
          description: "Weekly classes for consistent fitness and dance training.",
          image: "photos/monwedfriVibestudio.PNG",
          features: ["Weekly Classes", "1 Hour", "All Levels"],
          price: 1500,
          originalPrice: null,
          featured: false,
          badge: "Regular Classes",
          available: true
        }
      ],
      upcomingWorkshops: [
        {
          id: "mumbai-premium",
          title: "Premium Dance Workshop",
          location: "Mumbai",
          date: "2025-01-15",
          time: "14:00",
          description: "Exclusive premium workshop with advanced choreography and performance training.",
          image: "photos/usmankhanMain2.JPG",
          features: ["Limited Seats", "4 Hours", "Advanced Level"],
          price: 5000,
          originalPrice: 6000,
          featured: true,
          badge: "Coming Soon",
          available: false
        }
      ]
    };
  }
}

// Helper to parse date/time from JSON (expects ISO format: date: 'YYYY-MM-DD', time: 'HH:mm')
function parseWorkshopDate(ws) {
  if (!ws.date) return null;
  let dateStr = ws.date;
  if (ws.time) dateStr += 'T' + ws.time;
  let d = new Date(dateStr);
  if (isNaN(d)) {
    // Fallback: try just the date
    d = new Date(ws.date);
  }
  return isNaN(d) ? null : d;
}

// Format date for display
function formatWorkshopDate(date, time) {
  if (!date) return '';
  const d = new Date(date);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = d.toLocaleDateString('en-US', options);
  return time ? `${formattedDate}, ${time}` : formattedDate;
}

// Start countdown timer for a workshop
function startWorkshopTimer(timerElement, targetDate) {
  function updateTimer() {
    const now = new Date();
    let diff = targetDate - now;
    
    if (diff <= 0) {
      timerElement.textContent = 'Starting Now!';
      timerElement.style.color = '#ff6b6b';
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    
    // Update every second
    setTimeout(updateTimer, 1000);
  }
  
  updateTimer();
}

// Render workshops as horizontal list view
async function renderWorkshopsList() {
  const workshopsData = await loadWorkshopsData();
  const allWorkshops = (workshopsData.workshops || []).concat(workshopsData.upcomingWorkshops || []);
  const now = new Date();

  // Sort with same logic as before
  const sortedWorkshops = allWorkshops.sort((a, b) => {
    const dateA = parseWorkshopDate(a);
    const dateB = parseWorkshopDate(b);
    const isARecurring = !a.date && a.recurring;
    const isBRecurring = !b.date && b.recurring;
    if (isARecurring && isBRecurring) return 0;
    if (isARecurring && !isBRecurring) return -1;
    if (!isARecurring && isBRecurring) return 1;
    if (dateA && dateB) {
      const isAUpcoming = dateA > now;
      const isBUpcoming = dateB > now;
      if (isAUpcoming && isBUpcoming) return dateB - dateA;
      if (!isAUpcoming && !isBUpcoming) return dateA - dateB;
      if (isAUpcoming && !isBUpcoming) return -1;
      if (!isAUpcoming && isBUpcoming) return 1;
    }
    if (dateA && !dateB) return -1;
    if (!dateA && dateB) return 1;
    return 0;
  });

  const list = document.getElementById('workshopsList');
  if (!list) return;
  list.innerHTML = '';

  // Separate workshops into active and completed
  const activeWorkshops = [];
  const completedWorkshops = [];
  
  sortedWorkshops.forEach((ws) => {
    const wsDate = parseWorkshopDate(ws);
    const isUpcoming = wsDate && wsDate > new Date();
    const isRecurring = !ws.date && ws.recurring;
    const isCompleted = wsDate && wsDate < new Date();
    
    if (isUpcoming || isRecurring) {
      activeWorkshops.push(ws);
    } else if (isCompleted) {
      completedWorkshops.push(ws);
    }
  });

  // Add active workshops heading and workshops
  if (activeWorkshops.length > 0) {
    const activeHeading = document.createElement('div');
    activeHeading.className = 'workshops-section-heading';
    activeHeading.innerHTML = `
      <h3 class="workshops-section-title">
        <i class="fas fa-calendar-check"></i> Active Workshops & Classes
      </h3>
      <p class="workshops-section-subtitle">Book your spot now and transform your life!</p>
    `;
    list.appendChild(activeHeading);
    
    activeWorkshops.forEach((ws, idx) => {
      createWorkshopRow(ws, idx, list);
    });
  }

  // Add completed workshops heading and workshops
  if (completedWorkshops.length > 0) {
    const completedHeading = document.createElement('div');
    completedHeading.className = 'workshops-section-heading completed-section';
    completedHeading.innerHTML = `
      <h3 class="workshops-section-title">
        <i class="fas fa-history"></i> Completed Workshops
      </h3>
      <p class="workshops-section-subtitle">Past workshops and their success stories</p>
    `;
    list.appendChild(completedHeading);
    
    completedWorkshops.forEach((ws, idx) => {
      createWorkshopRow(ws, activeWorkshops.length + idx, list);
    });
  }

  // Store data for modal
  window.currentWorkshopsData = [...activeWorkshops, ...completedWorkshops];

  // Modal logic
  const modal = document.getElementById('workshopModal');
  const modalContent = document.getElementById('workshopModalContent');
  list.querySelectorAll('.workshop-row-view').forEach(btn => {
    btn.addEventListener('click', function() {
      const ws = window.currentWorkshopsData[parseInt(this.getAttribute('data-idx'))];
      modalContent.innerHTML = `
        <button class="workshop-modal-close">&times;</button>
        <img src="${ws.image}" alt="${ws.title} Poster">
        <h3>${ws.title}</h3>
        <div style="color:#667eea;font-weight:600;margin-bottom:8px;">${ws.location}</div>
        <div style="margin-bottom:8px;">${ws.date ? formatWorkshopDate(ws.date, ws.time) : ws.recurring || ''}</div>
        <div style="margin-bottom:10px;">${ws.description || ''}</div>
        <div style="margin-bottom:10px;">${(ws.features || []).map(f => `<span class='workshop-row-feature'>${f}</span>`).join(' ')}</div>
        <div style="font-size:1.1rem;font-weight:700;color:#28a745;">₹${ws.price}</div>
      `;
      modal.style.display = 'flex';
      modal.querySelector('.workshop-modal-close').onclick = () => { modal.style.display = 'none'; };
      modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
    });
  });
}

// Create individual workshop row
function createWorkshopRow(ws, idx, list) {
    const wsDate = parseWorkshopDate(ws);
    let isUpcoming = wsDate && wsDate > new Date();
    let isRecurring = !ws.date && ws.recurring;
    let isCompleted = wsDate && wsDate < new Date();
    let daysUntil = null;
    if (wsDate && isUpcoming) {
      const diffTime = wsDate - new Date();
      daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    // Badge
    let badge = '';
    let badgeClass = '';
    if (isRecurring) {
      badge = ws.badge || 'Regular Classes';
      badgeClass = 'regular-classes';
    } else if (isUpcoming && daysUntil !== null && daysUntil <= 30) {
      badge = `${daysUntil} Days Left!`;
      badgeClass = 'urgent';
    } else if (isUpcoming) {
      badge = 'Upcoming';
      badgeClass = 'upcoming';
    } else if (isCompleted) {
      badge = 'Completed';
      badgeClass = '';
    }
    // Timer placeholder
    let timerHtml = '';
    let timerId = '';
    if (isUpcoming && wsDate) {
      timerId = `timer-${idx}`;
      timerHtml = `<span class="workshop-row-timer" id="${timerId}">Loading...</span>`;
    }
    // Price HTML
    let priceHtml = '';
    if ((isRecurring || isUpcoming) && ws.originalPrice) {
      priceHtml = `<span class='workshop-row-original-price'>₹${ws.originalPrice}</span> <span class='workshop-row-discounted-price'>₹${ws.price}</span>`;
    } else if ((isRecurring || isUpcoming)) {
      priceHtml = `<span class='workshop-row-discounted-price'>₹${ws.price}</span>`;
    } // else leave blank for completed
    // Row
    const row = document.createElement('div');
    row.className = isRecurring ? 'workshop-row regular-classes' : 'workshop-row';
    if (badge) {
      row.innerHTML += `<div class="workshop-row-badge ${badgeClass}">${badge}</div>`;
    }
    row.innerHTML += `
      <img class="workshop-row-poster" src="${ws.image}" alt="${ws.title} Poster">
      <div class="workshop-row-info">
        <div class="workshop-row-title">${ws.title}</div>
        <div class="workshop-row-meta">
          <span><i class="fas fa-map-marker-alt"></i> ${ws.location}</span>
          ${isRecurring ? `<span><i class="fas fa-calendar"></i> ${ws.recurring}</span>` : ws.date ? `<span><i class="fas fa-calendar"></i> ${formatWorkshopDate(ws.date, ws.time)}</span>` : ''}
        </div>
        <div class="workshop-row-desc">${ws.description || ''}</div>
        <div class="workshop-row-features">
          ${(ws.features || []).map(f => `<span class="workshop-row-feature">${f}</span>`).join('')}
        </div>
        ${priceHtml ? `<div class=\"workshop-row-price\">${priceHtml}</div>` : ''}
        ${timerHtml}
      </div>
      <div class="workshop-row-actions">
        <button class="workshop-row-view" data-idx="${idx}">View Details</button>
        ${(isRecurring && ws.price === 2800) ? `<a href="https://rzp.io/rzp/8oscG42" class="workshop-row-book" target="_blank">Book Now</a>` : (isUpcoming && ws.price === 650) ? `<a href="https://rzp.io/rzp/DFUtD7mS" class="workshop-row-book" target="_blank">Book Now</a>` : (isRecurring || isUpcoming) ? `<a href="#contact" class="workshop-row-book">Book Now</a>` : ''}
      </div>
    `;
    list.appendChild(row);
    // Start timer if needed
    if (isUpcoming && wsDate && timerId) {
      const timerEl = row.querySelector(`#${timerId}`);
      function updateTimer() {
        const now = new Date();
        let diff = wsDate - now;
        if (diff < 0) diff = 0;
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff / (1000*60*60)) % 24);
        const m = Math.floor((diff / (1000*60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        timerEl.textContent = `Starts In: ${d}d ${h}h ${m}m ${s}s`;
        if (diff > 0) setTimeout(updateTimer, 1000);
      }
      updateTimer();
    }
    
    list.appendChild(row);
}

document.addEventListener('DOMContentLoaded', renderWorkshopsList);

// HERO SECTION: Dynamic Promo Card
async function renderHeroPromo() {
  const data = await loadWorkshopsData();
  const allWorkshops = (data.workshops || []).concat(data.upcomingWorkshops || []);
  const now = new Date();

  // Sort with same logic as workshops section
  const sorted = allWorkshops.sort((a, b) => {
    const dateA = parseWorkshopDate(a);
    const dateB = parseWorkshopDate(b);
    const isARecurring = !a.date && a.recurring;
    const isBRecurring = !b.date && b.recurring;
    if (isARecurring && isBRecurring) return 0;
    if (isARecurring && !isBRecurring) return -1;
    if (!isARecurring && isBRecurring) return 1;
    if (dateA && dateB) {
      const isAUpcoming = dateA > now;
      const isBUpcoming = dateB > now;
      if (isAUpcoming && isBUpcoming) return dateB - dateA;
      if (!isAUpcoming && !isBUpcoming) return dateA - dateB;
      if (isAUpcoming && !isBUpcoming) return -1;
      if (!isAUpcoming && isBUpcoming) return 1;
    }
    if (dateA && !dateB) return -1;
    if (!dateA && dateB) return 1;
    return 0;
  });

  const top = sorted[0];
  if (!top) return;

  // Find hero promo container
  const promo = document.querySelector('.promo-poster');
  if (!promo) return;

  // Build timer if needed
  let timerHtml = '';
  let timerId = '';
  if (top.date && parseWorkshopDate(top) > now) {
    timerId = 'heroPromoTimer';
    timerHtml = `<div class="promo-timer" id="${timerId}">Loading...</div>`;
  }

  // Badge
  let badge = '';
  if (!top.date && top.recurring) {
    badge = 'Regular Classes';
  } else if (top.date && parseWorkshopDate(top) > now) {
    // Show days left if within 30 days
    const daysLeft = Math.ceil((parseWorkshopDate(top) - now) / (1000*60*60*24));
    badge = daysLeft <= 30 ? `${daysLeft} Days Left!` : 'Book Fast! Slots Filling Up!';
  } else if (top.date && parseWorkshopDate(top) < now) {
    badge = 'Completed';
  }

  // Render promo card
  promo.innerHTML = `
    <img src="${top.image}" alt="${top.title} Poster">
    <div class="promo-badge">${badge}</div>
    ${timerHtml}
    <a href="#contact" class="btn btn-primary promo-book-btn">Book Now</a>
  `;

  // Start timer if needed
  if (timerId) {
    const timerEl = document.getElementById(timerId);
    const target = parseWorkshopDate(top);
    function updateTimer() {
      const now = new Date();
      let diff = target - now;
      if (diff < 0) diff = 0;
      const h = Math.floor((diff / (1000*60*60)));
      const m = Math.floor((diff / (1000*60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      timerEl.textContent = `${h}h ${m}m ${s}s`;
      if (diff > 0) setTimeout(updateTimer, 1000);
    }
    updateTimer();
  }
}

document.addEventListener('DOMContentLoaded', renderHeroPromo); 