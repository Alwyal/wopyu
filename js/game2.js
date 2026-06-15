window.startLevel2 = function() {
    const memoryBoard = document.getElementById('memoryBoard');
    const backToJourneyBtn2 = document.getElementById('backToJourneyBtn2');
    
    const photos = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    
    let flippedCards = [];
    let matchedPairs = 0;
    let lockBoard = false;

    // Reset Awal
    memoryBoard.innerHTML = '';
    memoryBoard.style.gridTemplateColumns = "repeat(4, 1fr)"; 
    if (backToJourneyBtn2) backToJourneyBtn2.classList.add('hidden');
    matchedPairs = 0;
    flippedCards = [];
    lockBoard = false;

    // Acak Posisi Foto
    shuffle(photos);

    // Generate Kartu ke DOM
    photos.forEach((photoId) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.photoId = photoId; 

        card.innerHTML = `
            <div class="card-front">
                <img src="img/${photoId}.jpg" alt="Kenangan ${photoId}">
            </div>
            <div class="card-back">❓</div>
        `;

        card.addEventListener('click', flipCard);
        memoryBoard.appendChild(card);
    });
	
	// =========================================================================
    // CODE CHEAT LEVEL 2 (STEP-BY-STEP PASANG 1 PASANG KARTU + PIN PROTECTION)
    // =========================================================================
    // 1. Bersihkan tombol lama jika ada agar tidak duplikat saat game di-restart
    const oldCheat2 = document.getElementById('cheatLvl2');
    if (oldCheat2) oldCheat2.remove();

    // 2. Buat tombol cheat transparan yang estetik
    const cheatBtn2 = document.createElement('button');
    cheatBtn2.id = 'cheatLvl2';
    cheatBtn2.innerText = "⚡ Buka 1 Pasang";
    cheatBtn2.style.cssText = "position: absolute; bottom: 10px; left: 10px; background: rgba(255, 255, 255, 0.2); color: white; border: 1px dashed rgba(255, 255, 255, 0.5); padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; cursor: pointer; z-index: 100; backdrop-filter: blur(2px);";
    
    // 3. Logika klik tombol cheat
    cheatBtn2.onclick = function() {
        window.mintaAksesCheat(() => {
            // Ambil semua kartu yang saat ini belum mendapatkan pasangan (belum matched)
            const unMatchedCards = Array.from(memoryBoard.querySelectorAll('.memory-card:not(.matched)'));
            
            if (unMatchedCards.length >= 2) {
                // Ambil kartu pertama yang tersedia
                const firstCard = unMatchedCards[0];
                const targetPhotoId = firstCard.dataset.photoId;
                
                // Cari kartu pasangannya yang memiliki photoId yang sama
                const secondCard = unMatchedCards.find(card => card !== firstCard && card.dataset.photoId === targetPhotoId);
                
                if (secondCard) {
                    // Animasi membalikkan kedua kartu otomatis
                    firstCard.classList.add('flipped');
                    secondCard.classList.add('flipped');
                    
                    // Kunci dan tandai sebagai sepasang kartu sukses (matched)
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    
                    // Picu efek ledakan partikel bawaan kodemu agar tetap meriah
                    explodeAtCard(firstCard);
                    explodeAtCard(secondCard);
                    
                    if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
                    
                    matchedPairs++;
                    
                    // Jika seluruh 8 pasang sudah terbuka, pemicu menang!
                    if (matchedPairs === 8) {
                        endLevel2();
                    }
                }
            }
        });
    };
    
    // 4. Tempelkan tombol ke dalam parent dari memoryBoard agar posisinya presisi melayang
    if (memoryBoard && memoryBoard.parentNode) {
        memoryBoard.parentNode.appendChild(cheatBtn2);
    }
    // =========================================================================

    function flipCard() {
        if (lockBoard) return; 
        if (this === flippedCards[0]) return; 
        if (this.classList.contains('matched')) return;

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        let isMatch = flippedCards[0].dataset.photoId === flippedCards[1].dataset.photoId;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];

        card1.classList.add('matched');
        card2.classList.add('matched');
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        
        matchedPairs++;
        
        if (navigator.vibrate) navigator.vibrate([30, 20, 30]);

        explodeAtCard(card1);
        explodeAtCard(card2);

        resetTurn();

        // Cek jika seluruh 8 pasangan kartu berhasil ditemukan
        if (matchedPairs === 8) {
            endLevel2();
        }
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            flippedCards[1].classList.remove('flipped');
            resetTurn();
        }, 800);
    }

    function resetTurn() {
        flippedCards = [];
        lockBoard = false;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function explodeAtCard(cardElement) {
        const boardRect = memoryBoard.getBoundingClientRect();
        const cardRect = cardElement.getBoundingClientRect();
        
        const x = cardRect.left - boardRect.left + (cardRect.width / 2);
        const y = cardRect.top - boardRect.top + (cardRect.height / 2);

        const heartIcons = ["❤️", "💖", "✨", "🌸", "🥰", "💋"];
        const particleCount = 10;

        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.classList.add('memory-particle');
            p.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 60 + 30;
            const targetX = Math.cos(angle) * velocity;
            const targetY = Math.sin(angle) * velocity;

            p.style.setProperty('--mx', `${targetX}px`);
            p.style.setProperty('--my', `${targetY}px`);

            memoryBoard.appendChild(p);

            setTimeout(() => {
                if (p.parentNode === memoryBoard) memoryBoard.removeChild(p);
            }, 700);
        }
    }

    function endLevel2() {
        setTimeout(() => {
            memoryBoard.innerHTML = ''; // Bersihkan papan game

            if (typeof window.showGlobalGamePopup === 'function') {
                window.showGlobalGamePopup(
                    "😳", 
                    "YEAYYY BERHASIL!", 
                    "Lah kok kamu jago banget sih 😳💕 atau jangan-jangan kamu emang ditakdirkan buat aku yaa?", 
                    3 // Membuka Level 3 otomatis saat tombol popup di-klik
                );
            }
        }, 600);
    }
};