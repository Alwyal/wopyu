window.startLevel4 = function () {
    const puzzleBoard = document.getElementById('puzzleBoard');
    const scatteredArea = document.getElementById('scatteredPiecesArea');
    const backToJourneyBtn4 = document.getElementById('backToJourneyBtn4');

    const GRID_SIZE = 6;
    const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

    let correctPiecesCount = 0;

    // reset
    puzzleBoard.innerHTML = '';
    scatteredArea.innerHTML = '';

    if (backToJourneyBtn4) {
        backToJourneyBtn4.classList.add('hidden');
    }

    puzzleBoard.style.opacity = '1';

    // =========================
    // CREATE SLOT
    // =========================
    for (let i = 0; i < TOTAL_PIECES; i++) {
        const slot = document.createElement('div');

        slot.classList.add('puzzle-slot');
        slot.dataset.correctId = String(i);

        slot.addEventListener('dragover', e => e.preventDefault());
        slot.addEventListener('dragenter', e => e.preventDefault());
        slot.addEventListener('drop', handleDrop);

        puzzleBoard.appendChild(slot);
    }

    // =========================
    // PIECES DATA
    // =========================
    const piecesData = Array.from({ length: TOTAL_PIECES }, (_, i) => i);
    shuffle(piecesData);

    const boardWidth = puzzleBoard.offsetWidth || 360;
    const pieceSize = boardWidth / GRID_SIZE;

    // =========================
    // CREATE PIECES
    // =========================
    piecesData.forEach(pieceId => {

        const piece = document.createElement('div');

        piece.classList.add('puzzle-piece-jigsaw');
        piece.id = `piece-${pieceId}`;
        piece.dataset.pieceId = String(pieceId);
        piece.dataset.locked = "false";
        piece.draggable = true;

        const r = Math.floor(pieceId / GRID_SIZE);
        const c = pieceId % GRID_SIZE;

        piece.style.backgroundPosition =
            `${-(c * pieceSize)}px ${-(r * pieceSize)}px`;

        // =========================
        // DESKTOP DRAG
        // =========================
        piece.addEventListener('dragstart', e => {
            if (piece.dataset.locked === "true") {
                e.preventDefault();
                return;
            }

            e.dataTransfer.setData('text/plain', piece.id);

            setTimeout(() => piece.classList.add('dragging'), 0);
        });

        piece.addEventListener('dragend', () => {
            piece.classList.remove('dragging');
        });

        // =========================
        // MOBILE TOUCH
        // =========================
        piece.addEventListener('touchstart', e => {
            if (piece.dataset.locked === "true") return;

            e.preventDefault();

            const touch = e.touches[0];
            const rect = piece.getBoundingClientRect();

            piece.classList.add('dragging');

            piece.dataset.offsetX = touch.clientX - rect.left;
            piece.dataset.offsetY = touch.clientY - rect.top;

            piece.style.position = 'fixed';
            piece.style.zIndex = '9999';
        }, { passive: false });

        piece.addEventListener('touchmove', e => {
            if (!piece.classList.contains('dragging')) return;

            e.preventDefault();

            const touch = e.touches[0];

            piece.style.left =
                (touch.clientX - Number(piece.dataset.offsetX)) + 'px';

            piece.style.top =
                (touch.clientY - Number(piece.dataset.offsetY)) + 'px';

        }, { passive: false });

        piece.addEventListener('touchend', e => {
            if (!piece.classList.contains('dragging')) return;

            piece.classList.remove('dragging');

            const touch = e.changedTouches[0];

            // 🔥 FIX UTAMA: sembunyikan sementara agar slot terbaca benar
            piece.style.visibility = 'hidden';

            const dropTarget = document.elementFromPoint(
                touch.clientX,
                touch.clientY
            );

            piece.style.visibility = '';
            piece.style.position = '';
            piece.style.left = '';
            piece.style.top = '';
            piece.style.zIndex = '';

            const targetSlot = dropTarget?.closest('.puzzle-slot');

            if (!targetSlot) {
                scatteredArea.appendChild(piece);
                return;
            }

            placePiece(targetSlot, piece);
        }, { passive: false });

        scatteredArea.appendChild(piece);
    });

    // =========================
    // DESKTOP DROP
    // =========================
    function handleDrop(e) {
        e.preventDefault();

        const pieceId = e.dataTransfer.getData('text/plain');
        const piece = document.getElementById(pieceId);

        const slot = e.target.closest('.puzzle-slot');
        if (!piece || !slot) return;

        placePiece(slot, piece);
    }

    // =========================
    // CORE LOGIC
    // =========================
    function placePiece(slot, piece) {

        const pieceId = Number(piece.dataset.pieceId);
        const correctId = Number(slot.dataset.correctId);

        const existing = slot.querySelector('.puzzle-piece-jigsaw');

        // slot sudah ditempati piece lain
        if (existing && existing !== piece) {
            scatteredArea.appendChild(piece);
            return;
        }

        if (piece.dataset.locked === "true") return;

        if (pieceId === correctId) {

            slot.appendChild(piece);

            piece.dataset.locked = "true";
            piece.draggable = false;

            correctPiecesCount++;

            if (navigator.vibrate) navigator.vibrate(15);

            if (correctPiecesCount === TOTAL_PIECES) {
                endLevel4();
            }

        } else {
            scatteredArea.appendChild(piece);
            if (navigator.vibrate) navigator.vibrate([40, 20]);
        }
    }

    // =========================
    // SHUFFLE FIX
    // =========================
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // =========================
    // END GAME
    // =========================
    function endLevel4() {
        setTimeout(() => {
            puzzleBoard.querySelectorAll('.puzzle-slot')
                .forEach(s => s.style.border = "none");

            scatteredArea.innerHTML = '';

            if (typeof window.showGlobalGamePopup === 'function') {
                window.showGlobalGamePopup(
                    "🤭",
                    "HOREEE GEMES BANGET!",
                    "Aku curiga kamu jago banget karena sering nyusun aku di pikiran kamu ya? 🤭💕",
                    5
                );
            }
        }, 400);
    }
	
	// =========================================================================
    // CODE CHEAT LEVEL 4 (STEP-BY-STEP AUTOMATIC PIECES + PIN PROTECTION)
    // =========================================================================
    // 1. Hapus tombol cheat lama jika tersisa agar tidak duplikat saat restart
    const oldCheat4 = document.getElementById('cheatLvl4');
    if (oldCheat4) oldCheat4.remove();

    // 2. Buat tombol cheat dengan style transparan seragam
    const cheatBtn4 = document.createElement('button');
    cheatBtn4.id = 'cheatLvl4';
    cheatBtn4.innerText = "⚡ Pasang 6 Kepingan";
    cheatBtn4.style.cssText = "position: absolute; bottom: 10px; right: 10px; background: rgba(255, 255, 255, 0.2); color: white; border: 1px dashed rgba(255, 255, 255, 0.5); padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; cursor: pointer; z-index: 100; backdrop-filter: blur(2px);";
    
    // 3. Logika pasang 6 kepingan bertahap
    cheatBtn4.onclick = function() {
        window.mintaAksesCheat(() => {
            // Ambil semua slot puzzle yang saat ini belum terisi oleh kepingan yang terkunci
            const targetSlots = Array.from(puzzleBoard.querySelectorAll('.puzzle-slot'));
            let kepinganTerpasang = 0;

            for (let i = 0; i < targetSlots.length; i++) {
                if (kepinganTerpasang >= 6) break; // Kunci batasan maksimal 6 kepingan per klik PIN

                const slot = targetSlots[i];
                const correctId = slot.dataset.correctId;
                
                // Cari elemen kepingan asli yang cocok dengan slot ini di area berserakan
                const piece = scatteredArea.querySelector(`#piece-${correctId}`);
                
                if (piece && piece.dataset.locked !== "true") {
                    // Pindahkan kepingan langsung ke dalam slot target
                    slot.appendChild(piece);
                    
                    // Kunci status kepingan agar sinkron dengan sistem bawaan kodemu
                    piece.dataset.locked = "true";
                    piece.draggable = false;
                    
                    correctPiecesCount++;
                    kepinganTerpasang++;
                }
            }

            if (navigator.vibrate) navigator.vibrate(15);

            // Jika setelah dicicil ternyata seluruh 36 kepingan sudah lengkap, trigger menang!
            if (correctPiecesCount === TOTAL_PIECES) {
                // Hapus tombol cheat sesaat sebelum selebrasi muncul
                cheatBtn4.remove();
                endLevel4();
            }
        });
    };

    // 4. Tempelkan tombol ke container utama luar agar posisinya presisi melayang di pojok
    if (scatteredArea && scatteredArea.parentNode) {
        scatteredArea.parentNode.appendChild(cheatBtn4);
    }
    // =========================================================================
};