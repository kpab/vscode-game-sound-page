document.addEventListener('DOMContentLoaded', function() {
    // Set glitch data-text attribute for the animation
    const glitchElements = document.querySelectorAll('.glitch-text');
    glitchElements.forEach(el => {
        el.setAttribute('data-text', el.textContent);
    });

    // Language toggling
    const enBtn = document.getElementById('en-btn');
    const jpBtn = document.getElementById('jp-btn');
    
    if (enBtn && jpBtn) {
        enBtn.addEventListener('click', function() {
            document.body.classList.remove('jp');
            enBtn.classList.add('active');
            jpBtn.classList.remove('active');
            localStorage.setItem('language', 'en');
        });
        
        jpBtn.addEventListener('click', function() {
            document.body.classList.add('jp');
            jpBtn.classList.add('active');
            enBtn.classList.remove('active');
            localStorage.setItem('language', 'jp');
        });
        
        // Load saved language preference or detect browser language
        const savedLanguage = localStorage.getItem('language');
        const browserLanguage = navigator.language || navigator.userLanguage;
        
        if (savedLanguage === 'jp' || (!savedLanguage && browserLanguage.startsWith('ja'))) {
            document.body.classList.add('jp');
            jpBtn.classList.add('active');
            enBtn.classList.remove('active');
        }
    }
    
    // Keyboard animation
    const keys = document.querySelectorAll('.key');
    
    // Random key animation
    function animateRandomKey() {
        if (keys.length > 0) {
            const randomIndex = Math.floor(Math.random() * keys.length);
            const key = keys[randomIndex];
            
            // Add active class to simulate press
            key.classList.add('active');
            
            // Remove active class after delay
            setTimeout(() => {
                key.classList.remove('active');
            }, 100);
            
            // Schedule next animation
            const delay = Math.random() * 300 + 100; // 100-400ms delay
            setTimeout(animateRandomKey, delay);
        }
    }
    
    // Start keyboard animation after a delay
    setTimeout(animateRandomKey, 2000);
    
    // Add active class to keys on click for interaction
    keys.forEach(key => {
        key.addEventListener('click', function() {
            this.classList.add('active');
            
            setTimeout(() => {
                this.classList.remove('active');
            }, 100);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .step, .showcase-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = entry.target.classList.contains('feature-card')
                    ? 'translateY(0)'
                    : 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = 0;
        
        if (element.classList.contains('feature-card')) {
            element.style.transform = 'translateY(30px)';
        } else {
            element.style.transform = 'translateX(30px)';
        }
        
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});
