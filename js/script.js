document.addEventListener('DOMContentLoaded', () => {
    
    // --- Lógica do Cronômetro (Scarcity) ---
    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration; // Reinicia o timer para loop infinito
            }
        }, 1000);
    }

    // Define 15 minutos (15 * 60 = 900 segundos)
    var fifteenMinutes = 60 * 15;
    var display = document.querySelector('#timer');
    if(display) {
        startTimer(fifteenMinutes, display);
    }

    // --- Lógica do FAQ (Acordeão) ---
    var acc = document.getElementsByClassName("accordion-btn");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            
            // Alterna o ícone
            var icon = this.querySelector('i');
            if (this.classList.contains("active")) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    }
});
