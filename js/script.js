document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = navLinks.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fecha o menu quando um link é clicado
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });


    // --- LÓGICA DO CRONÔMETRO DE PROMOÇÃO ---
    const countdownElement = document.getElementById('countdown-timer');

    if (countdownElement) {
        // Define o tempo inicial do cronômetro (21 minutos em segundos)
        let timeInSeconds = 21 * 60;

        const timer = setInterval(() => {
            if (timeInSeconds <= 0) {
                clearInterval(timer);
                countdownElement.textContent = "00:00";
                return;
            }

            timeInSeconds--;

            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;

            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

            countdownElement.textContent = `${formattedMinutes}:${formattedSeconds}`;

        }, 1000);
    }

    // --- LÓGICA DA GALERIA DE IMAGENS (SLIDER) ---
    const slidesContainer = document.querySelector('.slides');
    if (slidesContainer) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        function updateSlider() {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });

        // Auto-play
        setInterval(() => {
            nextBtn.click();
        }, 4000);
    }


    // --- LÓGICA DE ANIMAÇÃO AO ROLAR A PÁGINA ---
    const animatedSections = document.querySelectorAll('.animated-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    animatedSections.forEach(section => {
        observer.observe(section);
    });


    // --- LÓGICA DO POP-UP DE COMPRAS ---
    const popup = document.getElementById('purchase-popup');
    const popupContent = popup.querySelector('.popup-content');

    const buyers = [
        { name: 'José C.', location: 'São Paulo/SP' },
        { name: 'Maria S.', location: 'Rio de Janeiro/RJ' },
        { name: 'Antônio P.', location: 'Porto Alegre/RS' },
        { name: 'Fernanda L.', location: 'Goiânia/GO' },
        { name: 'Lucas M.', location: 'Fortaleza/CE' },
        { name: 'Beatriz R.', location: 'Manaus/AM' }
    ];

    const ebooks = [
        'Documentário Essencial',
        'Documentário Premium',
        'Combo Patriota Completo'
    ];

    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    function showPopup() {
        const randomBuyer = getRandomItem(buyers);
        const randomEbook = getRandomItem(ebooks);

        popupContent.innerHTML = `
            <p><strong>${randomBuyer.name}</strong> de ${randomBuyer.location}</p>
            <span>acabou de comprar <strong>${randomEbook}</strong></span>
        `;
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
