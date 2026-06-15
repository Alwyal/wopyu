window.startLevel1 = function() {
    let score = 0;
    let missed = 0;
    const targetScore = 66; 
    const maxMissed = 6;
    let gameInterval;
    let isGameOver = false;
    
    const gameArea = document.getElementById('gameArea');
    const scoreVal = document.getElementById('scoreVal');
    const missedVal = document.getElementById('missedVal');
    const backToJourneyBtn = document.getElementById('backToJourneyBtn');

    const wishes = [
        "✨ Selalu Bahagia Ya ✨", "❤️ Makin Sayang Sama Aku", " Sehat Lahir Batin", "🚀 Sukses Karirnya", 
        "🥰 Dilancarkan Rezekinya", "⭐ Impiannya Tercapai", "🥳 Makin Dewasa", "🌸 Makin Cantik Terus", 
        "💭 Selalu Ada Untukmu", "☀️ Penyejuk Hatiku", "👑 Semesta Punya Kamu", "🍭 Manisnya Senyummu",
        "🧁 Selalu Ceria Ya", "🧩 Pelengkap Hidupku", "🔮 Masa Depan Cerah", "🌻 Bersinar Seperti Sun",
        "🍀 Beruntung Milikimu", "🎈 Bahagia Tiap Hari", "🧸 Gemas Selalu", "💌 Sayang Kamu Selalu",
        "🥂 Rayakan Hari Ini", "💎 Kamu Berharga", "🎀 Cantik Luar Dalam", "🍃 Damai Pikiranmu",
        "🎵 Indah Hari-harimu", "🪐 My Whole Universe", "🍓 Gemas Kayak Stroberi", "🍯 Manis Kayak Madu",
        "🍫 Moodbooster-ku", "🍿 Seru Tiap Hari", "🎨 Warnai Hidupku", "🛸 Cinta Sampai Angkasa",
        "⚓ Jangkar Hatiku", "💡 Sumber Semangatku", "🔑 Kunci Bahagiaku", "🧼 Wangi Terus Ya",
        "🐾 Teman Petualangku", "🏹 Tepat di Hatiku", "🤍 Tulus Sayang Kamu", "💫 Bintang Hatiku",
        "🌊 Tenang Jiwamu", "🔥 Semangat Terus ya!", "🏰 Ratu di Hatiku", "🎡 Seru Bersamamu",
        "⛺ Hangat Pelukanmu", "🚲 Jalanin Bareng Ya", "🚗 Sampai Tua Bersama", "✈️ Keliling Dunia Bareng",
        "🗺️ Nyasar di Hatimu", "📸 Abadikan Momen Kita", "⏳ Waktu Berharga Kita", "🕯️ Terangi Jalanku",
        "🧲 Magnet Rinduku", "💎 Harta Paling Indah", "🧿 Dijauhkan dari Sedih", "📿 Berkah Umurnya",
        "🪐 Dunia Indah Barengmu", "🍪 Manis Gak Membosankan", "🍨 Penyegar Hariku", "🍊 Segar Pikiranmu",
        "🦋 Terbang Tinggi Impianmu", "🦄 Keajaiban Hidupku", "🌈 Pelangi di Badai", "🌦️ Selalu Ada Harapan",
        "🌟 Bersinar di Surga", "💍 Till Jannah Insyaallah"
    ];

    // Reset State Game
    score = 0;
    missed = 0;
    isGameOver = false;
    scoreVal.innerText = score;
    missedVal.innerText = `${missed} / ${maxMissed}`; 
    gameArea.innerHTML = '';
    if (backToJourneyBtn) backToJourneyBtn.classList.add('hidden');
	
	// =========================================================================
    // IMPLEMENTASI ENGINE CHEAT LEVEL 1 KUSTOM (PC & MOBILE RESPONSIVE)
    // =========================================================================
    if (window.isCheatUnlocked) {
        window.buatTombolSkipAesthetic('cheatLvl1', gameArea, function() {
            // Logika inti skip score bawaan game kamu (+11)
            score += 11;
            if (score > targetScore) score = targetScore;
            scoreVal.innerText = score;

            // Sinkronisasi tingkat kecepatan interval game asli kamu
            if (score === 11) initInterval(850);
            else if (score === 22) initInterval(700);
            else if (score === 33) initInterval(550);
            else if (score === 44) initInterval(400); 
            else if (score === 55) initInterval(300); 

            // Jika score menyentuh target, hapus tombol dan selebrasi menang
            if (score >= targetScore) {
                const currentBtn = document.getElementById('cheatLvl1');
                if (currentBtn) currentBtn.remove();
                endLevel1();
            }
        });
    }
    
    initInterval(1000);

    function initInterval(rate) {
        if (isGameOver) return;
        clearInterval(gameInterval);
        gameInterval = setInterval(spawnWish, rate);
    }

    function spawnWish() {
        if (score >= targetScore || isGameOver) {
            clearInterval(gameInterval);
            return;
        }

        const wish = document.createElement('div');
        wish.classList.add('wish');
        
        const randomText = wishes[Math.floor(Math.random() * wishes.length)];
        wish.innerText = randomText;

        const areaWidth = gameArea.offsetWidth;
        const randomX = Math.random() * (areaWidth - 160);
        wish.style.left = `${Math.max(10, randomX)}px`;

        let fallDuration;
        if (score < 11) {
            fallDuration = Math.random() * 1 + 2.5; 
        } else if (score < 22) {
            fallDuration = Math.random() * 0.8 + 2.0; 
        } else if (score < 33) {
            fallDuration = Math.random() * 0.6 + 1.6; 
        } else if (score < 44) {
            fallDuration = Math.random() * 0.5 + 1.2; 
        } else if (score < 55) {
            fallDuration = Math.random() * 0.4 + 0.9; 
        } else {
            fallDuration = Math.random() * 0.4 + 0.8; 
        }

        wish.style.animation = `fall ${fallDuration}s linear forwards`;

        wish.addEventListener('touchstart', (e) => handleCatch(e, wish));
        wish.addEventListener('mousedown', (e) => handleCatch(e, wish));

        gameArea.appendChild(wish);

        setTimeout(() => {
            if (wish.parentNode === gameArea && !wish.classList.contains('popped') && !isGameOver) {
                gameArea.removeChild(wish);
                
                missed++;
                missedVal.innerText = `${missed} / ${maxMissed}`;

                if (missed >= maxMissed) {
                    triggerGameOver();
                }
            }
        }, fallDuration * 1000);
    }

    function handleCatch(e, element) {
        e.preventDefault(); 
        if (isGameOver || element.classList.contains('popped')) return;
        
        element.classList.add('popped');
        score++;
        scoreVal.innerText = score;

        if (navigator.vibrate) {
            navigator.vibrate(25); 
        }

        const rect = element.getBoundingClientRect();
        const areaRect = gameArea.getBoundingClientRect();
        const clickX = rect.left - areaRect.left + (rect.width / 2);
        const clickY = rect.top - areaRect.top + (rect.height / 2);

        createHeartExplosion(clickX, clickY);

        if (score === 11) initInterval(850);
        else if (score === 22) initInterval(700);
        else if (score === 33) initInterval(550);
        else if (score === 44) initInterval(400); 
        else if (score === 55) initInterval(300); 

        if (element.parentNode === gameArea) {
            gameArea.removeChild(element);
        }

        if (score >= targetScore) {
            endLevel1();
        }
    }

    function createHeartExplosion(x, y) {
        const icons = ["❤️", "💖", "✨", "🌸", "🥰"];
        const particleCount = 12;

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.innerText = icons[Math.floor(Math.random() * icons.length)];
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 90 + 45; 
            const targetX = Math.cos(angle) * velocity;
            const targetY = Math.sin(angle) * velocity;

            p.style.setProperty('--x', `${targetX}px`);
            p.style.setProperty('--y', `${targetY}px`);

            gameArea.appendChild(p);

            setTimeout(() => {
                if (p.parentNode === gameArea) gameArea.removeChild(p);
            }, 600);
        }
    }

    function triggerGameOver() {
        isGameOver = true;
        clearInterval(gameInterval);
        gameArea.innerHTML = `
            <div style="display:flex; height:100%; align-items:center; justify-content:center; flex-direction:column; color:#757575; font-weight:700; font-size:1.4rem; padding:20px; text-align:center;">
                💔 Yah, Harapannya Banyak yang Lolos... 💔<br>
                <span style="font-size:1rem; color:#666; font-weight:400; margin-top:10px; margin-bottom:20px;">
                    Jangan menyerah ya sayang, coba fokus lagi tangkap doanya! 🥰
                </span>
                <button id="retryBtn">Coba Lagi ❤️</button>
            </div>
        `;
        
        document.getElementById('retryBtn').addEventListener('click', () => {
            window.startLevel1();
        });
    }

    function endLevel1() {
		const b = document.getElementById('cheatLvl1');
        if (b) b.remove();
		
        clearInterval(gameInterval);
        gameArea.innerHTML = ''; // Bersihkan layar game

        // Panggil fungsi modal global di app.js (Icon, Judul, Ucapan, Target Level)
        if (typeof window.showGlobalGamePopup === 'function') {
            window.showGlobalGamePopup(
                "🎉", 
                "YEAYYY SAYANGGG!", 
                "Kamu berhasil menangkap semua harapannya! 🥰❤️ Sama seperti kamu yang berhasil menangkap hatiku dan sampai sekarang belum mau mengembalikannya 😘", 
                2 // Membuka Level 2 otomatis saat tombol popup di-klik
            );
        }
    }
};