import { fetchProducts } from "../core/fetchData.js";
import { renderProducts } from "../core/renderProducts.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Get category from data attribute or derive from page filename
    let category = document.body.dataset.category;
    
    if (!category) {
        // Derive category from current page filename
        const pathname = window.location.pathname;
        const pageName = pathname.split('/').pop().replace('.html', '').toLowerCase();
        // Map page names to category names in products.json
        const categoryMap = {
            'facewash': 'facewash',
            'soap': 'soap',
            'shampoo': 'shampoo',
            'hairoil': 'hairoil',
            'bodylotion': 'bodylotion',
            'protein': 'Protein'
        };
        category = categoryMap[pageName] || pageName;
    }

    const grid = document.getElementById("product-grid");
    
    if (!grid) {
        console.error("Product grid element not found!");
        return;
    }

    try {
        const products = await fetchProducts();
        
        if (!products || products.length === 0) {
            grid.innerHTML = "<p>No products available at the moment.</p>";
            return;
        }
        
        // Case-insensitive matching
        const filtered = products.filter(p => 
            p.category.toLowerCase() === category.toLowerCase()
        );
        
        renderProducts(filtered, grid);
    } catch (error) {
        console.error("Error loading products:", error);
        grid.innerHTML = "<p>Error loading products. Please try again later.</p>";
    }
});

