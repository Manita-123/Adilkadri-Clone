
import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("orders");

        return savedOrders
            ? JSON.parse(savedOrders)
            : [];
    });

    // Save orders whenever orders change
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);


    // Create Order
    const createOrder = (cartItems, totalAmount) => {

        const newOrder = {
            id: `ORD-${Date.now()}`,

            date: new Date().toLocaleDateString(),

            status: "Processing",

            items: cartItems,

            totalAmount: totalAmount,
        };

        setOrders((prevOrders) => [
            newOrder,
            ...prevOrders
        ]);

        return newOrder;
    };


    return (
        <OrderContext.Provider
            value={{
                orders,
                createOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}


export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error(
            "useOrders must be used inside OrderProvider"
        );
    }
    return useContext(OrderContext);
}