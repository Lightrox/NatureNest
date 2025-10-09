import json
import os

def get_user_input():
    """
    Prompt user for product details and return a dictionary with the data.
    Adds 'images/' prefix to image path and '₹' to price range.
    Returns None if the user chooses to exit.
    """
    print("\nEnter product details (or type 'exit' to finish):")
    
    name = input("Product Name: ").strip()
    if name.lower() == 'exit':
        return None
    
    image = input("Image Path (e.g., Shampoo/Rustic.jpg, will be prefixed with 'images/'): ").strip()
    if image.lower() == 'exit':
        return None
    # Add 'images/' prefix if not already present
    image = f"images/{image}" if not image.startswith('images/') else image
    
    price_range = input("Price Range (e.g., 320-330/210g, ₹ will be added): ").strip()
    if price_range.lower() == 'exit':
        return None
    # Add '₹' prefix if not already present
    price_range = f"₹{price_range}" if not price_range.startswith('₹') else price_range
    
    amazon_link = input("Amazon Link (e.g., https://amzn.in/d/iTjRSzT): ").strip()
    if amazon_link.lower() == 'exit':
        return None
    
    category = input("Category (e.g., shampoo, soap): ").strip()
    if category.lower() == 'exit':
        return None
    
    return {
        "name": name,
        "image": image,
        "price_range": price_range,
        "amazon_link": amazon_link,
        "category": category
    }

def add_to_products_json(json_file='C:\\Users\\Harsh\\Documents\\NatureNest\\Data\\products.json'):
    """
    Load products.json, append new product data, and save back to the file.
    Creates the file if it doesn't exist.
    """
    try:
        # Check if file exists and load existing products
        if os.path.exists(json_file):
            with open(json_file, 'r', encoding='utf-8') as f:
                try:
                    products = json.load(f)
                    if not isinstance(products, list):
                        print("Error: products.json should be a list. Starting with empty list.")
                        products = []
                except json.JSONDecodeError:
                    print("Error: Invalid JSON format in products.json. Starting with empty list.")
                    products = []
        else:
            print(f"{json_file} not found. Creating new file.")
            products = []
        
        while True:
            product = get_user_input()
            if product is None:
                print("Exiting input mode.")
                break
            
            products.append(product)
            print(f"Added {product['name']} to the list.")
        
        # Save updated products back to the file
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(products, f, indent=2, ensure_ascii=False)
        
        print(f"Updated {json_file} with {len(products)} products.")
    
    except Exception as e:
        print(f"Error processing {json_file}: {e}")

# Run the script with the specific file path
if __name__ == "__main__":
    add_to_products_json(json_file='C:\\Users\\Harsh\\Documents\\NatureNest\\Data\\products.json')