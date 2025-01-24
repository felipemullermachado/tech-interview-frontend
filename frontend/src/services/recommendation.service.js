/**
 * Get product recommendations based on selected preferences, features, and recommendation type.
 *
 * @param {Object} formData - The form data containing selected preferences, features, and recommendation type.
 * @param {Array} formData.selectedPreferences - The selected preferences.
 * @param {Array} formData.selectedFeatures - The selected features.
 * @param {string} formData.selectedRecommendationType - The type of recommendation ('SingleProduct' or other).
 * @param {Array} products - The list of products to rank and recommend.
 * @returns {Array} The list of recommended products, sorted by rank and id.
 */
const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  products
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType = [],
  } = formData;

  // Complexidade
  // O(n * m^2), onde n é o número de produtos, e m é o número de features ou preferences selecionadas
  // Se m for pequeno, a complexidade é O(n)

  const rankedProducts = products
    .map((product) => ({
      ...product,
      rank:
        product.features.filter((feature) => selectedFeatures.includes(feature))
          .length +
        product.preferences.filter((preference) =>
          selectedPreferences.includes(preference)
        ).length,
    }))
    .filter(({ rank }) => rank);

  // Complexidade
  // O(n*log(n))

  // A lista recommendations é ordenada de forma decrescente pelo rank e,
  // em caso de empate, pelo maior ID de produto.

  const recommendations = rankedProducts.sort((a, b) => {
    if (a.rank < b.rank) {
      return 1;
    } else if (a.rank > b.rank) {
      return -1;
    } else {
      if (a.id < b.id) {
        return 1;
      } else if (a.id > b.id) {
        return -1;
      }
      return 0;
    }
  });

  if (selectedRecommendationType === 'SingleProduct') {
    return recommendations.slice(0, 1);
  } else {
    return recommendations;
  }
};

const recommendationService = { getRecommendations };

export default recommendationService;
