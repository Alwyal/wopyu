// Global State - Bisa diakses oleh file game1.js, game2.js, dll.
window.currentUnlockedLevel = 1;

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // LOGIKA WELCOME GATE UNTUK MEMICU AUTOPLAY MUSIK (ANTI-BLOCK BROWSER)
    // =========================================================================
    const welcomeGate = document.getElementById('welcomeGate');
    const openWelcomeGateBtn = document.getElementById('openWelcomeGateBtn');
    const globalAudio = document.getElementById('bgMusic');
    const musicBubble = document.getElementById('musicBubble');

    if (openWelcomeGateBtn && welcomeGate) {
        openWelcomeGateBtn.addEventListener('click', () => {
            // Sembunyikan popup Welcome Gate dengan efek transisi/hilang
            welcomeGate.style.display = 'none';

            // Pemicu paksa audio agar langsung berputar otomatis (Aman dari Autoplay Policy)
            if (globalAudio) {
                globalAudio.play().then(() => {
                    window.isMusicPlaying = true; // Sinkronkan status musik menyala
                    if (musicBubble) musicBubble.classList.add('playing');
                    
                    // Set tombol play/pause di modal player ke mode pause (⏸️) karena lagu menyala
                    const playPauseBtn = document.getElementById('playPauseTrackBtn');
                    if (playPauseBtn) playPauseBtn.innerText = "⏸️";
                }).catch(err => {
                    console.log("Gagal memutar audio otomatis, browser masih memblokir:", err);
                });
            }
        });
    }

    // Element Selector Screens
    const introScreen = document.getElementById('intro');
    const journeyScreen = document.getElementById('journey');
    const game1Screen = document.getElementById('game1-screen');
    const game2Screen = document.getElementById('game2-screen'); // <-- Tambahan Selector Screen Game 2

    // Buttons
    const startBtn = document.getElementById('startBtn');
    const backToJourneyBtn = document.getElementById('backToJourneyBtn');
    const backToJourneyBtn2 = document.getElementById('backToJourneyBtn2'); // <-- Tambahan Selector Tombol Back Game 2

    // Navigasi: Intro -> Journey
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            introScreen.classList.remove('active');
            journeyScreen.classList.add('active');

            const music = document.getElementById('bgMusic');
            if (music) {
                music.volume = 0.4; 
                music.play().catch(error => {
                    console.log("Autoplay musik dicegah oleh browser, akan berputar setelah interaksi berikutnya:", error);
                });
            }
        });
    }

    // Masuk ke Game Level 1 (Wish Catcher)
    const lvl1Btn = document.getElementById('lvl1');
    if (lvl1Btn) {
        lvl1Btn.addEventListener('click', function() {
            if (this.classList.contains('unlocked')) {
                journeyScreen.classList.remove('active');
                game1Screen.classList.add('active');
                
                // Memanggil fungsi start game 1 yang ada di file game1.js
                if (typeof window.startLevel1 === 'function') {
                    window.startLevel1(); 
                }
            }
        });
    }

    // Tombol Kembali dari Game 1 ke Menu Journey
    if (backToJourneyBtn) {
        backToJourneyBtn.addEventListener('click', () => {
            game1Screen.classList.remove('active');
            journeyScreen.classList.add('active');
        });
    }

    // ==========================================
    // LOGIKA NAVIGASI GAME LEVEL 2
    // ==========================================
    const lvl2Btn = document.getElementById('lvl2');
    if (lvl2Btn) {
        lvl2Btn.addEventListener('click', function() {
            if (this.classList.contains('unlocked')) {
                journeyScreen.classList.remove('active');
                game2Screen.classList.add('active');
                
                // Memanggil fungsi start game 2 yang ada di file game2.js
                if (typeof window.startLevel2 === 'function') {
                    window.startLevel2(); 
                }
            }
        });
    }

    // Tombol Kembali dari Game 2 ke Menu Journey
    if (backToJourneyBtn2) {
        backToJourneyBtn2.addEventListener('click', () => {
            game2Screen.classList.remove('active');
            journeyScreen.classList.add('active');
        });
    }

    // Pilih Misi Level 3
    const lvl3Btn = document.getElementById('lvl3');
    const game3Screen = document.getElementById('game3-screen');
    const backToJourneyBtn3 = document.getElementById('backToJourneyBtn3');

    if (lvl3Btn) {
        lvl3Btn.addEventListener('click', function() {
            if (this.classList.contains('unlocked')) {
                journeyScreen.classList.remove('active');
                game3Screen.classList.add('active');
                
                if (typeof window.startLevel3 === 'function') {
                    window.startLevel3(); 
                }
            }
        });
    }

    // Tombol Kembali dari Game 3 ke Menu Journey
    if (backToJourneyBtn3) {
        backToJourneyBtn3.addEventListener('click', () => {
            game3Screen.classList.remove('active');
            journeyScreen.classList.add('active');
        });
    }

    // Pilih Misi Level 4
    const lvl4Btn = document.getElementById('lvl4');
    const game4Screen = document.getElementById('game4-screen');
    const backToJourneyBtn4 = document.getElementById('backToJourneyBtn4');

    if (lvl4Btn) {
        lvl4Btn.addEventListener('click', function() {
            if (this.classList.contains('unlocked')) {
                journeyScreen.classList.remove('active');
                game4Screen.classList.add('active');
                
                if (typeof window.startLevel4 === 'function') {
                    window.startLevel4(); 
                }
            }
        });
    }

    // Tombol Kembali dari Game 4 ke Menu Journey
    if (backToJourneyBtn4) {
        backToJourneyBtn4.addEventListener('click', () => {
            game4Screen.classList.remove('active');
            journeyScreen.classList.add('active');
        });
    }

    // Pilih Misi Level 5
    const lvl5Btn = document.getElementById('lvl5');
    const game5Screen = document.getElementById('game5-screen');
    const backToJourneyBtn5 = document.getElementById('backToJourneyBtn5');

    if (lvl5Btn) {
        lvl5Btn.addEventListener('click', function() {
            if (this.classList.contains('unlocked')) {
                journeyScreen.classList.remove('active');
                game5Screen.classList.add('active');
                
                if (typeof window.startLevel5 === 'function') {
                    window.startLevel5(); 
                }
            }
        });
    }

    // Tombol Kembali dari Game 5 ke Menu Journey
    if (backToJourneyBtn5) {
        backToJourneyBtn5.addEventListener('click', () => {
            game5Screen.classList.remove('active');
            journeyScreen.classList.add('active');
        });
    }

    // Pilih Misi Level 6 (Kado Terakhir)
    const lvl6Btn = document.getElementById('lvl6');
    const game6Screen = document.getElementById('game6-screen');
    const backToJourneyBtn6 = document.getElementById('backToJourneyBtn6');

    if (lvl6Btn) {
        lvl6Btn.addEventListener('click', function() {
            if (this.classList.contains('unlocked')) {
                journeyScreen.classList.remove('active');
                game6Screen.classList.add('active');
                
                if (typeof window.startLevel6 === 'function') {
                    window.startLevel6(); 
                }
            }
        });
    }

    // Tombol Kembali dari Game 6 ke Menu Journey
    if (backToJourneyBtn6) {
        backToJourneyBtn6.addEventListener('click', () => {
            game6Screen.classList.remove('active');
            journeyScreen.classList.add('active');
        });
    }
});

