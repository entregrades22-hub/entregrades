document.addEventListener('DOMContentLoaded', () => {
    
    // --- VÍDEO PLAYER ---
    const video = document.getElementById('hero-video');
    const overlay = document.getElementById('video-overlay');

    if (video && overlay) {
        overlay.addEventListener('click', () => {
            video.muted = false;
            video.play();
            overlay.style.display = 'none';
            video.setAttribute('controls', 'true');
        });
    }

    // --- CARROSSEL GENÉRICO ---
    function setupSlider(sliderId, prevBtnClass, nextBtnClass) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;
        
        const images = slider.querySelectorAll('img');
        const prevBtn = document.querySelector(prevBtnClass);
        const nextBtn = document.querySelector(nextBtnClass);
        let index = 0;

        function showImage(i) {
            images.forEach(img => img.classList.remove('active'));
            images[i].classList.add('active');
        }

        nextBtn.addEventListener('click', () => {
            index++;
            if (index >= images.length) index = 0;
            showImage(index);
        });

        prevBtn.addEventListener('click', () => {
            index--;
            if (index < 0) index = images.length - 1;
            showImage(index);
        });
    }

    setupSlider('testimonial-slider', '.carousel-nav.prev', '.carousel-nav.next');
    setupSlider('preview-slider', '.carousel-nav.prev-prev', '.carousel-nav.next-prev');

    // --- FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-header').addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // --- TIMER ---
    let time = 899; // 14:59
    const timerEl = document.getElementById('countdown-timer');
    if(timerEl) {
        setInterval(() => {
            let m = Math.floor(time / 60);
            let s = time % 60;
            timerEl.innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
            time > 0 ? time-- : 0;
        }, 1000);
    }

    // --- POPUP COMPRA ---
    const popup = document.getElementById('purchase-popup');
    const popupContent = popup.querySelector('.popup-content');
    const buyers = [
        { name: 'Carlos E. de SP', product: 'Combo Premium' },
        { name: 'Ana P. de RJ', product: 'Combo Premium' },
        { name: 'Roberto M. de PR', product: 'Combo Premium' },
        { name: 'Fernanda S. de MG', product: 'Documentário Básico' }
    ];

    function showPopup() {
        if(!popup) return;
        const buyer = buyers[Math.floor(Math.random() * buyers.length)];
        popupContent.innerHTML = `<p><strong>${buyer.name}</strong> acabou de comprar o <strong>${buyer.product}</strong>.</p>`;
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, 5000);
    }

    setTimeout(() => {
        showPopup();
        setInterval(showPopup, 20000);
    }, 5000);

});
