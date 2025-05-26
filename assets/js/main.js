// Controle do menu mobile
document.addEventListener('DOMContentLoaded', function() {
    // Verificação de compatibilidade do navegador
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInstagram = /Instagram/.test(navigator.userAgent);
    const isFacebook = /FBAN|FBAV/.test(navigator.userAgent);

    // Ajustes específicos para navegadores in-app
    if (isIOS || isInstagram || isFacebook) {
        document.body.classList.add('in-app-browser');

        // Ajuste para evitar problemas de scroll em navegadores in-app
        document.documentElement.style.webkitOverflowScrolling = 'touch';

        // Ajuste para evitar zoom indesejado em inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.fontSize = '16px'; // Evita zoom automático no iOS
        });
    }

    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Função para fechar o menu
    function closeMenu() {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', closeMenu);

    // Scroll suave para links internos com fallback
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Verifica se o navegador suporta scroll suave
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback para navegadores que não suportam scroll suave
                    window.scrollTo(0, offsetPosition);
                }
            }
        });
    });

    // Ajustar scroll ao carregar página com hash
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo(0, offsetPosition);
                }
            }, 100);
        }
    }

    // Animação de scroll com fallback
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .product-card, .about-content');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);

            if (isVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Otimização do evento de scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateOnScroll();
                scrollTimeout = null;
            }, 100);
        }
    });
    animateOnScroll(); // Executar uma vez ao carregar a página
});

// Função para manipular o formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contato-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const mensagem = this.querySelector('textarea').value;

            // Aqui você pode adicionar a lógica para enviar o email
            const mailtoLink = `mailto:saborcaparao@gmail.com?subject=Contato via Site&body=Nome: ${nome}%0D%0AEmail: ${email}%0D%0AMensagem: ${mensagem}`;
            window.location.href = mailtoLink;

            // Limpar o formulário
            this.reset();
            alert('Mensagem enviada com sucesso!');
        });
    }
});

// Gerenciamento do formulário de pedido personalizado
document.addEventListener('DOMContentLoaded', function() {
    const customOrderForm = document.getElementById('customOrderForm');
    const optionButtons = document.querySelectorAll('.option-btn');

    // Função para atualizar o resumo
    function updateSummary() {
        const torra = document.querySelector('[aria-label="Selecione a torra"] .active').dataset.value;
        const moagem = document.querySelector('[aria-label="Selecione a moagem"] .active').dataset.value;
        const tamanho = document.querySelector('[aria-label="Selecione o tamanho"] .active').dataset.value;

        document.getElementById('summary-torra').textContent = torra;
        document.getElementById('summary-moagem').textContent = moagem;
        document.getElementById('summary-tamanho').textContent = tamanho;

        // Atualiza o link do WhatsApp com as opções selecionadas
        const whatsappBtn = document.querySelector('.custom-order-btn');
        const mensagem = `Olá! Gostaria de fazer um pedido personalizado com as seguintes características:%0A%0A` +
            `Torra: ${torra}%0A` +
            `Moagem: ${moagem}%0A` +
            `Tamanho: ${tamanho}%0A%0A` +
            `Poderia me ajudar?`;

        whatsappBtn.href = `https://wa.me/553398221439?text=${mensagem}`;
    }

    // Gerenciar seleção de opções
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe active de todos os botões do mesmo grupo
            const group = this.closest('.option-buttons');
            group.querySelectorAll('.option-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Adiciona a classe active ao botão clicado
            this.classList.add('active');
            // Atualiza o resumo
            updateSummary();
        });
    });

    // Inicializar o resumo
    updateSummary();
});

// Controle do botão de minimizar
document.addEventListener('DOMContentLoaded', function() {
    const minimizeBtn = document.querySelector('.minimize-btn');
    const minimizeText = minimizeBtn.querySelector('.minimize-text');
    const customOrderContent = document.querySelector('.custom-order-content');
    const customOrder = document.querySelector('.custom-order');

    if (minimizeBtn && customOrderContent) {
        minimizeBtn.addEventListener('click', function() {
            this.classList.toggle('minimized');
            customOrderContent.classList.toggle('minimized');
            customOrder.classList.toggle('minimized');

            // Atualiza o texto do botão
            minimizeText.textContent = this.classList.contains('minimized') ? 'Expandir' : 'Minimizar';

            // Salva o estado no localStorage
            const isMinimized = customOrderContent.classList.contains('minimized');
            localStorage.setItem('customOrderMinimized', isMinimized);
        });

        // Recupera o estado salvo
        const isMinimized = localStorage.getItem('customOrderMinimized') === 'true';
        if (isMinimized) {
            minimizeBtn.classList.add('minimized');
            customOrderContent.classList.add('minimized');
            customOrder.classList.add('minimized');
            minimizeText.textContent = 'Expandir';
        }
    }
});