window.updateLevelStatus = function() {
    for (let i = 1; i <= 6; i++) {
        const lvlBtn = document.getElementById(`lvl${i}`);
        if (lvlBtn) {
            if (i <= window.currentUnlockedLevel) {
                lvlBtn.classList.add('unlocked');
                lvlBtn.classList.remove('locked');
            } else {
                lvlBtn.classList.remove('unlocked');
                lvlBtn.classList.add('locked');
            }
        }
    }
};

const playlist = [
    { title: "🎵 Selamat Ulang Tahun", src: "audio/HBD.mp3" },
    { title: "🎵 Gelora Asmara", src: "audio/GeloraAsmara.mp3" },
    { title: "🎵 Tekomu", src: "audio/TEKOMU.mp3" }
];

let currentTrackIndex = 0;
let isMusicPlaying = false;

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById('bgMusic');
    const bubble = document.getElementById('musicBubble');
    const musicModal = document.getElementById('musicModal');
    const closeMusicModalBtn = document.getElementById('closeMusicModalBtn');
    
    const trackTitleDisplay = document.getElementById('currentTrackTitle');
    const playPauseBtn = document.getElementById('playPauseTrackBtn');
    const prevBtn = document.getElementById('prevTrackBtn');
    const nextBtn = document.getElementById('nextTrackBtn');
    const startBtn = document.getElementById('startBtn'); // Tombol Mulai Game Awal

    // Load lagu pertama ke dalam source audio
    if (audio && playlist.length > 0) {
        audio.src = playlist[currentTrackIndex].src;
        audio.volume = 0.4;
        trackTitleDisplay.innerText = playlist[currentTrackIndex].title;
    }

    function loadAndPlayTrack(index) {
        audio.src = playlist[index].src;
        trackTitleDisplay.innerText = playlist[index].title;
        if (isMusicPlaying) {
            audio.play().catch(e => console.log(e));
        }
    }

    // Aksi Putar Otomatis saat pertama kali Dinda klik "Mulai Game"
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (!isMusicPlaying) {
                isMusicPlaying = true;
                audio.play().then(() => {
                    bubble.classList.add('playing');
                }).catch(err => console.log("Autoplay ditahan:", err));
            }
        });
    }

    // Klik Gelembung -> Buka Popup Pemutar Musik
    if (bubble) {
        bubble.addEventListener('click', () => {
            musicModal.classList.remove('hidden');
        });
    }

    // Tutup Popup Pemutar Musik
    if (closeMusicModalBtn) {
        closeMusicModalBtn.addEventListener('click', () => {
            musicModal.classList.add('hidden');
        });
    }

    // Tombol PLAY / PAUSE di dalam Popup
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                isMusicPlaying = true;
                playPauseBtn.innerText = "⏸️";
                bubble.classList.add('playing');
            } else {
                audio.pause();
                isMusicPlaying = false;
                playPauseBtn.innerText = "▶️";
                bubble.classList.remove('playing');
            }
        });
    }

    // Tombol NEXT (Lagu Selanjutnya)
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadAndPlayTrack(currentTrackIndex);
            playPauseBtn.innerText = "⏸️";
        });
    }

    // Tombol PREV (Lagu Sebelumnya)
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            loadAndPlayTrack(currentTrackIndex);
            playPauseBtn.innerText = "⏸️";
        });
    }

    // Otomatis pindah lagu berikutnya kalau durasi lagu habis
    if (audio) {
        audio.onended = function() {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            loadAndPlayTrack(currentTrackIndex);
        };
    }
});

