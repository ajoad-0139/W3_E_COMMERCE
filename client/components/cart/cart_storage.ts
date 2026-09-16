const CART_STORAGE_KEY = "cart-product-ids";

export const getCartProductIds = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const addProductToCart = (productId: string) => {
  const ids = getCartProductIds();

  if (!ids.includes(productId)) {
    ids.push(productId);
  }

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(ids)
  );

  window.dispatchEvent(new Event("cart-updated"));
};

export const removeProductFromCart = (productId: string) => {
  const ids = getCartProductIds();

  const updatedIds = ids.filter(
    (id) => id !== productId
  );

  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(updatedIds)
  );

  window.dispatchEvent(new Event("cart-updated"));
};

export const clearCartStorage = () => {
  localStorage.removeItem(CART_STORAGE_KEY);

  window.dispatchEvent(new Event("cart-updated"));
};

export const isProductInCart = (productId: string): boolean => {
  const ids = getCartProductIds();

  return ids.includes(productId);
};