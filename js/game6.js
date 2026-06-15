window.startLevel6 = function() {
    const giftBoxSection = document.getElementById('giftBoxSection');
    const mainGiftBox = document.getElementById('mainGiftBox');
    const surpriseContent = document.getElementById('surpriseContent');
    const backToJourneyBtn6 = document.getElementById('backToJourneyBtn6');
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    // Reset Kondisi Tampilan Hadiah
    giftBoxSection.style.display = 'block';
    surpriseContent.classList.add('hidden');
    if (backToJourneyBtn6) backToJourneyBtn6.classList.add('hidden');
    
    // Set Ukuran Canvas Mengikuti Container Game
    canvas.width = canvas.parentNode.offsetWidth || 360;
    canvas.height = canvas.parentNode.offsetHeight || 500;

    let particles = [];
    let animationFrameId;

    // Aksi Klik Kotak Kado Utama
    mainGiftBox.onclick = function() {
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);

        // Sembunyikan kado, ledakkan kertas warna-warni, ekspos surat ucapan!
        giftBoxSection.style.display = 'none';
        surpriseContent.classList.remove('hidden');
        if (backToJourneyBtn6) backToJourneyBtn6.classList.remove('hidden');

        createConfettiExplosion();
    };

    function createConfettiExplosion() {
        const colors = ['#ff4d88', '#ff7eb3', '#ffcbd5', '#ffeb3b', '#00e676', '#00b0ff'];
        particles = [];

        // Hasilkan 120 partikel kertas warna-warni yang meletus keluar
        for (let i = 0; i < 120; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2 - 50,
                radius: Math.random() * 4 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.7) * 12 - 4, // Meletus ke arah atas gila-gilaan
                gravity: 0.25,
                opacity: 1
            });
        }

        animateConfetti();
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeParticles = false;

        particles.forEach(p => {
            if (p.opacity > 0) {
                activeParticles = true;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity; // Efek gravitasi kertas jatuh perlahan
                p.opacity -= 0.01; // Pudar perlahan di bawah layar

                ctx.beginPath();
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        if (activeParticles) {
            animationFrameId = requestAnimationFrame(animateConfetti);
        } else {
            cancelAnimationFrame(animationFrameId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    // Fungsi Global Pilihan Hadiah Interaktif (Muncul Popup Baper Kustom WhatsApp)
    window.pilihKado = function(namaKado) {
        if (navigator.vibrate) navigator.vibrate(50);
        
        // Tembak pesan kustom manis ke nomor kamu menggunakan WhatsApp API tautan otomatis!
        alert(`🎁 Pilihan Kado Terkunci: ${namaKado}! \n\nPilihan ini otomatis memicu pesan teks ke WA Mas Alwy, kirimkan setelah halaman dialihkan ya sayang!😉❤️`);
        
        const pesanWA = encodeURIComponent(`Mas Alwy, misi dah selesai semua nihhh😎 Sekarang aku mau tagih hadiah yang dijanjikan yaaa, Aku mau ${namaKado} Muaachh😘`);
        window.open(`https://wa.me/6285793990833?text=${pesanWA}`, '_blank'); 
    };
};