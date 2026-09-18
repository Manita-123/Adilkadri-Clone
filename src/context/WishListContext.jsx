
import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    // Add or remove product from wishlist
    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const alreadyLiked = prev.some((item) => item.id === product.id);

            if (alreadyLiked) {
                return prev.filter((item) => item.id !== product.id);
            }

            return [...prev, product];
        });
    };

    // Check whether product is in wishlist
    const isLiked = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                isLiked,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}