// Fungsi Global Popup untuk Menang di Setiap Level (1-4)
window.showGlobalGamePopup = function(icon, title, message, nextLevel) {
    const modal = document.getElementById('globalGameModal');
    const modalIcon = document.getElementById('globalModalIcon');
    const modalTitle = document.getElementById('globalModalTitle');
    const modalText = document.getElementById('globalModalText');
    const modalBtn = document.getElementById('globalModalCloseBtn');

    if (!modal) return;

    // Isi konten secara dinamis
    modalIcon.innerText = icon;
    modalTitle.innerText = title;
    modalText.innerText = message;
    modal.classList.remove('hidden');

    // Aksi ketika tombol popup diklik oleh Dinda
    modalBtn.onclick = function() {
        modal.classList.add('hidden');

        // 1. Jalankan buka gembok level berikutnya di sistem
        if (window.currentUnlockedLevel < nextLevel) {
            window.currentUnlockedLevel = nextLevel;
            if (typeof window.updateLevelStatus === 'function') {
                window.updateLevelStatus();
            }
        }

        // 2. Otomatis tendang balik ke halaman peta utama (Birthday Journey)
        // Cari screen level mana yang lagi aktif, lalu matikan kelas active-nya
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen) {
            activeScreen.classList.remove('active');
        }

        // Munculkan kembali halaman Journey utama
        const journeyScreen = document.getElementById('journey');
        if (journeyScreen) {
            journeyScreen.classList.add('active');
        }
    };
};

