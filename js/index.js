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
        .catch(error => console.error('Error loading products:', error));
});