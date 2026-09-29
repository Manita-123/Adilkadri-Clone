import React, { useState } from 'react'
import { useCart } from '../../context/CartContext'

import { Package, MapPin, Zap } from 'lucide-react'
import OrderConfirmation from './OrderConfirmation';

export default function Checkout() {

    const { cartTotal, clearCart, cart } = useCart();

    const [deliveryDetails, setDeliveryDetails] = useState({
        name: "",
        address: "",
        city: "",
        zip: ""
    });

    const [isConfirmed, setIsConfirmed] = useState(false)

    const handlChange = (e) => {
        const { name, value } = e.target;
        setDeliveryDetails(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        clearCart();
        setIsConfirmed(true);
    }


    if (isConfirmed) return <OrderConfirmation deliveryDetails={deliveryDetails} />

    return (
        <div className='container mx-auto px-4 md:px-6 pt-8'>
            <h2 className="text-3xl sm:text-5xl font-semibold text-gray-600 mb-8 tracking-tight">Finalize Order</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 sm:p-8 px-3 py-5 lg:mx-8 bg-amber-50 rounded-2xl border border-amber-800 ">
                    <h3 className='text-xl sm:text-3xl font-bold text-amber-800 mb-6 flex items-center space-x-3 border-b border-amber-300'>
                        <MapPin className='h-10 pb-3' />
                        <span className='pb-3'>Shipping Information</span>
                    </h3>

                    <form className='space-y-6' onSubmit={handleSubmit}>
                        {Object.keys(deliveryDetails).map(key => (
                            <div key={key}>
                                <label htmlFor={key} className='block text-sm text-gray-400 font-semimobold capitalize mb-1'>
                                    {key === 'zip' ? "Pin Code" : key}
                                </label>
                                <input onChange={handlChange} type={key === 'zip' ? "number" : "text"} id={key} name={key} value={deliveryDetails[key]} required className='mt-1 mb-5 block w-full px-5 py-3 border border-gray-700 rounded-xl shadow-inner text-gray-950 bg-gray-100 placeholder-gray-500' />
                            </div>
                        ))}

                        <div className="sm:pt-6 ">
                            <button type='submit' className='w-full mt-8 text-center bg-amber-700 text-white font-bold sm:text-lg rounded-2xl shadow-lg cursor-pointer hover:bg-amber-800 transition duration-300 flex items-center justify-center tracking-wider py-4  '>
                                <span>Pay and confirm Order (₹{cartTotal.toFixed(2)})</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-1 p-8 md:mx-8 bg-gray-50 rounded-2xl shadow-2xl border-l-4 lg:sticky  lg:top-20 h-fit border border-amber-800">
                    <h3 className="text-3xl font-bold mb-5 border-b text-amber-600 border-y-amber-800  flex items-center space-x-2 ">
                        <Package />
                        <span className='pb-2'>Summary</span>
                    </h3>

                    <div className="space-y-4 text-gray-600 my-7">
                        {cart.map((item) => (
                            <div key={item.id} className='flex justify-between text-base border-b border-gray-400 pb-2'>
                                <span className='trucate text-gray-600'>{item.title}</span>
                                <span className='font-medium text-amber-500'>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between text-xl">
                            <span>SubTotal :</span>
                            <span className='font-semibold text-gray-800'>{cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-xl">
                            <span> Shipping (Express) :</span>
                            <span className='font-semibold text-green-600'>Free</span>
                        </div>

                        <div className="flex justify-between pt-6 border-t border-amber-600">
                            <span className='text-xl font-extrabold text-gray-700'>Total Due:</span>
                            <span className='text-amber-700 text-2xl font-bold'>₹{cartTotal.toFixed(2)}</span>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
