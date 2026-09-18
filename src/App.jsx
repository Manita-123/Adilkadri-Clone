import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import CheckAuth from './auth/CheckAuth'
import { useAuth } from './context/AuthContext'

//auth
import Signup from './auth/Signup'
import Login from './auth/Login'
import UnAuthPage from './auth/UnAuth'

//User
import Home from './user/Pages/Home'
import Cart from './user/pages/Cart'
import Account from './user/Pages/Account'
import SearchFilter from './user/Pages/SearchFilter'
import ProductDetail from './user/Pages/ProductDetail'
import PageNotFound from './user/Pages/PageNotFound'
import Checkout from './user/Pages/Checkout'
import OrderConfirmation from './user/Pages/OrderConfirmation'

// Admin
import AdminLayout from "./admin/AdminLayout"
import AdminOrders from './admin/pages/Orders'
import AdminFeatures from './admin/pages/Features'
import Adminproducts from './admin/pages/Products'
import AdminDashboard from './admin/pages/Dashboard'
import UserLayout from './user/UserLayout'
import AddProducts from './admin/pages/AddProducts'


function App() {

  const { user, loading } = useAuth(); // Get from your AuthContext


  return (
    <>
      <Router>
        <CheckAuth loading={loading} user={user}>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/unauth-page' element={<UnAuthPage />} />

            {/* ADMIN ROUTES */}
            <Route path='/admin' element={<AdminLayout />} >
              <Route path='dashboard' element={<AdminDashboard />} />
              <Route path='products' element={<Adminproducts />} />
              <Route path='orders' element={<AdminOrders />} />
              <Route path='features' element={<AdminFeatures />} />
              <Route path='products/add' element={<AddProducts />} />
            </Route>

            {/* USER ROUTES */}
            <Route path='/' element={<UserLayout />} >
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="account" element={<Account />} />
              <Route path='search' element={<SearchFilter />} />
              <Route path='product/:id' element={<ProductDetail />} />
              <Route path='checkout' element={<Checkout />} />
              <Route path='order' element={<OrderConfirmation />} />
            </Route>

            {/* Catch-all route for 404 Not Found */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </CheckAuth>
      </Router>

    </>
  )
}

export default App
