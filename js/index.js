document.addEventListener('DOMContentLoaded', () => {
    fetch('Data/category.json')
        .then(response => response.json())
        .then(data => {
            const categoryGrid = document.getElementById('category-grid');
            data.forEach(category => {
                const card = document.createElement('div');
                card.className = 'category-card';
                card.innerHTML = `
                    <img src="${category.image}" alt="${category.name}">
                    <h3>${category.name}</h3>
                    <a href="${category.page_link}"  class="category-btn">Explore products</a>
                `;
                categoryGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading categories:', error));
});
document.addEventListener('DOMContentLoaded', () => {
    fetch('Data/products.json')
        .then(response => response.json())
        .then(data => {
            const productGrid = document.getElementById('product-grid');
            data.forEach(product => {
                if(product.category == 'face'){    
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.price_range}</p>
                        <a href="${product.amazon_link}"  class="product-btn">Amazon</a>
                    `;
                    productGrid.appendChild(card);
                }
            }
        );
        })
        .catch(error => console.error('Error loading products:', error));
});