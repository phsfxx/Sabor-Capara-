// Controle do menu mobile
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', () => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
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

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }

    // Animação de scroll
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

    window.addEventListener('scroll', animateOnScroll);
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

    // Gerenciar envio do formulário
    customOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Coletar valores selecionados
        const torra = this.querySelector('[aria-label="Selecione a torra"] .active').dataset.value;
        const moagem = this.querySelector('[aria-label="Selecione a moagem"] .active').dataset.value;
        const tamanho = this.querySelector('[aria-label="Selecione o tamanho"] .active').dataset.value;

        // Construir mensagem
        const mensagem = `Olá! Gostaria de pedir um café personalizado:\n\n` +
            `📦 Tamanho: ${tamanho}\n` +
            `🔥 Torra: ${torra}\n` +
            `⚙️ Moagem: ${moagem}\n\n` +
            `Por favor, me informe o valor e as formas de pagamento.`;

        // Criar link do WhatsApp
        const whatsappLink = `https://wa.me/553398221439?text=${encodeURIComponent(mensagem)}`;

        // Abrir WhatsApp em nova aba
        window.open(whatsappLink, '_blank');
    });

    // Inicializar o resumo
    updateSummary();
});

// Controle do botão de minimizar
document.addEventListener('DOMContentLoaded', function() {
    const minimizeBtn = document.querySelector('.minimize-btn');
    const minimizeText = minimizeBtn.querySelector('.minimize-text');
    const customOrderContent = document.querySelector('.custom-order-content');

    if (minimizeBtn && customOrderContent) {
        minimizeBtn.addEventListener('click', function() {
            this.classList.toggle('minimized');
            customOrderContent.classList.toggle('minimized');

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
            minimizeText.textContent = 'Expandir';
        }
    }
});