import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { WishlistProvider } from './context/WishListContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
)
