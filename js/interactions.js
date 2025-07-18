/**
 * LOVE WEBSITE - INTERACTIVE EFFECTS
 * ===================================
 * 
 * Tệp chứa các hiệu ứng tương tác và sự kiện
 */

// Thêm các phương thức tương tác vào class LoveWebsite
LoveWebsite.prototype.heartHover = function(heart) {
    heart.style.transform = 'scale(1.3) rotate(15deg)';
    heart.style.filter = 'drop-shadow(0 0 25px rgba(255, 107, 157, 1))';
    
    // Tạo mini hearts xung quanh
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const miniHeart = document.createElement('div');
            miniHeart.textContent = '💗';
            miniHeart.className = 'heart-trail';
            miniHeart.style.position = 'absolute';
            miniHeart.style.left = heart.offsetLeft + 'px';
            miniHeart.style.top = heart.offsetTop + 'px';
            miniHeart.style.fontSize = '1rem';
            miniHeart.style.color = '#ff6b9d';
            
            document.getElementById('mainInterface').appendChild(miniHeart);
            setTimeout(() => miniHeart.remove(), 2000);
        }, i * 200);
    }
};

LoveWebsite.prototype.heartClick = function(e, heart) {
    e.stopPropagation();
    
    // Tạo hiệu ứng nổ
    for (let i = 0; i < 5; i++) {
        const miniHeart = document.createElement('div');
        miniHeart.textContent = '💗';
        miniHeart.style.position = 'absolute';
        miniHeart.style.left = e.clientX + 'px';
        miniHeart.style.top = e.clientY + 'px';
        miniHeart.style.fontSize = '1rem';
        miniHeart.style.color = '#ff6b9d';
        miniHeart.style.pointerEvents = 'none';
        miniHeart.style.animation = `heartExplode 1s ease-out forwards`;
        miniHeart.style.animationDelay = i * 0.1 + 's';
        
        document.body.appendChild(miniHeart);
        setTimeout(() => miniHeart.remove(), 1000);
    }
    
    // Hiệu ứng rung (nếu hỗ trợ)
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
};

LoveWebsite.prototype.imageClick = function(e, img) {
    e.stopPropagation();
    
    // Tạo hiệu ứng nổ với sparkles
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.color = '#ffd700';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = `sparkleExplode 1.5s ease-out forwards`;
        sparkle.style.animationDelay = i * 0.1 + 's';
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }
    
    // Loại bỏ hình ảnh được click với hiệu ứng
    img.style.transform = 'scale(2) rotate(360deg)';
    img.style.opacity = '0';
    setTimeout(() => img.remove(), 500);
};

LoveWebsite.prototype.createClickEffect = function(e) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.background = 'rgba(255, 107, 157, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1002';
    
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    
    // Tạo wave effect
    if (this.createWaveEffect) {
        this.createWaveEffect(e.clientX, e.clientY);
    }
};

/**
 * Thêm CSS động cho các hiệu ứng
 */
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartExplode {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2) translateX(${Math.random() * 100 - 50}px) translateY(${Math.random() * 100 - 50}px); opacity: 0; }
        }
        
        @keyframes sparkleExplode {
            0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(3) rotate(720deg) translateX(${Math.random() * 150 - 75}px) translateY(${Math.random() * 150 - 75}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', addDynamicAnimations);
