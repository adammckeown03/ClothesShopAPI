import React, { useState, useEffect } from 'react';

function CategoryProducts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/category/');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (categoryShortcode) => {
    setSelectedCategory(categoryShortcode);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/product/?category=${categoryShortcode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => handleCategoryChange(category.shortcode)}>
              {category.display_name}
            </button>
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div>
          <h2>Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <p>{product.name}</p>
                <p>Price: €{product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;
