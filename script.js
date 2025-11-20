// Dados de exemplo para demonstração
const sampleProducts = [
    {
        id: 1,
        name: "Smartphone Samsung Galaxy",
        description: "Smartphone Android com 128GB de armazenamento, câmera tripla e tela de 6.4 polegadas.",
        price: 1299.99,
        category: "eletronicos",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Livro: Clean Code",
        description: "Um manual de agile software craftsmanship. Um dos livros mais importantes para desenvolvedores.",
        price: 89.90,
        category: "livros",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Tênis Nike Air Max",
        description: "Tênis esportivo com tecnologia Air Max para máximo conforto e amortecimento.",
        price: 299.99,
        category: "roupas",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Cafeteira Elétrica",
        description: "Cafeteira automática com timer digital e jarra térmica de 1.5L.",
        price: 199.50,
        category: "casa",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Fone de Ouvido Bluetooth",
        description: "Fone sem fio com cancelamento de ruído ativo e bateria de 30 horas.",
        price: 349.99,
        category: "eletronicos",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Mesa de Escritório",
        description: "Mesa moderna em MDF com estrutura em aço e acabamento em carvalho.",
        price: 459.00,
        category: "casa",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
    }
];

// Elementos DOM
let products = [...sampleProducts];
const productsGrid = document.getElementById('products-grid');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const productForm = document.getElementById('product-form');
const successModal = document.getElementById('success-modal');
const closeModal = document.querySelector('.close-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Categorias para mapeamento
const categoryNames = {
    'eletronicos': 'Eletrônicos',
    'livros': 'Livros',
    'roupas': 'Roupas',
    'casa': 'Casa e Decoração'
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupEventListeners();
    setupSmoothScrolling();
});

// Configurar event listeners
function setupEventListeners() {
    // Filtros
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    
    // Formulário
    productForm.addEventListener('submit', handleFormSubmit);
    
    // Modal
    closeModal.addEventListener('click', closeSuccessModal);
    modalCloseBtn.addEventListener('click', closeSuccessModal);
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            closeSuccessModal();
        }
    });
}

// Configurar scroll suave para âncoras
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Renderizar produtos na grade
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <p>Nenhum produto encontrado.</p>
                <p>Tente ajustar os filtros de busca.</p>
            </div>
        `;
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Criar card de produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" 
             onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">R$ ${product.price.toFixed(2)}</div>
        <span class="product-category">${categoryNames[product.category]}</span>
    `;
    
    return card;
}

// Filtrar produtos
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    const filteredProducts = sampleProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    products = filteredProducts;
    renderProducts(filteredProducts);
}

// Manipular envio do formulário
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const formData = {
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-description').value,
            price: parseFloat(document.getElementById('product-price').value),
            category: document.getElementById('product-category').value,
            image: document.getElementById('product-image').value || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
        };
        
        // Simular cadastro (na versão completa, isso iria para o PHP/MySQL)
        simulateProductRegistration(formData);
    }
}

// Validar formulário
function validateForm() {
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
    
    // Validar nome
    const nameInput = document.getElementById('product-name');
    const nameError = document.getElementById('name-error');
    if (!nameInput.value.trim()) {
        nameError.textContent = 'O nome do produto é obrigatório';
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'O nome deve ter pelo menos 2 caracteres';
        isValid = false;
    }
    
    // Validar preço
    const priceInput = document.getElementById('product-price');
    const priceError = document.getElementById('price-error');
    if (!priceInput.value) {
        priceError.textContent = 'O preço é obrigatório';
        isValid = false;
    } else if (parseFloat(priceInput.value) <= 0) {
        priceError.textContent = 'O preço deve ser maior que zero';
        isValid = false;
    }
    
    // Validar categoria
    const categoryInput = document.getElementById('product-category');
    const categoryError = document.getElementById('category-error');
    if (!categoryInput.value) {
        categoryError.textContent = 'A categoria é obrigatória';
        isValid = false;
    }
    
    return isValid;
}

// Simular registro de produto
function simulateProductRegistration(productData) {
    // Criar ID temporário
    const tempId = Date.now();
    
    // Adicionar à lista de produtos
    const newProduct = {
        id: tempId,
        ...productData
    };
    
    // Mostrar modal de sucesso
    showSuccessModal(newProduct);
    
    // Limpar formulário
    productForm.reset();
    
    // Adicionar produto à lista (opcional)
    // products.unshift(newProduct);
    // renderProducts(products);
}

// Mostrar modal de sucesso
function showSuccessModal(product) {
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = product.price.toFixed(2);
    document.getElementById('modal-product-category').textContent = categoryNames[product.category];
    
    successModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar modal de sucesso
function closeSuccessModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Validação em tempo real
document.getElementById('product-name').addEventListener('blur', function() {
    const errorElement = document.getElementById('name-error');
    if (!this.value.trim()) {
        errorElement.textContent = 'O nome do produto é obrigatório';
    } else if (this.value.trim().length < 2) {
        errorElement.textContent = 'O nome deve ter pelo menos 2 caracteres';
    } else {
        errorElement.textContent = '';
    }
});

document.getElementById('product-price').addEventListener('blur', function() {
    const errorElement = document.getElementById('price-error');
    if (!this.value) {
        errorElement.textContent = 'O preço é obrigatório';
    } else if (parseFloat(this.value) <= 0) {
        errorElement.textContent = 'O preço deve ser maior que zero';
    } else {
        errorElement.textContent = '';
    }
});

// Efeitos visuais para cards de produto
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleY = (x - centerX) / 25;
        const angleX = (centerY - y) / 25;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
});

document.addEventListener('mouseleave', function() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .product-form, .about-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Loading simulation (opcional)
function simulateLoading() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.innerHTML = 'Carregando...';
    loadingElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        z-index: 3000;
    `;
    document.body.appendChild(loadingElement);
    
    setTimeout(() => {
        loadingElement.remove();
    }, 1000);
}

// Inicializar loading na primeira visita
if (!sessionStorage.getItem('visited')) {
    simulateLoading();
    sessionStorage.setItem('visited', 'true');
}