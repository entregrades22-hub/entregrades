document.addEventListener('DOMContentLoaded', () => {
    
    // --- VÍDEO PLAYER ---
    const videoContainer = document.querySelector('.video-box');
    const video = document.getElementById('vsl-video');
    const overlay = document.getElementById('video-overlay');

    if (video && overlay) {
        overlay.addEventListener('click', () => {
            video.muted = false;
            video.play();
            overlay.style.display = 'none';
            video.setAttribute('controls', 'true');
        });
    }

    // --- POPUP DE COMPRA (TOAST) ---
    const toast = document.getElementById('toast');
    const buyerName = document.getElementById('buyer-name');
    const names = [
        "João de SP comprou o Dossiê",
        "Maria de RJ comprou o Dossiê",
        "Carlos de MG comprou o Dossiê",
        "Ana de RS comprou o Dossiê",
        "Paulo de BA comprou o Dossiê"
    ];

    function showToast() {
        if(!toast) return;
        const randomName = names[Math.floor(Math.random() * names.length)];
        buyerName.innerText = randomName;
        toast.classList.remove('hide');
        
        setTimeout(() => {
            toast.classList.add('hide');
        }, 4000);
    }

    // Começa a aparecer depois de 5 segundos
    setTimeout(() => {
        showToast();
        setInterval(showToast, 15000);
    }, 5000);

});
