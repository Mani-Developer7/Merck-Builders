import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext(null);

const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => load('favorites'));
  const [compareList, setCompareList] = useState(() => load('compareList'));

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleCompare = (id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // cap comparison at 3 projects
      return [...prev, id];
    });
  };

  const clearCompare = () => setCompareList([]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, compareList, toggleCompare, clearCompare }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
