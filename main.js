
// Fluid Mouse Glow Logic
const mouseGlow = document.querySelector('.mouse-glow');

document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top = e.clientY + 'px';
});

// Advanced Particle System
const particlesContainer = document.getElementById('particles-container');
const particleCount = 100;
const particles = [];

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 2 + 1;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const pObj = {
        el: particle,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        originX: x,
        originY: y
    };
    
    particles.push(pObj);
    particlesContainer.appendChild(particle);
}

function animateParticles() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
            const force = (200 - dist) / 200;
            p.x -= dx * force * 0.05;
            p.y -= dy * force * 0.05;
        }
        
        // Wrap around
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
        
        p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
    });
    requestAnimationFrame(animateParticles);
}

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

animateParticles();

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

// HUD Updates
const hudSection = document.getElementById('hud-section');
const hudProgress = document.getElementById('hud-progress');
const hudCoords = document.getElementById('hud-coords');

window.addEventListener('scroll', () => {
    // Progress calculation
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = Math.round((winScroll / height) * 100);
    if (hudProgress) hudProgress.innerText = `LINK_STABILITY: ${100 - scrolled}%`;
    
    // Section detection
    const sections = ['hero', 'intro', 'capabilities', 'domains', 'video', 'connect'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                if (hudSection) hudSection.innerText = `SECTION: ${id.toUpperCase()}_PHASE`;
            }
        }
    });
});

document.addEventListener('mousemove', (e) => {
    if (hudCoords) hudCoords.innerText = `X: ${String(e.clientX).padStart(3, '0')} // Y: ${String(e.clientY).padStart(3, '0')}`;
});

// Loader Removal
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 1500); // 1.5s display for cinematic effect
    }
});
