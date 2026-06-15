window.startLevel4 = function() {
    const puzzleBoard = document.getElementById('puzzleBoard');
    const scatteredArea = document.getElementById('scatteredPiecesArea');
    const backToJourneyBtn4 = document.getElementById('backToJourneyBtn4');

    const GRID_SIZE = 6; 
    const TOTAL_PIECES = GRID_SIZE * GRID_SIZE; 
    let correctPiecesCount = 0;

    // Reset Awal Area Game secara bersih
    puzzleBoard.innerHTML = '';
    scatteredArea.innerHTML = '';
    if (backToJourneyBtn4) backToJourneyBtn4.classList.add('hidden');
    puzzleBoard.style.opacity = '1'; 
    correctPiecesCount = 0;

    // 1. Buat 36 Slot Target Drop secara presisi
    for (let i = 0; i < TOTAL_PIECES; i++) {
        const slot = document.createElement('div');
        slot.classList.add('puzzle-slot');
        slot.dataset.correctId = i; 

        slot.addEventListener('dragenter', (e) => e.preventDefault());
        slot.addEventListener('dragover', (e) => e.preventDefault());
        slot.addEventListener('drop', handleDrop);

        puzzleBoard.appendChild(slot);
    }

    // 2. Buat array ID (0 - 35) secara murni
    const piecesData = [];
    for (let i = 0; i < TOTAL_PIECES; i++) {
        piecesData.push(i);
    }
    shuffle(piecesData);

    const boardWidth = puzzleBoard.offsetWidth || 360;
    const pieceSize = boardWidth / GRID_SIZE;

    // 3. Render Kepingan Unik ke Area Berserakan
    piecesData.forEach((pieceId) => {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece-jigsaw');
        piece.setAttribute('draggable', 'true');
        piece.id = `piece-${pieceId}`;
        piece.dataset.pieceId = pieceId;

        // Kalkulasi posisi gambar latar belakang asli
        const r = Math.floor(pieceId / GRID_SIZE);
        const c = pieceId % GRID_SIZE;
        const bgX = -(c * pieceSize);
        const bgY = -(r * pieceSize);
        piece.style.backgroundPosition = `${bgX}px ${bgY}px`;

        // --- EVENT FOR DESKTOP (DRAG & DROP) ---
        piece.addEventListener('dragstart', (e) => {
            if (piece.getAttribute('draggable') === 'false') return;
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.dropEffect = 'move';
            setTimeout(() => e.target.classList.add('dragging'), 0);
        });

        piece.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });

        // --- EVENT FOR MOBILE TOUCH (ANTI DUPLIKASI & STABIL) ---
        piece.addEventListener('touchstart', (e) => {
            if (piece.getAttribute('draggable') === 'false') return;
            
            e.preventDefault(); 
            piece.classList.add('dragging');
            
            const touch = e.touches[0];
            piece.dataset.touchOffsetX = touch.clientX - piece.getBoundingClientRect().left;
            piece.dataset.touchOffsetY = touch.clientY - piece.getBoundingClientRect().top;
            
            piece.style.position = 'fixed';
            piece.style.zIndex = '1000';
            piece.style.left = (touch.clientX - piece.dataset.touchOffsetX) + 'px';
            piece.style.top = (touch.clientY - piece.dataset.touchOffsetY) + 'px';
        }, { passive: false });

        piece.addEventListener('touchmove', (e) => {
            if (!piece.classList.contains('dragging')) return;
            e.preventDefault();
            
            const touch = e.touches[0];
            piece.style.left = (touch.clientX - piece.dataset.touchOffsetX) + 'px';
            piece.style.top = (touch.clientY - piece.dataset.touchOffsetY) + 'px';
        }, { passive: false });

        piece.addEventListener('touchend', (e) => {
            if (!piece.classList.contains('dragging')) return;
            piece.classList.remove('dragging');
            
            piece.style.position = '';
            piece.style.zIndex = '';
            piece.style.left = '';
            piece.style.top = '';

            const touch = e.changedTouches[0];
            const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (!dropTarget) {
                scatteredArea.appendChild(piece);
                return;
            }

            const targetSlot = dropTarget.closest('.puzzle-slot');
            
            if (targetSlot) {
                const slotCorrectId = targetSlot.dataset.correctId;
                const pId = piece.dataset.pieceId;

                // FIX SAKTI: Cek apakah di dalam slot ada kepingan LAIN selain dirinya sendiri
                const existingPiece = targetSlot.querySelector('.puzzle-piece-jigsaw');
                const isSlotEmptyOrSelf = !existingPiece || existingPiece.id === piece.id;

                if (slotCorrectId === pId && isSlotEmptyOrSelf) {
                    targetSlot.appendChild(piece);
                    piece.setAttribute('draggable', 'false');
                    
                    if (navigator.vibrate) navigator.vibrate(15);
                    correctPiecesCount++;

                    if (correctPiecesCount === TOTAL_PIECES) {
                        endLevel4();
                    }
                } else {
                    if (navigator.vibrate) navigator.vibrate([40, 20]);
                    scatteredArea.appendChild(piece); 
                }
            } else {
                scatteredArea.appendChild(piece); 
            }
        });

        scatteredArea.appendChild(piece);
    });

    // 4. Logika Handle Drop Kepingan (Desktop)
    function handleDrop(e) {
        e.preventDefault();
        
        let targetSlot = e.target;
        if (targetSlot.classList.contains('puzzle-piece-jigsaw')) {
            targetSlot = targetSlot.parentNode;
        }

        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedPiece = document.getElementById(draggedId);
        
        if (!draggedPiece || !targetSlot.classList.contains('puzzle-slot')) return;

        const slotCorrectId = targetSlot.dataset.correctId;
        const pieceId = draggedPiece.dataset.pieceId;

        // FIX SAKTI DESKTOP: Cek duplikasi kepingan lain
        const existingPiece = targetSlot.querySelector('.puzzle-piece-jigsaw');
        const isSlotEmptyOrSelf = !existingPiece || existingPiece.id === draggedPiece.id;

        if (slotCorrectId === pieceId && isSlotEmptyOrSelf) {
            targetSlot.appendChild(draggedPiece);
            draggedPiece.setAttribute('draggable', 'false');
            draggedPiece.classList.remove('dragging'); 
            
            if (navigator.vibrate) navigator.vibrate(15);
            correctPiecesCount++;

            if (correctPiecesCount === TOTAL_PIECES) {
                endLevel4();
            }
        } else {
            draggedPiece.classList.remove('dragging');
            if (navigator.vibrate) navigator.vibrate([40, 20]);
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[array[j]]] = [array[array[j]], array[i]];
        }
    }

    function endLevel4() {
        setTimeout(() => {
            const allSlots = puzzleBoard.querySelectorAll('.puzzle-slot');
            allSlots.forEach(s => s.style.border = "none");
            puzzleBoard.style.border = "none";
            scatteredArea.innerHTML = ''; 
            scatteredArea.style.background = "none";

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
};