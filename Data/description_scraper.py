import json
import requests
from bs4 import BeautifulSoup
import time
import re

def scrape_amazon_description(url):
    """
    Scrape the product description from an Amazon product page.
    Returns the cleaned description text or 'No description available' if not found.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Try multiple selectors for description
        desc_selectors = [
            '#productDescription',
            '.productDescription',
            '#feature-bullets',
            '[id^="productDescription"]',
            '.a-section .a-spacing-small .a-list-item'
        ]
        
        description = None
        for selector in desc_selectors:
            elements = soup.select(selector)
            if elements:
                if selector == '#feature-bullets':
                    # Handle bullet points
                    desc_parts = [li.get_text(strip=True) for li in elements[0].select('li') if li.get_text(strip=True)]
                    description = ' • '.join(desc_parts) if desc_parts else None
                else:
                    # Get text from the first matching element
                    description = elements[0].get_text(strip=True)
                if description and len(description) > 50:  # Basic check for valid length
                    break
        
        # Fallback: look for any text in .a-size-base within description areas
        if not description:
            fallback_elements = soup.select('.a-size-base')
            for elem in fallback_elements:
                text = elem.get_text(strip=True)
                if 'shampoo' in text.lower() or 'soap' in text.lower() or len(text) > 100:
                    description = text
                    break
        
        return description if description else 'No description available'
    
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return 'Error fetching description'

def update_product_json(json_file='C:/Users/Harsh/Documents/NatureNest/json/products.json'):
    """
    Load products.json, scrape descriptions for products without one, and update the file.
    Skips products that already have a description.
    """
    try:
        # Load the JSON file
        with open(json_file, 'r', encoding='utf-8') as f:
            products = json.load(f)
        
        if not isinstance(products, list):
            print("Error: products.json should be a list of product objects.")
            return
        
        print(f"Found {len(products)} products. Checking for missing descriptions...")
        
        updated = False
        for i, product in enumerate(products):
            if 'amazon_link' not in product or not product['amazon_link']:
                print(f"Skipping product {i+1}: No amazon_link")
                continue
            
            # Skip if description already exists
            if 'description' in product and product['description']:
                print(f"Skipping product {i+1} ({product.get('name', 'Unknown')}): Description already exists")
                continue
            
            url = product['amazon_link']
            print(f"Scraping description for {product.get('name', 'Unknown')} ({i+1}/{len(products)})...")
            
            description = scrape_amazon_description(url)
            product['description'] = description
            updated = True
            
            # Polite delay to avoid rate limiting
            time.sleep(2)
        
        if updated:
            # Write back to the same file
            with open(json_file, 'w', encoding='utf-8') as f:
                json.dump(products, f, indent=2, ensure_ascii=False)
            print(f"Done! Updated {json_file} with new descriptions.")
        else:
            print("No updates needed; all products have descriptions.")
    
    except FileNotFoundError:
        print(f"Error: Could not find {json_file}. Please check the file path.")
    except Exception as e:
        print(f"Error processing {json_file}: {e}")

# Run the script with the specific file path
if __name__ == "__main__":
    update_product_json(json_file='C:\\Users\\Harsh\\Documents\\NatureNest\\Data\\products.json')