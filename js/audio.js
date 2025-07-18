/**
 * LOVE WEBSITE - AUDIO CONTROLLER
 * ================================
 * 
 * Tệp điều khiển âm thanh và nhạc nền
 */

// Thêm các phương thức âm thanh vào class LoveWebsite
LoveWebsite.prototype.toggleMusic = function() {
    const musicBtn = document.getElementById('startBtn');
    const audio = document.getElementById('backgroundMusic');

    if (this.isPlaying) {
        audio.pause();
        musicBtn.textContent = '🔇';
        this.isPlaying = false;
    } else {
        audio.volume = this.volume;
        audio.play().catch(err => console.log("Không thể phát nhạc:", err));
        musicBtn.textContent = '🎵';
        this.isPlaying = true;
    }
};

LoveWebsite.prototype.adjustVolume = function() {
    const volumeBtn = document.getElementById('volumeBtn');
    const audio = document.getElementById('backgroundMusic');
    
    if (this.volume > 0.5) {
        this.volume = 0.1;
        volumeBtn.textContent = '🔉';
    } else if (this.volume > 0.1) {
        this.volume = 0;
        volumeBtn.textContent = '🔇';
    } else {
        this.volume = 1;
        volumeBtn.textContent = '🔊';
    }
    
    // Cập nhật âm lượng nếu đang phát
    if (this.isPlaying) {
        audio.volume = this.volume;
    }
};

LoveWebsite.prototype.playBackgroundSound = function() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    } catch (e) {
        console.log('Audio context không khả dụng');
    }
};
