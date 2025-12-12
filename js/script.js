document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO CARROSSEL 3D ZOOM ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;

    function updateCarousel() {
        // Remove todas as classes especiais primeiro
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
            slide.style.display = 'none'; // Esconde todos para evitar sobreposição errada
        });

        // Índices circulares
        const totalSlides = slides.length;
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        const nextIndex = (currentIndex + 1) % totalSlides;

        // Configura o slide ATIVO (Centro - Zoom Grande)
        slides[currentIndex].style.display = 'block';
        slides[currentIndex].classList.add('active');

        // Configura o slide ANTERIOR (Esquerda - Zoom Pequeno)
        slides[prevIndex].style.display = 'block';
        slides[prevIndex].classList.add('prev');

        // Configura o slide PRÓXIMO (Direita - Zoom Pequeno)
        slides[nextIndex].style.display = 'block';
        slides[nextIndex].classList.add('next');
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Inicializa o carrossel
    updateCarousel();

    // --- LÓGICA DO FAQ (ACCORDION) ---
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            const item = this.parentElement;
            
            // Fecha outros abertos (opcional, remova se quiser permitir múltiplos abertos)
            document.querySelectorAll('.accordion-item').forEach(i => {
                if(i !== item) i.classList.remove('active');
            });

            item.classList.toggle('active');
        });
    });
});
