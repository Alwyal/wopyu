window.startLevel3 = function() {
    const mazeContainer = document.getElementById('mazeContainer');
    const backToJourneyBtn3 = document.getElementById('backToJourneyBtn3');
    
    // Selector Popup Modal Internal (Untuk Portal & Kunci)
    const mazeModal = document.getElementById('mazeModal');
    const mazeModalIcon = document.getElementById('mazeModalIcon');
    const mazeModalText = document.getElementById('mazeModalText');
    const mazeModalCloseBtn = document.getElementById('mazeModalCloseBtn');

    // MAP 15x15 ASLI ALWY
    const mazeGrid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 4, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 4],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0],
        [0, 0, 1, 3, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 1, 0, 2, 0, 1, 1, 1, 1, 0, 1, 0],
        [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0]
    ];

    let playerPos = { x: 0, y: 0 };    
    const finishPos = { x: 14, y: 14 }; 
    
    let hasKey = false; 
    let gameActive = true;
    let justTeleported = false; 

    const portalA = { x: 14, y: 6 };
    const portalB = { x: 12, y: 3 };  

    // Reset awal saat level dibuka
    if (backToJourneyBtn3) backToJourneyBtn3.classList.add('hidden');
    if (mazeModal) mazeModal.classList.add('hidden');
    gameActive = true;
    playerPos = { x: 0, y: 0 };
    hasKey = false;
    justTeleported = false;

    drawMaze();
	
	// =========================================================================
    // IMPLEMENTASI ENGINE CHEAT LEVEL 3 KUSTOM (PC & MOBILE RESPONSIVE)
    // =========================================================================
    if (window.isCheatUnlocked) {
        window.buatTombolSkipAesthetic('cheatLvl3', mazeContainer, function() {
            if (!hasKey) {
                // TAHAP 1: Berikan kunci otomatis
                hasKey = true;
                mazeGrid[12][3] = 0; 
                showMazePopup("🔑", "Shortcut aktif! Kunci hati didapatkan tanpa portal. ❤️");
            } else {
                // TAHAP 2: Teleportasi ke ujung labirin (samping finish)
                playerPos = { x: 14, y: 13 };
                showMazePopup("🌀", "Teleportasi berhasil! Sepele⚡");
                
                // Hapus tombol setelah digunakan melompat ke akhir
                const currentBtn = document.getElementById('cheatLvl3');
                if (currentBtn) currentBtn.remove();
            }
            drawMaze();
        });
    }

    // Fungsi internal untuk Portal & Kunci
    function showMazePopup(icon, text) {
        if (!mazeModal) return;
        mazeModalIcon.innerText = icon;
        mazeModalText.innerText = text;
        mazeModal.classList.remove('hidden');
        gameActive = false; 
    }

    if (mazeModalCloseBtn) {
        mazeModalCloseBtn.onclick = function() {
            mazeModal.classList.add('hidden');
            if (playerPos.x !== finishPos.x || playerPos.y !== finishPos.y) {
                gameActive = true;
            }
        };
    }

    function drawMaze() {
        mazeContainer.innerHTML = '';
        mazeContainer.style.gridTemplateColumns = "repeat(15, 1fr)";
        mazeContainer.style.gridTemplateRows = "repeat(15, 1fr)";

        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++) {
                const cell = document.createElement('div');
                cell.classList.add('maze-cell');

                if (mazeGrid[r][c] === 1) {
                    cell.classList.add('maze-wall');
                } else if (mazeGrid[r][c] === 2) {
                    cell.classList.add('maze-gate-cell');
                    cell.innerText = '🚪'; 
                } else if (mazeGrid[r][c] === 3) {
                    cell.classList.add('maze-key-cell');
                    cell.innerText = '🔑'; 
                } else if (mazeGrid[r][c] === 4) {
                    cell.classList.add('portal-cell');
                    cell.innerText = '🌀'; 
                } else {
                    cell.classList.add('maze-path');
                }

                if (r === playerPos.y && c === playerPos.x) {
                    cell.innerHTML = ''; 
                    const img = document.createElement('img');
                    img.src = 'img/dinda.png';
                    img.classList.add('maze-avatar');
                    cell.appendChild(img);
                }
                else if (r === finishPos.y && c === finishPos.x) {
                    cell.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = 'img/kamu.png';
                    img.classList.add('maze-avatar', 'target');
                    cell.appendChild(img);
                }

                mazeContainer.appendChild(cell);
            }
        }
    }

    function movePlayer(dx, dy) {
        if (!gameActive) return;

        const newX = playerPos.x + dx;
        const newY = playerPos.y + dy;

        if (newX >= 0 && newX < 15 && newY >= 0 && newY < 15) {
            const destinationTile = mazeGrid[newY][newX];

            if (destinationTile === 1) {
                if (navigator.vibrate) navigator.vibrate([40, 20]);
                return;
            }

            if (destinationTile === 2) {
                if (!hasKey) {
                    showMazePopup("🔒", "Eits! Jalannya digembok! Cari Kunci Hati '🔑' dulu lewat portal rahasia '🌀' ya sayang! 🥰");
                    if (navigator.vibrate) navigator.vibrate([60, 40]);
                    return;
                } else {
                    mazeGrid[newY][newX] = 0; 
                    if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
                }
            }

            playerPos.x = newX;
            playerPos.y = newY;
            if (navigator.vibrate) navigator.vibrate(12);

            if (mazeGrid[playerPos.y][playerPos.x] === 4 && !justTeleported) {
                if (playerPos.x === portalA.x && playerPos.y === portalA.y) {
                    playerPos.x = portalB.x;
                    playerPos.y = portalB.y;
                } else if (playerPos.x === portalB.x && playerPos.y === portalB.y) {
                    playerPos.x = portalA.x;
                    playerPos.y = portalA.y;
                }

                justTeleported = true; 
                showMazePopup("🌀", "Wuuushh! Kamu melintasi portal dimensi gerbang cintaku! ⚡");
                if (navigator.vibrate) navigator.vibrate([80, 50, 80, 50]);
            } 
            else if (mazeGrid[playerPos.y][playerPos.x] !== 4) {
                justTeleported = false;
            }

            if (mazeGrid[playerPos.y][playerPos.x] === 3) {
                hasKey = true;
                mazeGrid[playerPos.y][playerPos.x] = 0; 
                showMazePopup("🔑", "Ciee Kunci Hatiku Berhasil Diambil! Sekarang ayo buka gerbang pintu bawah! ❤️");
                if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
            }

            drawMaze();
            checkWin();
        }
    }

    function checkWin() {
        if (playerPos.x === finishPos.x && playerPos.y === finishPos.y) {
			const b = document.getElementById('cheatLvl3');
            if (b) b.remove();
			
            gameActive = false;
            if (navigator.vibrate) navigator.vibrate([60, 40, 60]);

            // Bersihkan Labirin sebelum popup muncul
            mazeContainer.innerHTML = '';

            if (typeof window.showGlobalGamePopup === 'function') {
                window.showGlobalGamePopup(
                    "🎉", 
                    "PERJUANGANMU LUAR BIASA!", 
                    "Ciee yang berhasil ngebuka gerbang hatiku lewat labirin buatan pacarmu yang keren ini! Hehe 🥰", 
                    4 // Membuka Level 4 otomatis saat tombol popup di-klik
                );
            }
        }
    }

    document.getElementById('moveUp').onclick = () => movePlayer(0, -1);
    document.getElementById('moveDown').onclick = () => movePlayer(0, 1);
    document.getElementById('moveLeft').onclick = () => movePlayer(-1, 0);
    document.getElementById('moveRight').onclick = () => movePlayer(1, 0);

    document.onkeydown = function(e) {
        if (!gameActive) return;
        if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(0, -1);
        if (e.key === 'ArrowDown' || e.key === 's') movePlayer(0, 1);
        if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(-1, 0);
        if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(1, 0);
    };
};