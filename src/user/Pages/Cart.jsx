import { useCart } from '../../context/CartContext'
import { Link } from "react-router-dom"
import CartItem from '../component/CartItem'

import { ChevronLeft, Zap } from "lucide-react"

const Cart = () => {

  const { cart, cartCount, cartTotal } = useCart();
  return (
    <div className='container mx-auto px-4 md:px-6 pt-8'>
      <div className="flex items-center mb-10">
        <Link to="/" className='flex items-center text-gray-400 hover:text-amber-800 transition duration-150 font-semibold text-lg' >
          <ChevronLeft className='w-6 h-6 mr-1' />
          <span>Back to Store</span>
        </Link>
      </div>

      <h2 className='text-4xl font-semibold text-amber-800 mb-10 tracking-tight'>Shopping Cart ({cartCount})</h2>

      <div className="grid grid-cols-1 place-content-center md:grid-cols-12 gap-10">
        <div className="lg:col-span-8 md:col-span-12 space-y-4">
          {(!cart || cart.length === 0) ? (
            <div className="p-8 bg-blue-50 rounded shadow text-center">
              <p className="text-xl mb-9">Your cart is empty.</p>
              <Link to="/home" className="text-amber-700 border border-amber-800 p-2 font-medium rounded-xl hover:bg-amber-700 hover:text-white">Continue shopping</Link>
            </div>
          ) : (
            <>

              {cart.map(item => (
                // Pass the item into CartItem — CartItem needs the item prop
                <CartItem key={item.id} item={item} />
              ))}
            </>
          )}
        </div>
        <div className="lg:col-span-4 md:col-span-6   p-6 bg-gray-50 rounded-2xl shadow-2xl border-l-4 lg:sticky  lg:top-20 h-fit border border-amber-800">
          <h3 className="text-3xl font-bold mb-5 border-b text-amber-600 border-y-amber-800  flex items-center space-x-2 ">
            <div className="flex justify-between ">
              <span className='w-6 h-6 text-amber-600'>₹</span>
              <span>Order Total</span>
            </div>
          </h3>
          <div className="space-y-4 text-gray-600">
            <div className="flex justify-between text-xl">
              <span>SubTotal :</span>
              <span className='font-semibold text-gray-800'>₹{cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-xl">
              <span> Shipping (Express) :</span>
              <span className='font-semibold text-green-600'>Free</span>
            </div>

            <div className="flex justify-between pt-6 border-t border-amber-600">
              <span className='text-xl font-extrabold text-gray-700'>Estimed Total:</span>
              <span className='text-amber-700 text-2xl'>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="mt-6">
              <Link to="/checkout" className="w-full mt-8 text-center bg-amber-700 text-white font-bold text-lg rounded-2xl shadow-lg cursor-pointer hover:bg-amber-800 transition duration-300 flex items-center justify-center tracking-wider py-4 ">
                <Zap className='w-6 h-6 mr-3'> </Zap>
                <span>Proceed to Checkout</span>
              </Link>
              <p className='text-gray-500 text-xs text-center mt-3'> All transaction are encrypted and secure.</p>
            </div>
          </div>
        </div>


      </div>


    </div>
  )
}

export default Cart
