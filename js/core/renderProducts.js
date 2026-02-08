import { STORE_ICONS } from "./constants.js";

// Helper function to fix image paths based on current location
function fixImagePath(imagePath) {
    // Check if we're in a subfolder (like html/)
    const pathname = window.location.pathname;
    if (pathname.includes('/html/') || pathname.includes('\\html\\')) {
        // If image path doesn't already start with ../, add it
        if (!imagePath.startsWith('../') && !imagePath.startsWith('http')) {
            return '../' + imagePath;
        }
    }
    return imagePath;
}

// Helper function to fix icon paths
function fixIconPath(iconHtml) {
    const pathname = window.location.pathname;
    if (pathname.includes('/html/') || pathname.includes('\\html\\')) {
        return iconHtml.replace('src="images/', 'src="../images/');
    }
    return iconHtml;
}

export function renderProducts(products, container) {
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const imagePath = fixImagePath(product.image);
        const amazonIcon = fixIconPath(STORE_ICONS.amazon);

        card.innerHTML = `
            <img src="${imagePath}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price_range}</p>

            <div class="avail">
              <p>Available on</p>
              <div class="stores">
                <a href="${product.amazon_link}" target="_blank">
                    ${amazonIcon}
                </a>
              </div>
            </div>
        `;

        container.appendChild(card);
    });
}
