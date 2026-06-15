window.startLevel5 = function() {
    const quizBox = document.getElementById('quizBox');
    const quizProgress = document.getElementById('quizProgress');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const finishLevel5Btn = document.getElementById('finishLevel5Btn');

    // Selector Popup Modal Kuis
    const quizModal = document.getElementById('quizModal');
    const quizModalIcon = document.getElementById('quizModalIcon');
    const quizModalText = document.getElementById('quizModalText');
    const quizModalCloseBtn = document.getElementById('quizModalCloseBtn');

    const quizHeader = document.getElementById('quizHeader');
    if (quizHeader) {
        quizHeader.innerHTML = `
            <h2>🤨 Ujian Kelayakan 🤨</h2>
            <p style="color: white; margin-bottom: 20px; font-size: 0.9rem;">
                Jawab dengan jujur dan hati-hati! Salah satu kali? Hukuman mati menantimu! 💀
            </p>
        `;
    }

    // Pastikan Box Pertanyaan tampil kembali saat game di-start ulang
    if (quizBox) quizBox.style.display = 'block';

    // =========================================================================
    // DATA 6 PERTANYAAN REAL DENGAN JAWABAN MENGECOH
    // =========================================================================
    const quizData = [
        {
            question: "Tanggal berapa sih kita resmi jadian? 🗓️",
            options: ["14 November 2025", "5 April 2026", "6 April 2026", "5 Mei 2026"],
            correct: 1,
            sweetMsg: "Pinter banget! Untung kamu gak lupa tanggal 5 April 2026, kalau lupa bisa aku coret dari kartu keluarga kita nanti, hehe. 🥰"
        },
        {
            question: "Awal mula kita kenal dan takdir mempertemukan kita itu dari mana? 📱",
            options: ["Instagram DM", "Grup WhatsApp", "Anon Telegram", "Tinder/Michat"],
            correct: 2,
            sweetMsg: "Bener! Berawal dari Telegram, chat-chat random yang berujung jadi baper selamanya. Makasih ya Telegram! 🌀"
        },
        {
            question: "Dari semua keinginan di dunia, apa hal yang PALING kita mau saat ini? 🥺",
            options: ["Ketemu & Melepas Rindu", "Jalan-jalan ke Maldiv", "Beli Mobil Baru", "Makan Mewah di Resto"],
            correct: 0,
            sweetMsg: "Iyaa sayang, bener banget... yang paling aku mau cuma cepet-cepet KETEMU kamu langsung. Kangennya udah gak bisa ditampung lagi tahu! 😭❤️"
        },
        {
            question: "Coba tebak, warna apa yang paling jadi favorit aku? 🎨",
            options: ["Merah Marun", "Pink Merona", "Biru Langit/Biru", "Hitam Misterius"],
            correct: 2,
            sweetMsg: "Cieee bener, warna favorit aku itu Biru! Kamu emang paling tahu luar dalamnya aku deh. 😘"
        },
        {
            question: "Aku tuh paling gampang sedikit kesal atau rewel kalau kamu...? 😡",
            options: ["Balas chatnya singkat", "Keseringan makan pedas", "Lupa ngabarin seharian", "Main game terus-terusan"],
            correct: 1,
            sweetMsg: "Nah tahu! Aku rewel kesal karena aku sayang sama lambung kamu, jadi tolong dengerin ya: JANGAN KESERINGAN MAKAN PEDAS! Lindungi ususmu sayang. 😤❤️"
        },
        {
            question: "Siapa orang paling ganteng, manis, dan paling beruntung sedunia karena punya kamu?",
            options: ["Artis Korea Populer", "Karakter Anime Tampan", "Always Alwy", "Mantan pacarmu dulu"],
            correct: 2,
            sweetMsg: "WKWK bener 1000%! Cowok paling beruntung dan manis itu cuma Alwy seorang! Gak ada duanya di bumi ini! 👑👑👑"
        }
    ];

    const angryMessages = [
        "IH KOK SALAH?! 😡 Kamu gak inget momen ini? Pokoknya gak mau tahu, kamu aku hukum detensi! Balik lagi ke LEVEL 1 sono buat merenung! Bye! 😤🔨",
        "ASTAGFIRULLAH TEGA BANGET SALAH! 😭 Masa jawaban yang ini kamu gak tahu sih? Fiks aku ngambek 5 menit! Sana balik belajar lagi dari LEVEL 1! 😾🎒",
        "Hih! Jawabannya ngawur banget! 😤 Ketahuan nih memorinya butuh di-restart. Rasakan serangan balik ke LEVEL 1! Jangan balik sebelum khatam ya! 🔂💔",
        "Salah, ihhh! Gemes deh pengen cubit! 🤏 Masa kenangan manis kita dilupain gitu aja sih? Sana pulang ke LEVEL 1 dulu, hafalin lagi sejarah kita! 😾🏃‍♀️"
    ];

    let currentQuestionIndex = 0;
    let isCorrectAnswer = false; 

    if (finishLevel5Btn) finishLevel5Btn.classList.add('hidden');
    if (quizModal) quizModal.classList.add('hidden');
    currentQuestionIndex = 0;

    function loadQuestion() {
        if (currentQuestionIndex < quizData.length) {
            const currentQuiz = quizData[currentQuestionIndex];
            quizProgress.innerText = `Pertanyaan ${currentQuestionIndex + 1}/${quizData.length}`;
            quizQuestion.innerText = currentQuiz.question;
            quizOptions.innerHTML = '';

            currentQuiz.options.forEach((option, idx) => {
                const btn = document.createElement('button');
                btn.classList.add('quiz-opt-btn');
                btn.innerText = option;
                btn.onclick = () => checkAnswer(idx, btn);
                quizOptions.appendChild(btn);
            });
        } else {
            if (quizBox) quizBox.style.display = 'none';

            // Ganti total tulisan "Ujian Kelayakan" dan "Hukuman Mati" menjadi perayaan meriah!
            const quizHeader = document.getElementById('quizHeader');
            if (quizHeader) {
                // FIX: Menambahkan Canvas khusus kembang api tepat di dalam header selebrasi
                quizHeader.innerHTML = `
                    <div style="position: relative; text-align: center; margin-top: 20px; width: 100%;">
                        <canvas id="fireworksCanvas" style="position: absolute; top: -50px; left: 0; width: 100%; height: 350px; pointer-events: none; z-index: 1;"></canvas>
                        
                        <div style="position: relative; z-index: 2;">
                            <h2 style="font-size: 1.8rem; margin-bottom: 10px; color: #fff; text-shadow: 0 0 10px #ff4d88;">
                                YAAAY SAYANGKUUUU!
                            </h2>
                            
                            <div style="font-size: 1.6rem; margin-bottom: 15px;">
                                👑🥰💖✨🐣🎀
                            </div>

                            <p style="color: #fff; font-weight: 700; font-size: 1.1rem; line-height: 1.6; text-shadow: 1px 1px 4px rgba(0,0,0,0.3); margin-bottom: 30px; padding: 0 10px;">
                                Yeayy!! Kamu berhasil LULUS dengan nilai sempurna 100% 😚💯<br>
                                Kamu resmi jadi pacar paling gemes, paling baik, dan paling spesial seduniaa 💕✨<br>
                                Sekarang nggak ada lagi hukuman yaa~ yang ada cuma pelukan manis dan hadiah spesial buat kamu 🥺💗🎁
                            </p>
                        </div>
                    </div>
                `;
                
                // Pemicu Mesin Kembang Api
                startFireworks();
            }

            // Munculkan tombol submit kado dengan efek bersinar hijau estetik
            if (finishLevel5Btn) {
                finishLevel5Btn.classList.remove('hidden');
                finishLevel5Btn.style.cssText = "display: block; width: 100%; max-width: 280px; margin: 20px auto; background: linear-gradient(135deg, #00e676, #28a745); color: white; border: none; padding: 15px; border-radius: 50px; font-weight: bold; font-size: 1.05rem; cursor: pointer; box-shadow: 0 0 20px #00e676; animation: pulseCrown 0.8s infinite alternate; position: relative; z-index: 2;";
                finishLevel5Btn.innerHTML = "✨ PILIH KADO YUUU! 🎁✨";
                finishLevel5Btn.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    function checkAnswer(selectedIndex, buttonElement) {
        const currentQuiz = quizData[currentQuestionIndex];
        const allButtons = quizOptions.querySelectorAll('.quiz-opt-btn');
        allButtons.forEach(btn => btn.style.pointerEvents = 'none'); 

        if (selectedIndex === currentQuiz.correct) {
            isCorrectAnswer = true;
            buttonElement.classList.add('correct');
            if (navigator.vibrate) navigator.vibrate(30);

            setTimeout(() => {
                showQuizPopup("🥰", currentQuiz.sweetMsg, "Lanjut Soal Berikutnya ❤️");
            }, 400);

        } else {
            isCorrectAnswer = false;
            buttonElement.classList.add('wrong');
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

            const randomAngryMsg = angryMessages[Math.floor(Math.random() * angryMessages.length)];
            
            setTimeout(() => {
                showQuizPopup("😡", randomAngryMsg, "Ulangi dari Level 1 (Pasrah) 😭💔");
            }, 400);
        }
    }

    function showQuizPopup(icon, text, buttonText) {
        if (!quizModal) return;
        quizModalIcon.innerText = icon;
        quizModalText.innerText = text;
        quizModalCloseBtn.innerText = buttonText;
        quizModal.classList.remove('hidden');
    }

    if (quizModalCloseBtn) {
        quizModalCloseBtn.onclick = function() {
            quizModal.classList.add('hidden');

            if (isCorrectAnswer) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                kickToLevel1();
            }
        };
    }

    function kickToLevel1() {
        window.currentUnlockedLevel = 1;

        if (typeof window.updateLevelStatus === 'function') {
            window.updateLevelStatus();
        }

        const game5Screen = document.getElementById('game5-screen');
        if (game5Screen) game5Screen.classList.remove('active');

        const game1Screen = document.getElementById('game1-screen');
        if (game1Screen) {
            game1Screen.classList.add('active');
            if (typeof window.startLevel1 === 'function') {
                window.startLevel1();
            }
        }

        const music = document.getElementById('bgMusic');
        if (music) music.volume = 0.1;
    }

    if (finishLevel5Btn) {
        finishLevel5Btn.onclick = function() {
			const b = document.getElementById('cheatLvl5');
            if (b) b.remove()
			
            // 1. Tetap buka gembok Level 6 di sistem agar status tersimpan aman
            window.currentUnlockedLevel = 6;
            if (typeof window.updateLevelStatus === 'function') {
                window.updateLevelStatus();
            }

            // 2. Sembunyikan layar kuis Level 5 yang aktif
            const game5Screen = document.getElementById('game5-screen');
            if (game5Screen) {
                game5Screen.classList.remove('active');
            }

            // 3. LANGSUNG AKTIFKAN & JALANKAN LEVEL 6 (Kado Utama)!
            const game6Screen = document.getElementById('game6-screen');
            if (game6Screen) {
                game6Screen.classList.add('active');
                
                // Memicu fungsi inisialisasi kado utama di game6.js otomatis
                if (typeof window.startLevel6 === 'function') {
                    window.startLevel6();
                }
            }
        };
    }

    loadQuestion();
	
	// === REVISI CHEAT LEVEL 5 ===
    const oldCheat5 = document.getElementById('cheatLvl5');
    if (oldCheat5) oldCheat5.remove();

    if (window.isCheatUnlocked) {
        const cheatBtn5 = document.createElement('button');
        cheatBtn5.id = 'cheatLvl5';
        cheatBtn5.innerText = "⚡ Skip Soal";
        cheatBtn5.style.cssText = "position: fixed; bottom: 20px; left: 20px; background: linear-gradient(135deg, #6c757d, #495057); color: white; border: none; padding: 10px 18px; border-radius: 50px; font-weight: bold; font-size: 0.8rem; cursor: pointer; z-index: 9999; box-shadow: 0 4px 10px rgba(0,0,0,0.3);";
        
        cheatBtn5.onclick = function() {
            if (currentQuestionIndex < quizData.length) {
                const currentQuiz = quizData[currentQuestionIndex];
                isCorrectAnswer = true;
                showQuizPopup("🥰", currentQuiz.sweetMsg, "Lanjut Soal Berikutnya ❤️");
                if (currentQuestionIndex === quizData.length - 1) {
                    cheatBtn5.remove();
                }
            }
        };
        document.body.appendChild(cheatBtn5);
    }

    function startFireworks() {
        const canvas = document.getElementById('fireworksCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        canvas.width = canvas.parentNode.offsetWidth || 360;
        canvas.height = 350;

        let particles = [];
        const colors = ['#ff4d88', '#00e676', '#00b0ff', '#ffeb3b', '#ff758c', '#ffffff'];

        function createExplosion() {
            // Tentukan titik tengah ledakan acak di area canvas
            const targetX = Math.random() * canvas.width;
            const targetY = Math.random() * (canvas.height - 100) + 50;
            const chosenColor = colors[Math.floor(Math.random() * colors.length)];

            for (let i = 0; i < 30; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 4 + 2;
                particles.push({
                    x: targetX,
                    y: targetY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    radius: Math.random() * 2 + 1,
                    color: chosenColor,
                    alpha: 1,
                    decay: Math.random() * 0.015 + 0.015
                });
            }
        }

        // Loop Animasi Menggambar Kembang Api
        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Munculkan ledakan baru secara berkala
            if (Math.random() < 0.05 && particles.length < 150) {
                createExplosion();
            }

            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.04; // Gravitasi kecil efek jatuh remang-remang
                p.alpha -= p.decay;

                if (p.alpha <= 0) {
                    particles.splice(idx, 1);
                } else {
                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = p.color;
                    ctx.fill();
                    ctx.restore();
                }
            });

            requestAnimationFrame(loop);
        }

        // Jalankan ledakan pertama kali
        createExplosion();
        loop();
    }
};