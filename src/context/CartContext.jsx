import { useContext, createContext, useState, useMemo } from "react";
import { toast, Bounce } from "react-toastify";
import { products } from "../user/data.js";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    // Add item into cart
    const addToCart = (product) => {

        toast.success("Item added to cart!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

        setCart((prev) => {

            const existingItem = prev.find(
                item => item.id === product.id
            );

            if (existingItem) {

                return prev.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );

            } else {

                return [
                    ...prev,
                    {
                        ...product,
                        quantity: 1
                    }
                ];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (productId, removeAll = false) => {

        toast.warning("Item removed from cart!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

        setCart((prev) => {

            const existingItem = prev.find(
                item => item.id === productId
            );

            if (!existingItem) return prev;

            // Remove complete item
            if (removeAll || existingItem.quantity === 1) {

                return prev.filter(
                    item => item.id !== productId
                );
            }

            // Decrease quantity by 1
            return prev.map(item =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            );
        });
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
    };

    // Total number of products
    const cartCount = useMemo(
        () =>
            cart.reduce(
                (total, item) => total + item.quantity,
                0
            ),
        [cart]
    );

    // Total price
    const cartTotal = useMemo(
        () =>
            cart.reduce(
                (total, item) =>
                    total + item.price * item.quantity,
                0
            ),
        [cart]
    );

    return (
        <CartContext.Provider
            value={{
                products,
                cart,
                addToCart,
                clearCart,
                removeFromCart,
                cartTotal,
                cartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);