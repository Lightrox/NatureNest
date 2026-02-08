export async function fetchProducts() {
    // Try from html/ folder first (for category pages), then from root (for index.html)
    try {
        const res = await fetch("../Data/products.json");
        if (res.ok) {
            return await res.json();
        }
    } catch (err) {
        // First path failed, try root path
    }
    
    try {
        const res = await fetch("Data/products.json");
        if (!res.ok) throw new Error("Failed to load products");
        return await res.json();
    } catch (err) {
        console.error("Failed to load products:", err);
        return [];
    }
}
