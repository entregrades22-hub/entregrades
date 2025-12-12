document.addEventListener('DOMContentLoaded', () => {

    // --- CRONÔMETRO ---
    const countdownTimer = document.getElementById('countdown-timer');
    if (countdownTimer) {
        let time = 15 * 60; // 15 minutos
        const timerInterval = setInterval(() => {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            countdownTimer.innerHTML = `${minutes}:${seconds}`;
            time--;
            if (time < 0) {
                clearInterval(timerInterval);
                countdownTimer.innerHTML = "00:00";
            }
        }, 1000);
    }

    // --- VÍDEO VSL ---
    const video = document.getElementById('hero-video');
    const videoOverlay = document.getElementById('video-overlay');
    const unmuteButton = document.getElementById('unmute-button');

    if (video && videoOverlay && unmuteButton) {
        unmuteButton.addEventListener('click', () => {
            video.muted = false;
            video.currentTime = 0;
            video.play().catch(error => {
                console.error("Erro ao tentar reproduzir o vídeo:", error);
                // Tenta reproduzir novamente se falhar (comum em alguns navegadores)
                 video.play();
            });
            videoOverlay.style.display = 'none';
            video.setAttribute('controls', 'true'); // Adiciona controles após o play
        });

        // Opcional: Pausar o vídeo se clicar nele depois de iniciar
        video.addEventListener('click', () => {
             if (!video.paused && videoOverlay.style.display === 'none') {
                 video.pause();
             } else if (video.paused && videoOverlay.style.display === 'none') {
                 video.play();
             }
        });
    }


    // --- CARROSSEL GENÉRICO ---
    const setupCarousel = (carouselId) => {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.next-btn');
        const prevButton = carousel.querySelector('.prev-btn');
        
        if (slides.length === 0) return;

        let currentIndex = 0;

        const updateCarousel = () => {
            // Move a trilha
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';

            // Atualiza classes para o slide central
            slides.forEach((slide, index) => {
                slide.classList.remove('current-slide');
                // Lógica simples para destacar o slide do meio visível
                // Em telas maiores (3 slides), o slide do meio é index + 1
                // Em telas menores, pode precisar de ajuste.
                // Esta é uma abordagem simplificada que funciona bem para 3 itens.
                let centerIndex = currentIndex + 1;
                 if (window.innerWidth <= 768) centerIndex = currentIndex; // Tablet (2 itens, foca no primeiro)
                 if (window.innerWidth <= 480) centerIndex = currentIndex; // Mobile (1 item)

                if (index === centerIndex) {
                    slide.classList.add('current-slide');
                }
            });
        };

        nextButton.addEventListener('click', () => {
            currentIndex++;
            // Lógica de loop infinito simplificada
            if (currentIndex >= slides.length - 2 && window.innerWidth > 768) currentIndex = 0;
            else if (currentIndex >= slides.length - 1 && window.innerWidth <= 768 && window.innerWidth > 480) currentIndex = 0;
            else if (currentIndex >= slides.length && window.innerWidth <= 480) currentIndex = 0;
            
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex--;
            if (currentIndex < 0) {
                 if (window.innerWidth > 768) currentIndex = slides.length - 3;
                 else if (window.innerWidth > 768) currentIndex = slides.length - 2;
                 else currentIndex = slides.length - 1;
            }
            updateCarousel();
        });
        
        // Inicializa
        updateCarousel();
        // Recalcula ao redimensionar a janela
        window.addEventListener('resize', updateCarousel);
    };

    setupCarousel('testimonials-carousel');
    setupCarousel('preview-carousel');


    // --- FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Fecha os outros
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Alterna o atual
            item.classList.toggle('active');
        });
    });

    // --- POPUP DE COMPRA ---
    const popup = document.getElementById('purchase-popup');
    const popupContent = popup.querySelector('.popup-content');
    const buyers = [
        { name: 'Carlos E.', location: 'São Paulo/SP', product: 'Combo Premium Completo' },
        { name: 'Ana P.', location: 'Rio de Janeiro/RJ', product: 'Combo Premium Completo' },
        { name: 'Roberto M.', location: 'Curitiba/PR', product: 'Combo Premium Completo' },
        { name: 'Fernanda S.', location: 'Belo Horizonte/MG', product: 'Combo Premium Completo' },
        { name: 'Ricardo L.', location: 'Brasília/DF', product: 'Combo Premium Completo' },
        { name: 'Juliana G.', location: 'Salvador/BA', product: 'Combo Premium Completo' }
    ];

    function showPopup() {
        const buyer = buyers[Math.floor(Math.random() * buyers.length)];
        popupContent.innerHTML = `<p><strong>${buyer.name}</strong> de ${buyer.location} acabou de comprar o <strong>${buyer.product}</strong>.</p>`;
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, 6000); // Mostra por 6 segundos
    }

    // Inicia o ciclo de popups
    setTimeout(() => {
        showPopup();
        setInterval(showPopup, 25000); // Repete a cada 25 segundos
    }, 5000); // Começa após 5 segundos

    // --- ANIMAÇÃO DE SCROLL ---
    const animatedSections = document.querySelectorAll('.animated-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedSections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});
