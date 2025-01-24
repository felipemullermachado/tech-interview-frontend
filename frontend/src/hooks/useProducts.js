import { useEffect, useState } from 'react';
import getProducts from '../services/product.service';

/**
 * Custom hook to fetch and manage products, preferences, and features.
 *
 * @returns {Object} An object containing preferences, features, and products.
 * @property {Array} preferences - A list of randomly selected preferences from the products.
 * @property {Array} features - A list of randomly selected features from the products.
 * @property {Array} products - A list of all fetched products.
 */
const useProducts = () => {
  const [preferences, setPreferences] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const allPreferences = [];
        const allFeatures = [];

        setProducts(products);

        products.forEach((product) => {
          const productPreferences = product.preferences
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          allPreferences.push(...productPreferences);

          const productFeatures = product.features
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          allFeatures.push(...productFeatures);
        });

        setPreferences(allPreferences);
        setFeatures(allFeatures);
      } catch (error) {
        console.error('Erro ao obter os produtos:', error);
      }
    };

    fetchData();
  }, []);

  return { preferences, features, products };
};

export default useProducts;
