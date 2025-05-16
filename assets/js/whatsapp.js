// Constantes
const NUMERO_WHATSAPP = '553398221439';
const NUMERO_WHATSAPP_SAMUEL = '553398740637';

// Função para gerar mensagem do pedido personalizado
function gerarMensagemPedidoPersonalizado() {
    // Captura os valores selecionados em cada grupo
    const torraSelecionada = document.querySelector('.form-group:nth-child(1) .option-btn.active').dataset.value || 'Média';
    const moagemSelecionada = document.querySelector('.form-group:nth-child(2) .option-btn.active').dataset.value || 'Média (coador)';
    const tamanhoSelecionado = document.querySelector('.form-group:nth-child(3) .option-btn.active').dataset.value || '500g';

    let mensagem = 'Olá! Vi o site do Sabor Caparaó e gostaria de saber mais sobre um café com as seguintes características:\n\n';
    mensagem += '📦 Detalhes que me interessam:\n';
    mensagem += '• Torra: ' + torraSelecionada + '\n';
    mensagem += '• Moagem: ' + moagemSelecionada + '\n';
    mensagem += '• Tamanho: ' + tamanhoSelecionado + '\n\n';
    mensagem += 'Poderia me ajudar a entender melhor sobre esse tipo de café?';

    return encodeURIComponent(mensagem);
}

// Função genérica para enviar mensagem via WhatsApp
function enviarMensagemWhatsApp(numero, mensagem) {
    const url = 'https://wa.me/' + numero + '?text=' + mensagem;
    window.open(url, '_blank');
}

// Função para enviar pedido personalizado via WhatsApp
function enviarPedidoPersonalizadoWhatsApp() {
    const mensagem = gerarMensagemPedidoPersonalizado();
    enviarMensagemWhatsApp(NUMERO_WHATSAPP, mensagem);
}

// Event listener para o formulário de pedido personalizado
document.getElementById('customOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    enviarPedidoPersonalizadoWhatsApp();
});