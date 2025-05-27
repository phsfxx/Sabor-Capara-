document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const modal = document.getElementById('revendedorModal');
    const closeModal = document.querySelector('.close-modal');
    const revendedorForm = document.getElementById('revendedorForm');
    const documentoInput = document.getElementById('documento-revendedor');
    const revendedorLink = document.getElementById('revendedorLink');

    // Função para aplicar máscara dinâmica
    function aplicarMascaraDocumento(valor) {
        valor = valor.replace(/[^\d]/g, '');

        if (valor.length <= 11) {
            // Máscara de CPF
            return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else {
            // Máscara de CNPJ
            return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
    }

    // Event listener para o campo de documento
    if (documentoInput) {
        documentoInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/[^\d]/g, '');

            // Limitar a 14 dígitos (tamanho máximo do CNPJ)
            if (valor.length > 14) {
                valor = valor.slice(0, 14);
            }

            // Aplicar máscara
            e.target.value = aplicarMascaraDocumento(valor);
        });
    }

    // Função para abrir o modal
    function openRevendedorModal() {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Função para fechar o modal
    function closeRevendedorModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Event Listeners
    if (closeModal) {
        closeModal.addEventListener('click', closeRevendedorModal);
    }

    // Fechar modal ao clicar fora dele
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeRevendedorModal();
            }
        });
    }

    // Inicializar máscaras
    if (typeof $ !== 'undefined') {
        $('#telefone-revendedor').mask('(00) 0 0000-0000');
    }

    // Mensagens-padrão para cada modalidade
    const mensagensPadrao = {
        'condicional-vista': {
            assunto: 'Solicitação de Revenda à Vista - Sabor Caparaó',
            corpo: (dados) => `
Prezada Equipe Sabor Caparaó,

Me chamo ${dados.nome} e venho por meio deste manifestar meu interesse em estabelecer uma parceria comercial como revendedor dos produtos Sabor Caparaó.

Confirmo meu interesse na modalidade de revenda à vista, com pagamento realizado no ato da retirada dos produtos. Esta modalidade demonstra meu compromisso com uma parceria sólida e transparente.

Dados para Análise:
------------------
Nome Completo: ${dados.nome}
Telefone: ${dados.telefone}
Documento: ${dados.documento}
E-mail: ${dados.email}
Cidade: ${dados.cidade}
Estado: ${dados.estado}

Mensagem Adicional:
------------------
${dados.mensagem}

Aguardo o retorno para prosseguirmos com a parceria.

Atenciosamente,
${dados.nome}`
        },
        'condicional-prazo': {
            assunto: 'Solicitação de Revenda a Prazo - Sabor Caparaó',
            corpo: (dados) => `
Prezada Equipe Sabor Caparaó,

Me chamo ${dados.nome} e venho por meio deste manifestar meu interesse em estabelecer uma parceria comercial como revendedor dos produtos Sabor Caparaó.

Confirmo meu interesse na modalidade de revenda a prazo, ciente de que esta está condicionada à análise e aprovação prévia por parte da empresa, conforme critérios estabelecidos.

Dados para Análise:
------------------
Nome Completo: ${dados.nome}
Telefone: ${dados.telefone}
Documento: ${dados.documento}
E-mail: ${dados.email}
Cidade: ${dados.cidade}
Estado: ${dados.estado}

Mensagem Adicional:
------------------
${dados.mensagem}

Estou à disposição para enviar documentação adicional se necessário.

Atenciosamente,
${dados.nome}`
        }
    };

    // Manipulação do formulário
    if (revendedorForm) {
        revendedorForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validar campos obrigatórios
            const camposObrigatorios = {
                'nome-revendedor': 'Nome Completo',
                'email-revendedor': 'Email',
                'telefone-revendedor': 'Telefone',
                'documento-revendedor': 'CPF/CNPJ',
                'cidade-revendedor': 'Cidade',
                'estado-revendedor': 'Estado',
                'mensagem-revendedor': 'Mensagem'
            };

            let camposFaltantes = [];
            for (const [id, nome] of Object.entries(camposObrigatorios)) {
                const campo = document.getElementById(id);
                if (!campo || !campo.value.trim()) {
                    camposFaltantes.push(nome);
                }
            }

            // Verificar se uma modalidade foi selecionada
            const modalidadeSelecionada = document.querySelector('input[name="modalidade"]:checked');
            if (!modalidadeSelecionada) {
                camposFaltantes.push('Modalidade de Pagamento');
            }

            // Se houver campos faltantes, mostrar mensagem de erro
            if (camposFaltantes.length > 0) {
                alert(`Por favor, preencha todos os campos obrigatórios:\n${camposFaltantes.join('\n')}`);
                return;
            }

            // Validar formato do email
            const email = document.getElementById('email-revendedor').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um endereço de email válido.');
                return;
            }

            // Validar formato do telefone
            const telefone = document.getElementById('telefone-revendedor').value;
            const telefoneRegex = /^\(\d{2}\) \d \d{4}-\d{4}$/;
            if (!telefoneRegex.test(telefone)) {
                alert('Por favor, insira um número de telefone válido no formato (XX) X XXXX-XXXX');
                return;
            }

            // Validar formato do documento (CPF ou CNPJ)
            const documento = document.getElementById('documento-revendedor').value;
            const documentoRegex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/;
            if (!documentoRegex.test(documento)) {
                alert('Por favor, insira um CPF ou CNPJ válido.');
                return;
            }

            // Coletar dados do formulário
            const formData = {
                nome: document.getElementById('nome-revendedor').value.trim(),
                telefone: telefone,
                documento: documento,
                email: email,
                cidade: document.getElementById('cidade-revendedor').value.trim(),
                estado: document.getElementById('estado-revendedor').value.trim(),
                mensagem: document.getElementById('mensagem-revendedor').value.trim(),
                modalidade: modalidadeSelecionada.value
            };

            // Obter a mensagem correspondente à modalidade
            const mensagem = mensagensPadrao[formData.modalidade];
            if (!mensagem) {
                alert('Erro ao processar a modalidade selecionada. Por favor, tente novamente.');
                return;
            }

            // Criar o link mailto com a mensagem formatada
            const mailtoLink = `mailto:saborcaparao@gmail.com?subject=${encodeURIComponent(mensagem.assunto)}&body=${encodeURIComponent(mensagem.corpo(formData))}`;

            // Abrir o cliente de e-mail
            window.location.href = mailtoLink;

            // Mostrar mensagem de sucesso
            revendedorForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Cadastro Enviado!</h3>
                    <p>Seu cadastro foi enviado para análise. Em breve, entraremos em contato por e-mail com a proposta detalhada.</p>
                </div>
            `;

            // Fechar modal após 5 segundos
            setTimeout(closeRevendedorModal, 5000);
        });
    }

    // Event listener para o link do menu
    if (revendedorLink) {
        revendedorLink.addEventListener('click', (e) => {
            e.preventDefault();
            openRevendedorModal();
        });
    }
});

function updateWhatsAppLink() {
    // Verificar se os elementos existem antes de acessá-los
    const torraElement = document.getElementById('summary-torra');
    const moagemElement = document.getElementById('summary-moagem');
    const tamanhoElement = document.getElementById('summary-tamanho');
    const modalidadeRadio = document.querySelector('input[name="modalidade"]:checked');
    const whatsappLink = document.querySelector('.custom-order-btn');

    // Se algum elemento não existir, retornar sem fazer nada
    if (!torraElement || !moagemElement || !tamanhoElement || !modalidadeRadio || !whatsappLink) {
        return;
    }

    const torra = torraElement.textContent;
    const moagem = moagemElement.textContent;
    const tamanho = tamanhoElement.textContent;
    const modalidade = modalidadeRadio.value === 'vista' ? 'À Vista' : 'A Prazo';

    const message = `Olá! Vi o site do Sabor Caparaó e gostaria de fazer um pedido personalizado:

Torra: ${torra}
Moagem: ${moagem}
Tamanho: ${tamanho}
Pagamento: ${modalidade}

Poderia me ajudar?`;

    whatsappLink.href = `https://wa.me/553398221439?text=${encodeURIComponent(message)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para as opções de torra, moagem e tamanho
    const optionButtons = document.querySelectorAll('.option-btn');
    if (optionButtons.length > 0) {
        optionButtons.forEach(button => {
            button.addEventListener('click', updateWhatsAppLink);
        });
    }

    // Event listener para a modalidade de pagamento
    const modalidadeRadios = document.querySelectorAll('input[name="modalidade"]');
    if (modalidadeRadios.length > 0) {
        modalidadeRadios.forEach(radio => {
            radio.addEventListener('change', updateWhatsAppLink);
        });
    }

    // Atualiza o link inicialmente
    updateWhatsAppLink();
});