// =========================================================================
// GLOBAL CHEAT MANAGEMENT SYSTEM 
// =========================================================================
window.isCheatUnlocked = false; // Status awal cheat terkunci

window.bukaAksesCheatGlobal = function() {
    // 1. Ambil semua selector modal kustom dari DOM
    const pinModal = document.getElementById('cheatPinModal');
    const pinInput = document.getElementById('cheatPinInput');
    const submitBtn = document.getElementById('submitPinBtn');
    const cancelBtn = document.getElementById('cancelPinBtn');
    
    if (!pinModal || !pinInput || !submitBtn || !cancelBtn) return;

    // Selector komponen internal modal untuk mengubah konten secara dinamis
    const modalIcon = pinModal.querySelector('.maze-modal-icon');
    const modalTitle = pinModal.querySelector('h3');
    const modalText = pinModal.querySelector('p');

    // --- KONDISI A: JIKA CHEAT SUDAH AKTIF ---
    if (window.isCheatUnlocked) {
        if (modalIcon) modalIcon.innerText = "🥰";
        if (modalTitle) {
            modalTitle.innerText = "Sudah Aktif! ❤️";
            modalTitle.style.color = "#ff4d88";
        }
        if (modalText) modalText.innerText = "Status: Mode Developer sudah aktif, Alwy! Tinggal meluncur ke level game yaa~";
        
        pinInput.style.display = 'none'; // Sembunyikan input karena sudah aktif
        submitBtn.style.display = 'none'; // Sembunyikan tombol verifikasi
        cancelBtn.innerText = "Oke Sayang 🌸"; // Ubah teks tombol batal jadi oke
        
        pinModal.classList.remove('hidden');
        cancelBtn.onclick = function() { pinModal.classList.add('hidden'); };
        return;
    }

    // --- KONDISI B: NORMAL INPUT (BELUM AKTIF) ---
    // FIX UTAMA: Bersihkan typo .style.style dan kembalikan semua display ke normal (block/flex)
    if (modalIcon) modalIcon.innerText = "🔒";
    if (modalTitle) {
        modalTitle.innerText = "Mode Developer";
        modalTitle.style.color = "#ff4d88";
    }
    if (modalText) modalText.innerText = "Masukkan PIN Rahasia Mas Alwy untuk membuka fitur rahasia:";
    
    pinInput.style.display = 'block';
    submitBtn.style.display = 'block';
    cancelBtn.innerText = "Batal 🌸";

    // Munculkan modal kustom ke layar & fokus ke input
    pinModal.classList.remove('hidden');
    pinInput.value = '';
    pinInput.focus();

    // Logika Aksi: Tombol Verifikasi Ditekan
    submitBtn.onclick = function() {
        prosesValidasiPIN();
    };

    // Dukungan PC: Tekan tombol 'Enter' langsung memproses input
    pinInput.onkeydown = function(e) {
        if (e.key === 'Enter') {
            prosesValidasiPIN();
        }
    };

    // Logika Aksi: Tombol Batal/Tutup Ditekan
    cancelBtn.onclick = function() {
        pinModal.classList.add('hidden');
    };

    // Fungsi internal pemrosesan validasi PIN tanpa ALERT browser
    function prosesValidasiPIN() {
        if (pinInput.value === "16062008") {
            window.isCheatUnlocked = true;
            
            // TAMPILKAN STATE SUKSES DI DALAM MODAL
            if (modalIcon) modalIcon.innerText = "🔓";
            if (modalTitle) {
                modalTitle.style.color = "#00e676"; // Judul jadi hijau sukses
                modalTitle.innerText = "Sukses! 😎⚡";
            }
            if (modalText) modalText.innerText = "Mode Cheat Berhasil Diaktifkan! Semua tombol skip di level game sudah terbuka.";
            
            pinInput.style.display = 'none';
            submitBtn.style.display = 'none';
            cancelBtn.innerText = "Gaskeunnn 🚀";
            
            // Ubah ikon gembok di peta utama menjadi terbuka hijau sukses
            const secretBtn = document.getElementById('secretCheatTrigger');
            if (secretBtn) {
                secretBtn.innerText = "🔓";
                secretBtn.style.background = "linear-gradient(135deg, #00e676, #2b9348)";
                secretBtn.style.color = "#ffffff";
                secretBtn.style.boxShadow = "0 4px 15px rgba(0, 230, 118, 0.4)";
            }

            // Saat tombol "Gaskeunnn" diklik, baru tutup modal dan refresh game screen
            cancelBtn.onclick = function() {
                pinModal.classList.add('hidden');
                
                // Auto refresh screen aktif jika ada
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen) {
                    if (activeScreen.id === 'game1-screen' && typeof window.startLevel1 === 'function') window.startLevel1();
                    if (activeScreen.id === 'game2-screen' && typeof window.startLevel2 === 'function') window.startLevel2();
                    if (activeScreen.id === 'game3-screen' && typeof window.startLevel3 === 'function') window.startLevel3();
                    if (activeScreen.id === 'game4-screen' && typeof window.startLevel4 === 'function') window.startLevel4();
                    if (activeScreen.id === 'game5-screen' && typeof window.startLevel5 === 'function') window.startLevel5();
                }
            };
        } else {
            // TAMPILKAN STATE ERROR DI DALAM MODAL (PIN SALAH)
            if (modalIcon) modalIcon.innerText = "😡";
            if (modalTitle) {
                modalTitle.style.color = "#ff1744"; // Judul jadi merah eror
                modalTitle.innerText = "PIN Salah! ❌";
            }
            if (modalText) modalText.innerText = "Kamu bukan Alwy ya? Ngaku! Jangan coba-coba tebak komitmen kita! 🔨";
            
            pinInput.value = '';
            pinInput.focus();
            
            if (navigator.vibrate) navigator.vibrate([50, 50]);
        }
    }
};

