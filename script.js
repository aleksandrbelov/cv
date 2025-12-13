// ===== Smooth Scroll Behavior =====
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

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ===== Skill Tag Animation on Scroll =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'scale(1)';
                }, index * 50);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    const tags = category.querySelectorAll('.skill-tag');
    tags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        tag.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    });
    skillObserver.observe(category);
});

// ===== Experience Item Hover Effect Enhancement =====
document.querySelectorAll('.experience-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ===== Dynamic Year in Footer =====
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} Oleksandr Bielov. All rights reserved.`;
}

// ===== Parallax Effect for Background =====
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.header::before');
    
    if (parallaxElements.length > 0) {
        const rate = scrolled * 0.5;
        document.querySelector('.header').style.transform = `translateY(${rate}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ===== Add Active State to Contact Links =====
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all links
        document.querySelectorAll('.contact-link').forEach(l => {
            l.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // For email and phone links, let default behavior happen
        if (this.getAttribute('href').startsWith('mailto:') || 
            this.getAttribute('href').startsWith('tel:')) {
            return;
        }
    });
});

// ===== Typing Effect for Name (Optional Enhancement) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on page load
// window.addEventListener('load', () => {
//     const nameElement = document.querySelector('.name');
//     const originalText = nameElement.textContent;
//     typeWriter(nameElement, originalText, 80);
// });

// ===== Scroll Progress Indicator =====
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===== Copy Email to Clipboard =====
const emailLink = document.getElementById('email-link');
if (emailLink) {
    emailLink.addEventListener('click', function(e) {
        const email = this.getAttribute('href').replace('mailto:', '');
        
        // Create temporary input to copy email
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        // Show copied notification
        const originalText = this.querySelector('span').textContent;
        this.querySelector('span').textContent = 'Copied!';
        
        setTimeout(() => {
            this.querySelector('span').textContent = originalText;
        }, 2000);
    });
}

// ===== Initialize on DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Resume page loaded successfully!');
    
    // Add smooth reveal to header
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            header.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ===== Performance Optimization: Debounce Function =====
function debounce(func, wait) {
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

// Apply debounce to resize events
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
    // Add any resize-specific logic here
}, 250));
