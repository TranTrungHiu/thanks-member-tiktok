/**
 * APOLOGY WEBSITE        JAVASCRIPT
 * ===================================
 * 
 * Website xin lỗi với hiệu ứng đẹp và tương tác mượt mà
 * Tệp chính điều khiển tất cả các hiệu ứng và tương tác của website
 * 
 * @author: Website Creator
 * @version: 2.0
 */

class LoveWebsite {
    constructor() {
        // Cấu hình ban đầu
        this.isPlaying = false;
        this.volume = 0.3;
        
        // Mảng chứa các biểu tượng và từ ngữ xin lỗi
        this.hearts = ['❤️', '💕', '💖', '💗', '💘', '💝', '💞', '💓', '💗', '❣️'];
        this.loveWords = [
            'cảm ơn Anh Hong',
            'cảm ơn bạn đã tặng quà cho mình'
        ];
        this.fallingImages = [
            'assets/images/1.png',
            'assets/images/2.png', 
            'assets/images/3.gif',
            'assets/images/3.webp',
            'assets/images/4.png',
            'assets/images/5.png',
            'assets/images/6.gif',
            'assets/images/avatar.gif'
        ]; 
        this.sparkleSymbols = ['💗', '✨', '💍', '⭐', '🌟', '💫'];
        
        this.init();
    }

    /**
     * Khởi tạo website và các thành phần
     */
    init() {
        this.setupEventListeners();
        this.createParticles();
    }

    /**
     * Thiết lập các sự kiện click và tương tác
     */
    setupEventListeners() {
        const startBtn = document.getElementById('startBtn');
        const musicBtn = document.getElementById('musicBtn');
        const volumeBtn = document.getElementById('volumeBtn');

        startBtn.addEventListener('click', () => this.startExperience());
        musicBtn.addEventListener('click', () => this.toggleMusic());
        volumeBtn.addEventListener('click', () => this.adjustVolume());

        // Hiệu ứng click toàn trang
        document.addEventListener('click', (e) => this.createClickEffect(e));
    }

    /**
     * Bắt đầu trải nghiệm chính
     */
    startExperience() {
        const landingPage = document.getElementById('landingPage');
        const zoomContainer = document.getElementById('zoomContainer');
        const zoomImage = document.getElementById('zoomImage');
        const mainInterface = document.getElementById('mainInterface');

        // Tự động phát nhạc khi bắt đầu
        this.playMusic();

        // Ẩn trang chào mừng với hiệu ứng trái tim
        landingPage.classList.add('fade-out');
        this.createHeartTransition();

        setTimeout(() => {
            landingPage.style.display = 'none';
            zoomContainer.classList.add('active');
            
            // Thay đổi hiệu ứng zoom thành trái tim
            zoomImage.innerHTML = '<div class="heart-zoom">💖</div>';
            
            setTimeout(() => {
                zoomImage.classList.add('zooming');
                
                setTimeout(() => {
                    zoomContainer.style.display = 'none';
                    mainInterface.classList.add('active');
                    this.startMainInterface();
                }, 3000);
            }, 500);
        }, 1000);
    }

