document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Lógica do Carrossel Foz do Iguaçu (Automático)
    const track = document.getElementById('carousel-track');

    if (track) {
        let index = 0;
        const totalItems = track.children.length;

        const getItemsToShow = () => {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1024) return 2;
            return 3;
        };

        const updateCarousel = () => {
            const itemsToShow = getItemsToShow();
            const firstItem = track.children[0];
            if (!firstItem) return;

            const width = firstItem.offsetWidth + 32; // width + gap

            // Verifica se o index ultrapassou o limite máximo de scroll
            const maxIndex = totalItems - itemsToShow;
            if (index > maxIndex) index = 0;

            track.style.transform = `translateX(-${index * width}px)`;
        };

        const nextSlide = () => {
            const itemsToShow = getItemsToShow();
            if (index < totalItems - itemsToShow) {
                index++;
            } else {
                index = 0;
            }
            updateCarousel();
        };

        // Inicia o intervalo de 3 segundos
        let slideInterval = setInterval(nextSlide, 3000);

        // Pausa ao passar o mouse para facilitar a leitura/clique
        track.parentElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
        track.parentElement.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 3000);
        });

        window.addEventListener('resize', () => {
            updateCarousel();
        });
    }

    // Animação de Contagem de Estatísticas
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentCount = Math.floor(progress * target);

                if (counter.innerText.includes('+')) {
                    if (counter.innerText.startsWith('+')) counter.innerText = `+${currentCount.toLocaleString()}`;
                    else counter.innerText = `${currentCount.toLocaleString()}+`;
                } else if (counter.innerText.includes('%')) {
                    counter.innerText = `${currentCount}%`;
                } else if (counter.innerText.includes('Anos')) {
                    counter.innerText = `${currentCount} Anos`;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    // Garante o valor final exato
                    if (counter.innerText.includes('+')) {
                        if (counter.innerText.startsWith('+')) counter.innerText = `+${target.toLocaleString()}`;
                        else counter.innerText = `${target.toLocaleString()}+`;
                    } else if (counter.innerText.includes('%')) {
                        counter.innerText = `${target}%`;
                    } else if (counter.innerText.includes('Anos')) {
                        counter.innerText = `${target} Anos`;
                    }
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    if (statsSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
});
