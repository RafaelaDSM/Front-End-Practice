const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('.main-menu');

if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mainMenu.classList.toggle('open');
    
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Fechar menu' : 'Abrir menu'
        );
    });
}