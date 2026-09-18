import { createContext, useContext, useState } from "react";
import sampleProducts from "../../user/data" // adjust if your data path differs

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
    const [products, setProducts] = useState(sampleProducts || []);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    // Products
    function addProduct(product) {
        setProducts((p) => [{ ...product, id: `prod-${Date.now()}` }, ...p]);
    }
    function updateProduct(id, patch) {
        setProducts((p) => p.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    }
    function deleteProduct(id) {
        setProducts((p) => p.filter((it) => it.id !== id));
    }

    // Orders & Users: placeholder CRUD
    function addOrder(order) {
        setOrders((o) => [{ ...order, id: `ord-${Date.now()}` }, ...o]);
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
                setUsers,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    return useContext(AdminContext);
}