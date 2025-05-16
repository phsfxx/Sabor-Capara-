// Gerenciamento do carrinho
let carrinho = [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto, preco) {
    const itemExistente = carrinho.find(item => item.nome === produto);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome: produto,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    abrirCarrinho();
}

// Função para remover produto do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Função para atualizar quantidade
function atualizarQuantidade(index, novaQuantidade) {
    if (carrinho[index]) {
        carrinho[index].quantidade = Math.max(1, novaQuantidade);
        atualizarCarrinho();
    }
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoItems = document.getElementById('carrinho-items');
    const carrinhoTotal = document.getElementById('carrinho-total-valor');
    const cartCount = document.querySelector('.cart-count');

    if (!carrinhoItems || !carrinhoTotal || !cartCount) return;

    carrinhoItems.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    carrinho.forEach((item, index) => {
        const itemTotal = item.preco * item.quantidade;
        total += itemTotal;
        totalItems += item.quantidade;

        const itemElement = document.createElement('div');
        itemElement.className = 'carrinho-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
            </div>
            <div class="item-controles">
                <button onclick="atualizarQuantidade(${index}, ${item.quantidade - 1})">-</button>
                <span>${item.quantidade}</span>
                <button onclick="atualizarQuantidade(${index}, ${item.quantidade + 1})">+</button>
                <button onclick="removerDoCarrinho(${index})" class="remover-btn">Remover</button>
            </div>
        `;
        carrinhoItems.appendChild(itemElement);
    });

    carrinhoTotal.textContent = total.toFixed(2);
    cartCount.textContent = totalItems;
}

// Função para abrir o carrinho
function abrirCarrinho() {
    const modal = document.getElementById('carrinho-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Função para fechar o carrinho
function fecharCarrinho() {
    const modal = document.getElementById('carrinho-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Event listeners para o carrinho
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            abrirCarrinho();
        });
    }

    // Fechar o carrinho quando clicar fora dele
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('carrinho-modal');
        if (e.target === modal) {
            fecharCarrinho();
        }
    });

    // Adicionar event listeners aos botões de adicionar ao carrinho
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const produto = this.dataset.product;
            const preco = parseFloat(this.dataset.price);
            adicionarAoCarrinho(produto, preco);
        });
    });
});