/**
 * LOVE WEBSITE - INITIALIZATION
 * ==============================
 * 
 * Tệp khởi tạo và các hiệu ứng đặc biệt
 */

// Khởi tạo website khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    new LoveWebsite();
});

// Hiệu ứng nền thay đổi màu sắc
setInterval(() => {
    document.body.style.background = `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, #1a1a2e 0%, #000 70%)`;
}, 10000);

// Hiệu ứng cursor trail (dấu vết chuột)
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.width = '6px';
    trail.style.height = '6px';
    trail.style.background = 'rgba(255, 107, 157, 0.7)';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '999';
    trail.style.animation = 'fadeOut 1s ease-out forwards';
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1000);
});

// CSS cho hiệu ứng fadeOut
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes fadeOut {
        0% { 
            opacity: 1; 
            transform: scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0.3); 
        }
    }
`;
document.head.appendChild(trailStyle);

// Hiệu ứng đặc biệt khi load trang
window.addEventListener('load', () => {
    // Tạo hiệu ứng welcome sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.fontSize = '2rem';
            sparkle.style.color = '#ffd700';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkleWelcome 3s ease-out forwards';
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 3000);
        }, i * 100);
    }
});

// CSS cho hiệu ứng welcome
const welcomeStyle = document.createElement('style');
welcomeStyle.textContent = `
    @keyframes sparkleWelcome {
        0% { 
            opacity: 0; 
            transform: scale(0) rotate(0deg); 
        }
        50% { 
            opacity: 1; 
            transform: scale(1.5) rotate(180deg); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0) rotate(360deg); 
        }
    }
`;
document.head.appendChild(welcomeStyle);
