import {Phone , Mail } from 'lucide-react'

import insta from '../assests/img/instagram-icon.svg'
import faceebook from '../assests/img/facebook-icon.svg'
import youtube from '../assests/img/youtube.svg'

export default function Footer() {
  return (
    <div className='bg-red-900  px-4 py-8 text-white mt-13'>
      <div className=' py-4 px-4 text-white m-3 rounded-xl border-2 border-white' >
        <h3 className='text-center font-medium text-red-600 text-xl'>Scam Alert</h3>

        <h4 className='font-medium pb-3 text-xl'> Rise in Fraudulent Activities Across Channels</h4>
        <ul className="list-disc pl-6 space-y-4 text-lg marker:text-white">
          <li>Fraudsters may impersonate logistics/delivery partners asking for payment to complete delivery—do not pay. ADILQADRI never asks for financial details or payments for contests, deals, or promotions outside our official platform.</li>
          <li>If you receive such communication, don’t share details—contact us at +91 8885978692 or info@adilqadri.com and report scams to DoT.</li>
        </ul>
        <p className='mt-3 text-lg'>Stay Safe!</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-3 px-4 ">
        <section className='lg:col-span-3 col-span-12 mt-6 '>
          <h1 className='text-3xl font-bold mb-5'>ADILQADRI</h1>

          <div className="flex items-center gap-3 mb-4">
          <Phone />
            <p className='text-lg font-bold'>  +918885978692</p>
          </div>
          <div className="flex items-center gap-3">
          <Mail/>
          <p className='text-lg font-bold'>info@adilqadri.com</p>
          </div>

          <div className="flex my-3 gap-4 ">
            <img src={faceebook} alt="Facebook Icon" className='w-8 h-10' />
            <img src={insta} alt="Instagram Icon" className='w-8 h-10' />
            <img src={youtube} alt="Youtube Icon" className='w-8 h-10' />
          </div>


          <div>

          </div>
        </section>

        <section className="lg:col-span-3 col-span-6 mt-6">
          <h3 className='uppercase font-bold text-xl mb-4'>Categories</h3>
          <ul className='flex flex-col gap-3'>
            <li className='text-lg'>Get 3 Attars at ₹899</li>
            <li className='text-lg' >Get 3 Perfumes at ₹899</li>
            <li className='text-lg'>Attar</li>
            <li className='text-lg'>Perfume Spray</li>
            <li className='text-lg'>Body Spray</li>
            <li className='text-lg'>Royal attar Perfume</li>
            <li className='text-lg'>New Arrival</li>
          </ul>
        </section>

        <section className="lg:col-span-2 col-span-6 mt-6">
          <h3 className='uppercase font-bold text-xl mb-4'>Quick Links</h3>
          <ul className='capitalize flex flex-col gap-3'>
            <li className='text-lg'>Track Order</li>
            <li className='text-lg'>Wholesale & bulk inquiry</li>
            <li className='text-lg'>Account</li>
            <li className='text-lg'>About Us</li>
            <li className='text-lg'>Contact Us</li>
            <li className='text-lg'>Terms of Services</li>
            <li className='text-lg'>Privacy Policy</li>
          </ul>
        </section>

        <section className="lg:col-span-4 col-span-12 mt-6">
          <h3 className="uppercase font-bold text-xl mb-2">Newsletter</h3>
          <p className="text-lg mb-3">
            A short sentence describing what someone will receive by subscribing
          </p>

          <form className="mt-2" onSubmit={(e) => e.preventDefault()}>
            <div className="flex gap-2 items-center">
              {/* input fills available space; on small screens it stretches full width */}
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:p-3 p-2 rounded-full bg-white text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-amber-700 text-white font-semibold hover:bg-amber-800 transition"
              >
                Subscribe
              </button>
            </div>
          </form>

          {/* bottom area */}
          
        </section>
      </div>
      <div className="mt-6 flex justify-between text-gray-400">
            <p>&copy; 2026 Adilqadri | All Rights Reserved</p>
            <p>Developed by Manita</p>
          </div>
    </div>
  )
}
