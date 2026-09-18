import { createContext, useContext, useState } from "react";
import {products, ComboProducts} from "../../user/data";

const AdminContext = createContext(null);

const sampleProducts = [products, ComboProducts];


export function AdminProvider({ children }) {

    // Load products from localStorage first
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");

        return savedProducts
            ? JSON.parse(savedProducts)
            : sampleProducts || [];
    });

    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    // -------------------------
    // Products
    // -------------------------

    function addProduct(product) {

        const newProduct = {
            ...product,
            id: `prod-${Date.now()}`
        };

        setProducts((prevProducts) => {

            const updatedProducts = [
                newProduct,
                ...prevProducts
            ];

            localStorage.setItem(
                "products",
                JSON.stringify(updatedProducts)
            );

            return updatedProducts;
        });
    }

    function updateProduct(id, patch) {

        setProducts((prevProducts) => {

            const updatedProducts = prevProducts.map((item) =>
                item.id === id
                    ? { ...item, ...patch }
                    : item
            );

            localStorage.setItem(
                "products",
                JSON.stringify(updatedProducts)
            );

            return updatedProducts;
        });
    }

    function deleteProduct(id) {

        setProducts((prevProducts) => {

            const updatedProducts = prevProducts.filter(
                (item) => item.id !== id
            );

            localStorage.setItem(
                "products",
                JSON.stringify(updatedProducts)
            );

            return updatedProducts;
        });
    }

    // -------------------------
    // Orders
    // -------------------------

    function addOrder(order) {

        setOrders((prevOrders) => [
            {
                ...order,
                id: `ord-${Date.now()}`
            },
            ...prevOrders
        ]);
    }

    return (
        <AdminContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct,

                orders,
                addOrder,

                users,
                setUsers
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);

    if (!context) {
        throw new Error(
            "useAdmin must be used inside AdminProvider"
        );
    }

    return context;
}