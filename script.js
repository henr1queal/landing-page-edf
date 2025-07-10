document.addEventListener('DOMContentLoaded', function () {

    // Base URL para o WhatsApp
    const whatsappBaseUrl = 'https://wa.me/5582999999999';

    // Seleciona todos os botões com a classe 'whatsapp-button'
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');

    // Função para abrir o link do WhatsApp
    const openWhatsApp = (message) => {
        const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Adiciona o evento de clique a cada botão
    whatsappButtons.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.getAttribute('data-message') || 'Olá! Gostaria de mais informações.';
            openWhatsApp(message);
        });
    });

    // Animações de Fade-in ao rolar a página
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up-visible');
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do elemento está visível
    });

    const elementsToAnimate = document.querySelectorAll('.animate-fade-in-up');
    elementsToAnimate.forEach(el => observer.observe(el));

    const animatedCards = document.querySelectorAll('.animate-on-scroll');

    const observer2 = new IntersectionObserver((entries) => {
        const isMobile = window.innerWidth < 768; // Define o breakpoint de mobile

        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Adiciona um atraso crescente a cada card para o efeito cascata
                entry.target.style.animationDelay = `${index * 100}ms`;

                if (isMobile) {
                    // No mobile, alterna entre esquerda e direita
                    if ((index % 2) === 0) {
                        entry.target.classList.add('is-visible', 'from-left');
                    } else {
                        entry.target.classList.add('is-visible', 'from-right');
                    }
                } else {
                    // No desktop, todos vêm da esquerda
                    entry.target.classList.add('is-visible', 'from-left');
                }

                // Para de observar o elemento depois que a animação é aplicada
                observer2.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // A animação começa quando 10% do card está visível
    });

    animatedCards.forEach(card => {
        observer2.observe(card);
    });

});