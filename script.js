/**
 * STATE-OF-THE-ART INTERACTION SCRIPT
 * Handling micro-animations, glassmorphism glows, and scroll reveals
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOUSE TRACKING GLOW EFFECT
    // Attaches to any element with .hover-glow to create a radial gradient spotlight
    const handleOnMouseMove = e => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    };

    const glowCards = document.querySelectorAll('.hover-glow');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', handleOnMouseMove);
    });

    // 2. EXPANDING BLOCK LOGIC (ACCORDION)
    const expandTrigger = document.querySelector('.expand-trigger');
    const expandContent = document.getElementById('ai-content');

    if (expandTrigger && expandContent) {
        expandTrigger.addEventListener('click', () => {
            const isExpanded = expandTrigger.getAttribute('aria-expanded') === 'true';
            
            if (!isExpanded) {
                // Open
                expandTrigger.setAttribute('aria-expanded', 'true');
                expandContent.classList.add('is-open');
                
                // Slight scroll to ensure content is visible
                setTimeout(() => {
                    const y = expandTrigger.getBoundingClientRect().top + window.scrollY - 20;
                    window.scrollTo({top: y, behavior: 'smooth'});
                }, 300);
            } else {
                // Close
                expandTrigger.setAttribute('aria-expanded', 'false');
                expandContent.classList.remove('is-open');
            }
        });
    }

    // 3. SCROLL REVEAL ANIMATIONS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing after reveal if we only want it once
                // revealObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.reveal-on-scroll');
    scrollElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. COPY TO CLIPBOARD FOR PILL NAV
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault(); // allow copy instead of opening client immediately
            const email = this.getAttribute('href').replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.querySelector('span').textContent;
                this.querySelector('span').textContent = 'Copied!';
                
                // Add a little pop effect
                this.style.transform = 'scale(1.05)';
                setTimeout(() => this.style.transform = '', 200);

                setTimeout(() => {
                    this.querySelector('span').textContent = originalText;
                }, 2000);
            }).catch(err => {
                // Fallback action
                window.location.href = this.getAttribute('href');
            });
        });
    }

    // 5. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log("State-of-the-art systems loaded successfully.");
});
