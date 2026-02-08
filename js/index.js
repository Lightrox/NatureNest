async function fetchCategories() {
    try {
        const res = await fetch("Data/category.json");
        if (!res.ok) throw new Error("Failed to load categories");
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

function renderCategories(categories, container) {
    container.innerHTML = "";

    if (categories.length === 0) {
        container.innerHTML = "<p>No categories found.</p>";
        return;
    }

    categories.forEach(category => {
        const card = document.createElement("div");
        card.className = "category-card";

        card.innerHTML = `
            <img src="${category.image}" alt="${category.name}">
            <h3>${category.name}</h3>
            <a href="${category.page_link}" class="category-btn">Shop Now</a>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("category-grid");
    const categories = await fetchCategories();
    renderCategories(categories, grid);
});

