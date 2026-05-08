
// Fluid Mouse Glow Logic
const mouseGlow = document.querySelector('.mouse-glow');

document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
});

// Particle System
const particlesContainer = document.getElementById('particles-container');
const particleCount = 40;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random initial positions
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Animate particles
    particle.animate([
        { transform: `translate(0, 0)`, opacity: 0.1 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 0.3 },
        { transform: `translate(0, 0)`, opacity: 0.1 }
    ], {
        duration: duration * 1000,
        iterations: Infinity,
        easing: 'ease-in-out',
        delay: delay * 1000
    });
    
    particlesContainer.appendChild(particle);
}

// Hero Parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed');
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 3D Card Tilt + Luminosity Proximity
const cards = document.querySelectorAll('.luminosity-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update luminosity position
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        
        // 3D Tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.custom-cursor-follower');

document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    
    // Smooth cursor movement
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    
    // Follower delay
    setTimeout(() => {
        follower.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
    }, 50);
});

// Cursor interaction with buttons and links
const interactables = document.querySelectorAll('a, button, .luminosity-card, .domain-pill');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(2.5)';
        cursor.style.background = 'transparent';
        cursor.style.border = '1px solid var(--accent-green)';
        follower.style.width = '80px';
        follower.style.height = '80px';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
        cursor.style.background = 'var(--accent-green)';
        cursor.style.border = 'none';
        follower.style.width = '40px';
        follower.style.height = '40px';
    });
});

// Scroll Reveal Logic
const revealElements = document.querySelectorAll('.reveal, .stagger-reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));


// 3D Perspective on Hero (Optional - reduced for cinematic feel)
const hero = document.querySelector('.hero');
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xMove = (clientX - innerWidth / 2) / (innerWidth / 2) * 5;
    const yMove = (clientY - innerHeight / 2) / (innerHeight / 2) * 5;
    
    // Subtle background shift for depth
    document.querySelector('.glow-1').style.transform = `translate(${xMove}%, ${yMove}%)`;
    document.querySelector('.glow-2').style.transform = `translate(${-xMove}%, ${-yMove}%)`;
});
