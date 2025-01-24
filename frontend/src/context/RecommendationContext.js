// RecommendationContext.js
import React, { createContext, useState } from 'react';

export const RecommendationContext = createContext({
  recommendations: [],
  setRecommendations: () => {},
});

export const RecommendationsProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <RecommendationContext.Provider
      value={{ recommendations, setRecommendations }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};