    /**
     * Tạo hiệu ứng chuyển trang với trái tim
     */
    createHeartTransition() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'transition-heart';
                heart.innerHTML = '💖';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
                heart.style.color = '#ff6b9d';
                heart.style.zIndex = '9999';
                heart.style.animation = 'heartFloat 3s ease-out forwards';
                heart.style.pointerEvents = 'none';
                
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 3000);
            }, i * 100);
        }
    }

    /**
     * Tự động phát nhạc
     */
    playMusic() {
        const music = document.getElementById('backgroundMusic');
        if (music) {
            music.volume = this.volume;
            music.play().catch(e => {
                console.log('Không thể tự động phát nhạc:', e);
            });
            this.isPlaying = true;
        }
    }

    /**
     * Chuyển đổi trạng thái phát/tắt nhạc
     */
    toggleMusic() {
        const music = document.getElementById('backgroundMusic');
        const musicBtn = document.getElementById('musicBtn');
        
        if (this.isPlaying) {
            music.pause();
            musicBtn.textContent = '🔇';
            this.isPlaying = false;
        } else {
            music.play();
            musicBtn.textContent = '🎵';
            this.isPlaying = true;
        }
    }

    /**
     * Điều chỉnh âm lượng
     */
    adjustVolume() {
        const music = document.getElementById('backgroundMusic');
        const volumeBtn = document.getElementById('volumeBtn');
        
        if (this.volume === 0.3) {
            this.volume = 0.7;
            volumeBtn.textContent = '🔊';
        } else if (this.volume === 0.7) {
            this.volume = 0.1;
            volumeBtn.textContent = '🔉';
        } else {
            this.volume = 0.3;
            volumeBtn.textContent = '🔊';
        }
        
        music.volume = this.volume;
    }

    /**
     * Khởi động giao diện chính với tất cả hiệu ứng
     */
    startMainInterface() {
        this.startFallingHearts();
        this.startFallingText();
        this.startFallingImages();
        this.createBubbles();
        this.createSparkles();
        this.createBorderEffects();
        this.createMeteorShower();
        this.createFloatingBackground();
    }

    /**
     * Tạo hiệu ứng hearts rơi từ trên xuống
     */
    startFallingHearts() {
        const createHeart = () => {
            const heart = document.createElement('div');
            heart.className = 'falling-heart interactive-heart';
            heart.textContent = this.hearts[Math.floor(Math.random() * this.hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.fontSize = (Math.random() * 2 + 2) + 'rem';
            heart.style.animationDelay = Math.random() * 1 + 's';

            const colors = ['#ff6b9d', '#ff8fab', '#ffc0cb', '#ff69b4', '#ff1493', '#dc143c'];
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];

            // Thêm sự kiện tương tác
            heart.addEventListener('click', (e) => this.heartClick(e, heart));
            heart.addEventListener('mouseenter', () => this.heartHover(heart));

            document.getElementById('mainInterface').appendChild(heart);
            setTimeout(() => heart.remove(), 8000);
        };

        setInterval(createHeart, 200);
    }

    /**
     * Cải thiện hiệu ứng text rơi với font chữ đẹp cho tiếng Việt
     */
    startFallingText() {
        const createText = () => {
            const text = document.createElement('div');
            text.className = 'falling-text';
            text.textContent = this.loveWords[Math.floor(Math.random() * this.loveWords.length)];
            text.style.left = Math.random() * 100 + '%';
            text.style.animationDuration = (Math.random() * 3 + 6) + 's';
            text.style.fontSize = (Math.random() * 0.5 + 1.5) + 'rem';
            
            // Thêm màu sắc ngẫu nhiên cho text
            const textColors = ['#ffb3d9', '#ff8fab', '#ffc0cb', '#ffb6c1', '#ffa0c9', '#ff69b4'];
            text.style.color = textColors[Math.floor(Math.random() * textColors.length)];
            
            // Thêm hiệu ứng hover
            text.addEventListener('mouseenter', () => {
                text.style.animationPlayState = 'paused';
                text.style.transform += ' scale(1.3)';
                text.style.textShadow = '0 0 30px rgba(255, 179, 217, 1), 0 0 60px rgba(255, 107, 157, 0.8)';
                text.style.background = 'linear-gradient(135deg, rgba(255, 107, 157, 0.3) 0%, rgba(255, 179, 217, 0.3) 100%)';
            });
            
            text.addEventListener('mouseleave', () => {
                text.style.animationPlayState = 'running';
                text.style.transform = text.style.transform.replace(' scale(1.3)', '');
                text.style.textShadow = '0 0 20px rgba(255, 179, 217, 0.8), 0 0 40px rgba(255, 107, 157, 0.6)';
                text.style.background = 'linear-gradient(135deg, rgba(255, 107, 157, 0.1) 0%, rgba(255, 179, 217, 0.1) 100%)';
            });

            document.getElementById('mainInterface').appendChild(text);
            setTimeout(() => text.remove(), 9000);
        };

        setInterval(createText, 1500);
    }

    /**
     * Tạo hiệu ứng rừng ảnh thật rơi với animation lật cho ảnh tĩnh
     */
    startFallingImages() {
        const createImage = () => {
            const img = document.createElement('img');
            img.className = 'falling-image';
            const imagePath = this.fallingImages[Math.floor(Math.random() * this.fallingImages.length)];
            img.src = imagePath;
            img.style.position = 'absolute';
            img.style.left = Math.random() * 100 + '%';
            img.style.top = '-100px';
            img.style.width = (Math.random() * 80 + 60) + 'px';
            img.style.height = 'auto';
            img.style.borderRadius = '10px';
            img.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
            img.style.opacity = '0.8';
            img.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))';
            img.style.zIndex = '10';
            
            // Sử dụng transform để tạo hiệu ứng rơi thay vì animation
            img.style.transition = 'transform 6s linear';
            img.style.transform = 'translateY(0px)';
            
            // Phân biệt gif và ảnh tĩnh để thêm hiệu ứng lật
            const isGif = imagePath.includes('.gif');
            const isStatic = imagePath.includes('.png') || imagePath.includes('.webp');
            
            if (isStatic) {
                // Ảnh tĩnh thì thêm hiệu ứng lật
                img.style.animation = 'flipAnimation 3s ease-in-out infinite';
            }
            
            // Thêm hiệu ứng hover
            img.addEventListener('mouseenter', () => {
                img.style.transform += ' scale(1.1)';
                img.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.8))';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = img.style.transform.replace(' scale(1.1)', '');
                img.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))';
            });
            
            // Thêm tương tác click
            img.addEventListener('click', (e) => this.imageClick(e, img));
            
            // Thêm debug console
            console.log('Tạo ảnh:', imagePath);
            
            document.getElementById('mainInterface').appendChild(img);
            
            // Bắt đầu hiệu ứng rơi sau khi thêm vào DOM
            setTimeout(() => {
                img.style.transform = 'translateY(' + (window.innerHeight + 100) + 'px)';
            }, 100);
            
            setTimeout(() => img.remove(), 8000);
        };

        // Tạo burst ảnh ngay lập tức
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createImage(), i * 100);
        }

        // Tạo rừng ảnh rớt xuống - tần suất cực cao
        setInterval(createImage, 200);
        
        // Tạo batch ảnh rơi cùng lúc mỗi 2 giây
        setInterval(() => {
            for (let i = 0; i < 4; i++) {
                setTimeout(() => createImage(), i * 50);
            }
        }, 2000);
    }

    /**
     * Tạo bong bóng nổi lên
     */
    createBubbles() {
        const createBubble = () => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.width = (Math.random() * 60 + 20) + 'px';
            bubble.style.height = bubble.style.width;
            bubble.style.animationDuration = (Math.random() * 8 + 6) + 's';
            bubble.style.animationDelay = Math.random() * 4 + 's';
            
            document.getElementById('mainInterface').appendChild(bubble);
            setTimeout(() => bubble.remove(), 15000);
        };

        setInterval(createBubble, 2000);
    }

    /**
     * Tạo hiệu ứng lấp lánh
     */
    createSparkles() {
        const createSparkle = () => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = this.sparkleSymbols[Math.floor(Math.random() * this.sparkleSymbols.length)];
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparkle.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
            
            const colors = ['#fff', '#ffff00', '#ffd700', '#ff6b9d', '#00ffff', '#ff69b4'];
            sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            document.getElementById('mainInterface').appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 3000);
        };

        setInterval(createSparkle, 800);
    }

    /**
     * Tạo các particle nhỏ
     */
    createParticles() {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            document.getElementById('mainInterface').appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        };

        setInterval(createParticle, 300);
    }

    /**
     * Tạo hiệu ứng meteor shower
     */
    createMeteorShower() {
        const createMeteor = () => {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            meteor.style.left = Math.random() * 100 + '%';
            meteor.style.top = Math.random() * 50 + '%';
            meteor.style.animationDuration = (Math.random() * 2 + 2) + 's';
            meteor.style.animationDelay = Math.random() * 3 + 's';
            
            document.getElementById('mainInterface').appendChild(meteor);
            setTimeout(() => meteor.remove(), 5000);
        };

        setInterval(createMeteor, 3000);
    }

    /**
     * Tạo hiệu ứng floating hearts background
     */
    createFloatingBackground() {
        const createFloatingHeart = () => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart-bg';
            heart.textContent = this.hearts[Math.floor(Math.random() * this.hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            
            document.getElementById('mainInterface').appendChild(heart);
            setTimeout(() => heart.remove(), 20000);
        };

        setInterval(createFloatingHeart, 4000);
    }

    /**
     * Tạo hiệu ứng wave khi click
     */
    createWaveEffect(x, y) {
        const wave = document.createElement('div');
        wave.className = 'wave';
        wave.style.position = 'absolute';
        wave.style.left = x + 'px';
        wave.style.top = y + 'px';
        wave.style.width = '20px';
        wave.style.height = '20px';
        wave.style.transform = 'translate(-50%, -50%)';
        wave.style.pointerEvents = 'none';
        wave.style.zIndex = '999';
        
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 4000);
    }

    /**
     * Tạo hiệu ứng biên và các phần tử lãng mạn
     */
    createBorderEffects() {
        // Các phần tử lãng mạn nổi
        const romanticElements = ['💗', '💖', '💝', '🌹', '🦋', '✨'];
        
        setInterval(() => {
            const element = document.createElement('div');
            element.textContent = romanticElements[Math.floor(Math.random() * romanticElements.length)];
            element.className = 'falling-heart';
            element.style.left = Math.random() * 100 + '%';
            element.style.animationDuration = (Math.random() * 6 + 8) + 's';
            element.style.fontSize = '2rem';
            element.style.opacity = '0.6';
            element.style.filter = 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.5))';
            
            document.getElementById('mainInterface').appendChild(element);
            setTimeout(() => element.remove(), 14000);
        }, 3000);

        // Hiệu ứng sao băng
        setInterval(() => {
            const star = document.createElement('div');
            star.textContent = '💫';
            star.style.position = 'absolute';
            star.style.left = '-50px';
            star.style.top = Math.random() * 50 + '%';
            star.style.fontSize = '1.5rem';
            star.style.color = '#ffd700';
            star.style.animation = 'shootingStar 3s linear forwards';
            star.style.pointerEvents = 'none';
            
            document.getElementById('mainInterface').appendChild(star);
            setTimeout(() => star.remove(), 3000);
        }, 5000);

        // Quả cầu phát sáng
        setInterval(() => {
            const orb = document.createElement('div');
            orb.style.position = 'absolute';
            orb.style.left = Math.random() * 100 + '%';
            orb.style.top = Math.random() * 100 + '%';
            orb.style.width = (Math.random() * 20 + 10) + 'px';
            orb.style.height = orb.style.width;
            orb.style.borderRadius = '50%';
            orb.style.background = 'radial-gradient(circle, rgba(255,107,157,0.8) 0%, transparent 70%)';
            orb.style.animation = 'orbPulse 4s ease-in-out infinite';
            orb.style.pointerEvents = 'none';
            
            document.getElementById('mainInterface').appendChild(orb);
            setTimeout(() => orb.remove(), 4000);
        }, 4000);
    }

    /**
     * Xử lý click vào heart
     */
    heartClick(e, heart) {
        e.stopPropagation();
        this.createWaveEffect(e.clientX, e.clientY);
        
        // Tạo hiệu ứng nổ
        const explosion = document.createElement('div');
        explosion.innerHTML = '💥';
        explosion.style.position = 'absolute';
        explosion.style.left = e.clientX + 'px';
        explosion.style.top = e.clientY + 'px';
        explosion.style.fontSize = '2rem';
        explosion.style.animation = 'explode 0.5s ease-out';
        explosion.style.pointerEvents = 'none';
        explosion.style.zIndex = '999';
        
        document.body.appendChild(explosion);
        setTimeout(() => explosion.remove(), 500);
        
        heart.remove();
    }

    /**
     * Xử lý hover vào heart
     */
    heartHover(heart) {
        heart.style.transform = 'scale(1.5) rotate(15deg)';
        heart.style.filter = 'drop-shadow(0 0 25px rgba(255, 107, 157, 1))';
    }

    /**
     * Xử lý click vào image
     */
    imageClick(e, img) {
        e.stopPropagation();
        this.createWaveEffect(e.clientX, e.clientY);
        
        // Tạo hiệu ứng sparkle
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = (e.clientX + Math.random() * 40 - 20) + 'px';
            sparkle.style.top = (e.clientY + Math.random() * 40 - 20) + 'px';
            sparkle.style.fontSize = '1rem';
            sparkle.style.animation = 'sparkleOut 1s ease-out';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '999';
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
        
        img.remove();
    }

    /**
     * Tạo hiệu ứng click toàn trang
     */
    createClickEffect(e) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
}

// Khởi tạo website khi trang web tải xong
document.addEventListener('DOMContentLoaded', () => {
    new LoveWebsite();
});
