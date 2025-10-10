document.addEventListener('DOMContentLoaded', () => {
    // --- Load categories dynamically ---
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
                    <a href="${category.page_link}" class="category-btn">Explore products</a>
                `;
                categoryGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading categories:', error));

    // --- Initialize floating decor items ---
    const decorItems = document.querySelectorAll('.decor-item');
    const hero = document.querySelector('.hero-quote'); // or '.hero' if your section uses that

    decorItems.forEach(item => {
        const maxLeft = hero.clientWidth - item.offsetWidth;
        const maxTop = hero.clientHeight - item.offsetHeight;

        const randomLeft = Math.random() * maxLeft;
        const randomTop = Math.random() * maxTop;

        item.style.left = `${randomLeft}px`;
        item.style.top = `${randomTop}px`;

        // Slow down by doubling duration
        const baseDuration = 18 + Math.random() * 10; // original
        item.style.animationDuration = `${baseDuration * 2}s`; // half speed
        item.style.animationDelay = `${Math.random() * 5}s`;
    });

});