// =========================================================================
// SAKTI HELPER: RENDER TOMBOL SKIP BULAT OVAL MINIMALIS (PC & HP)
// =========================================================================
window.buatTombolSkipAesthetic = function(idTombol, containerTarget, fungsiEksekusi) {
    if (!window.isCheatUnlocked) return; // Jangan buat jika cheat belum aktif

    // Bersihkan sisa tombol lama jika ada
    const oldBtn = document.getElementById(idTombol);
    if (oldBtn) oldBtn.remove();

    // Buat element tombol baru
    const skipBtn = document.createElement('button');
    skipBtn.id = idTombol;
    skipBtn.innerText = "? Skip"; // Teks dipangkas menjadi super pendek agar rapi di HP
    
    // Desain CSS Bulat Oval Minimalis, ukuran presisi, responsif PC & HP
    skipBtn.style.cssText = `
        position: fixed; 
        bottom: 20px; 
        left: 20px; 
        background: linear-gradient(135deg, #78909c, #4f5b66); 
        color: white; 
        border: none; 
        padding: 10px 20px; 
        border-radius: 50px; 
        font-weight: bold; 
        font-size: 0.85rem; 
        cursor: pointer; 
        z-index: 99999; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        max-width: 90px;
        text-align: center;
        transition: transform 0.2s;
    `;

    // Efek interaksi hover/click
    skipBtn.onmouseenter = () => skipBtn.style.transform = "scale(1.05)";
    skipBtn.onmouseleave = () => skipBtn.style.transform = "scale(1)";

    // FIX UTAMA MULTI-PLATFORM: Gabungkan event Desktop (click) dan Mobile (touchstart)
    skipBtn.onclick = function(e) {
        e.preventDefault();
        fungsiEksekusi();
    };
    skipBtn.ontouchstart = function(e) {
        e.preventDefault();
        fungsiEksekusi();
    };

    // Tempelkan langsung ke body agar posisinya mutlak mengunci di pojok kiri bawah layar
    document.body.appendChild(skipBtn);
};