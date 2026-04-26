import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const DiscoveryContext = createContext(null);
const RECENTLY_VIEWED_KEY = "urbankart_recently_viewed_products";
const MAX_RECENT_ITEMS = 10;

const parseStoredRecentProducts = () => {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => item?._id) : [];
  } catch {
    return [];
  }
};

const mapProductSnapshot = (product) => ({
  _id: product._id,
  name: product.name,
  category: product.category,
  description: product.description,
  image: product.image,
  price: product.price,
  stock: product.stock
});

export const DiscoveryProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(parseStoredRecentProducts);

  useEffect(() => {
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const trackProductView = useCallback((product) => {
    if (!product?._id) return;

    const snapshot = mapProductSnapshot(product);
    setRecentlyViewed((prev) => {
      const withoutCurrent = prev.filter((item) => item._id !== snapshot._id);
      return [snapshot, ...withoutCurrent].slice(0, MAX_RECENT_ITEMS);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => setRecentlyViewed([]), []);

  const value = useMemo(
    () => ({
      recentlyViewed,
      trackProductView,
      clearRecentlyViewed
    }),
    [recentlyViewed, trackProductView, clearRecentlyViewed]
  );

  return <DiscoveryContext.Provider value={value}>{children}</DiscoveryContext.Provider>;
};

export const useDiscovery = () => useContext(DiscoveryContext);
