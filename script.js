

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-fade-in-up');
    elementsToAnimate.forEach(el => observer.observe(el));

    const animatedCards = document.querySelectorAll('.animate-on-scroll');

    const observer2 = new IntersectionObserver((entries) => {
        const isMobile = window.innerWidth < 768;

        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 20}ms`;

                if (isMobile) {
                    if ((index % 2) === 0) {
                        entry.target.classList.add('is-visible', 'from-left');
                    } else {
                        entry.target.classList.add('is-visible', 'from-right');
                    }
                } else {
                    entry.target.classList.add('is-visible', 'from-left');
                }

                observer2.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedCards.forEach(card => {
        observer2.observe(card);
    });

});