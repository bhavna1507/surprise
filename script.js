// ===== DOM Elements =====
const landing = document.getElementById('landing');
const envelope = document.getElementById('envelope');
const mainContent = document.getElementById('mainContent');
const typewriter = document.getElementById('typewriter');
const heartsContainer = document.getElementById('hearts');
const sparklesContainer = document.getElementById('sparkles');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const proposalSection = document.getElementById('proposalSection');
const ringBox = document.getElementById('ringBox');
const confettiContainer = document.getElementById('confetti');
const heartsExplosion = document.getElementById('heartsExplosion');

// ===== Typewriter Text =====
const typewriterText = "Every moment with you is a beautiful dream come true... 💕";
let charIndex = 0;

// ===== Create Floating Hearts (Mobile Optimized) =====
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💜', '💝'];
    const isMobile = window.innerWidth <= 768;
    const interval = isMobile ? 1500 : 800; // Slower on mobile
    const maxHearts = isMobile ? 8 : 15; // Fewer hearts on mobile

    setInterval(() => {
        // Limit total hearts on screen
        if (heartsContainer.children.length >= maxHearts) return;

        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => heart.remove(), 8000);
    }, interval);
}

// ===== Create Sparkles =====
function createSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparklesContainer.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 2000);
    }, 300);
}

// ===== Envelope Click Handler =====
envelope.addEventListener('click', () => {
    envelope.classList.add('open');

    // Start "Apna Bana Le" when envelope is clicked
    const envelopeMusic = document.getElementById('envelopeMusic');
    if (envelopeMusic) {
        envelopeMusic.volume = 0.5;
        envelopeMusic.play().catch(e => console.log('Audio autoplay blocked'));
    }

    setTimeout(() => {
        landing.classList.add('hidden');
        mainContent.classList.add('visible');
        startTypewriter();
        initScrollAnimations();
    }, 1500);
});

// ===== Typewriter Effect =====
function startTypewriter() {
    if (charIndex < typewriterText.length) {
        typewriter.textContent += typewriterText.charAt(charIndex);
        charIndex++;
        setTimeout(startTypewriter, 80);
    }
}

// ===== Ring Box Interaction =====
ringBox.addEventListener('click', () => {
    ringBox.classList.toggle('open');
});

// ===== Yes Button Handler =====
yesBtn.addEventListener('click', () => {
    // Stop "Apna Bana Le" and start "Sang Rahiyo"
    const envelopeMusic = document.getElementById('envelopeMusic');
    const bgMusic = document.getElementById('bgMusic');

    if (envelopeMusic) {
        envelopeMusic.pause();
        envelopeMusic.currentTime = 0;
    }

    if (bgMusic) {
        bgMusic.volume = 0.6;
        bgMusic.play().catch(e => console.log('Audio autoplay blocked'));
    }

    // Hide proposal section content
    proposalSection.style.display = 'none';

    // Show celebration
    celebration.classList.add('visible');

    // Create confetti explosion
    createConfetti();

    // Create hearts explosion
    createHeartsExplosion();

    // Scroll to celebration
    celebration.scrollIntoView({ behavior: 'smooth' });
});

// ===== No Button Handler - Fun Chase Effect =====
let noButtonMoves = 0;

noBtn.addEventListener('mouseover', () => {
    if (noButtonMoves < 5) {
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';

        noButtonMoves++;

        if (noButtonMoves >= 3) {
            noBtn.textContent = "You can't say no! 😏";
        }
    }
});

noBtn.addEventListener('click', () => {
    noBtn.textContent = "Try again! 💕";
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noButtonMoves = 0;

    // Shake the yes button to draw attention
    yesBtn.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        yesBtn.style.animation = '';
    }, 500);
});

// ===== Create Confetti =====
function createConfetti() {
    const colors = ['#ff6b9d', '#ff8fab', '#ffc2d1', '#ffd700', '#ff69b4', '#ff1493', '#ffffff'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// ===== Create Hearts Explosion =====
function createHeartsExplosion() {
    const hearts = ['💕', '💖', '💕', '💜', '💝', '✨', '🩷', '💗'];

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('span');
        heart.className = 'explosion-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const angle = (i / 30) * 360;
        const distance = 100 + Math.random() * 200;
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;

        heart.style.setProperty('--x', x + 'px');
        heart.style.setProperty('--y', y + 'px');
        heart.style.animationDelay = (Math.random() * 0.5) + 's';

        heartsExplosion.appendChild(heart);

        setTimeout(() => heart.remove(), 2500);
    }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add staggered animation to children if applicable
                const children = entry.target.querySelectorAll('.reason-card, .timeline-item');
                children.forEach((child, index) => {
                    child.style.animationDelay = (index * 0.1) + 's';
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.journey-section, .reasons-section, .proposal-section').forEach(section => {
        observer.observe(section);
    });
}

// ===== Add CSS for animations =====
const style = document.createElement('style');
style.textContent = `
    .timeline-item,
    .reason-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .timeline-item.animate-in,
    .reason-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
});

// ===== Easter Egg - Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated - super hearts mode!
            document.body.style.animation = 'rainbow 2s infinite';
            const styleEaster = document.createElement('style');
            styleEaster.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(styleEaster);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ===== Parallax Effect on Mouse Move =====
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    const hearts = document.querySelectorAll('.floating-heart');
    hearts.forEach(heart => {
        const speed = parseFloat(heart.style.fontSize) / 30;
        heart.style.transform += ` translate(${mouseX * speed * 20}px, ${mouseY * speed * 20}px)`;
    });
});

// ===== Touch Support for Mobile =====
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;

    // Create hearts on swipe
    if (Math.abs(diff) > 50) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = '💕';
        heart.style.left = e.touches[0].clientX + 'px';
        heart.style.top = e.touches[0].clientY + 'px';
        heart.style.fontSize = '30px';
        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 2000);
    }
});

console.log('💕 Made with love for Bhavna 💕');
