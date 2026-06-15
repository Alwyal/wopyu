window.startLevel4 = function () {
    const puzzleBoard = document.getElementById('puzzleBoard');
    const scatteredArea = document.getElementById('scatteredPiecesArea');
    const backToJourneyBtn4 = document.getElementById('backToJourneyBtn4');

    const GRID_SIZE = 6;
    const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

    let correctPiecesCount = 0;

    puzzleBoard.innerHTML = '';
    scatteredArea.innerHTML = '';

    if (backToJourneyBtn4) {
        backToJourneyBtn4.classList.add('hidden');
    }

    puzzleBoard.style.opacity = '1';

    // =========================
    // BUAT SLOT
    // =========================

    for (let i = 0; i < TOTAL_PIECES; i++) {
        const slot = document.createElement('div');

        slot.classList.add('puzzle-slot');
        slot.dataset.correctId = i;

        slot.addEventListener('dragenter', e => e.preventDefault());
        slot.addEventListener('dragover', e => e.preventDefault());
        slot.addEventListener('drop', handleDrop);

        puzzleBoard.appendChild(slot);
    }

    // =========================
    // DATA PIECES
    // =========================

    const piecesData = Array.from(
        { length: TOTAL_PIECES },
        (_, i) => i
    );

    shuffle(piecesData);

    const boardWidth = puzzleBoard.offsetWidth || 360;
    const pieceSize = boardWidth / GRID_SIZE;

    // =========================
    // RENDER PIECES
    // =========================

    piecesData.forEach(pieceId => {

        const piece = document.createElement('div');

        piece.classList.add('puzzle-piece-jigsaw');

        piece.id = `piece-${pieceId}`;
        piece.dataset.pieceId = pieceId;
        piece.dataset.locked = "false";

        piece.draggable = true;

        const row = Math.floor(pieceId / GRID_SIZE);
        const col = pieceId % GRID_SIZE;

        piece.style.backgroundPosition =
            `${-(col * pieceSize)}px ${-(row * pieceSize)}px`;

        // =========================
        // DESKTOP
        // =========================

        piece.addEventListener('dragstart', e => {

            if (
                piece.dataset.locked === "true" ||
                piece.draggable === false
            ) {
                e.preventDefault();
                return;
            }

            e.dataTransfer.setData(
                'text/plain',
                piece.id
            );

            setTimeout(() => {
                piece.classList.add('dragging');
            }, 0);
        });

        piece.addEventListener('dragend', () => {
            piece.classList.remove('dragging');
        });

        // =========================
        // MOBILE
        // =========================

        piece.addEventListener('touchstart', e => {

            if (piece.dataset.locked === "true") return;

            e.preventDefault();

            const touch = e.touches[0];
            const rect = piece.getBoundingClientRect();

            piece.classList.add('dragging');

            piece.dataset.touchOffsetX =
                touch.clientX - rect.left;

            piece.dataset.touchOffsetY =
                touch.clientY - rect.top;

            piece.style.position = 'fixed';
            piece.style.zIndex = '9999';

            piece.style.left =
                (touch.clientX - Number(piece.dataset.touchOffsetX)) + 'px';

            piece.style.top =
                (touch.clientY - Number(piece.dataset.touchOffsetY)) + 'px';

        }, { passive: false });

        piece.addEventListener('touchmove', e => {

            if (!piece.classList.contains('dragging')) return;

            e.preventDefault();

            const touch = e.touches[0];

            piece.style.left =
                (touch.clientX - Number(piece.dataset.touchOffsetX)) + 'px';

            piece.style.top =
                (touch.clientY - Number(piece.dataset.touchOffsetY)) + 'px';

        }, { passive: false });

        piece.addEventListener('touchend', e => {

            if (
                !piece.classList.contains('dragging') ||
                piece.dataset.locked === "true"
            ) {
                return;
            }

            piece.classList.remove('dragging');

            piece.style.position = '';
            piece.style.left = '';
            piece.style.top = '';
            piece.style.zIndex = '';

            const touch = e.changedTouches[0];

            const dropTarget = document.elementFromPoint(
                touch.clientX,
                touch.clientY
            );

            const targetSlot =
                dropTarget?.closest('.puzzle-slot');

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

        let targetSlot = e.target;

        if (
            targetSlot.classList.contains(
                'puzzle-piece-jigsaw'
            )
        ) {
            targetSlot = targetSlot.parentNode;
        }

        const draggedId =
            e.dataTransfer.getData('text/plain');

        const piece =
            document.getElementById(draggedId);

        if (
            !piece ||
            !targetSlot.classList.contains('puzzle-slot')
        ) {
            return;
        }

        placePiece(targetSlot, piece);
    }

    // =========================
    // VALIDASI PENEMPATAN
    // =========================

    function placePiece(targetSlot, piece) {

        if (piece.dataset.locked === "true") {
            return;
        }

        const pieceId = piece.dataset.pieceId;
        const correctId = targetSlot.dataset.correctId;

        const existingPiece =
            targetSlot.querySelector(
                '.puzzle-piece-jigsaw'
            );

        if (existingPiece && existingPiece !== piece) {

            if (navigator.vibrate) {
                navigator.vibrate([40, 20]);
            }

            scatteredArea.appendChild(piece);
            return;
        }

        if (pieceId === correctId) {

            targetSlot.appendChild(piece);

            piece.dataset.locked = "true";
            piece.draggable = false;

            piece.classList.remove('dragging');

            correctPiecesCount++;

            if (navigator.vibrate) {
                navigator.vibrate(15);
            }

            if (correctPiecesCount >= TOTAL_PIECES) {
                endLevel4();
            }

        } else {

            piece.classList.remove('dragging');

            if (navigator.vibrate) {
                navigator.vibrate([40, 20]);
            }

            scatteredArea.appendChild(piece);
        }
    }

    // =========================
    // SHUFFLE FIX
    // =========================

    function shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const j =
                Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] =
                [array[j], array[i]];
        }

        return array;
    }

    // =========================
    // FINISH
    // =========================

    function endLevel4() {

        setTimeout(() => {

            puzzleBoard
                .querySelectorAll('.puzzle-slot')
                .forEach(slot => {
                    slot.style.border = 'none';
                });

            puzzleBoard.style.border = 'none';

            scatteredArea.innerHTML = '';
            scatteredArea.style.background = 'none';

            if (
                typeof window.showGlobalGamePopup ===
                'function'
            ) {
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