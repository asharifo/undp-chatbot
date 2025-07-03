window.addEventListener('load', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');

    // Expand navbar
    navbar.classList.add('open');

    // Reveal hero content after navbar expands
    setTimeout(() => {
        hero.classList.add('show');
    }, 1200);
});
