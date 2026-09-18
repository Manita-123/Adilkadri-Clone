import {useState} from 'react'
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products, ComboProducts } from '../../user/data'

export default function Adminproducts() {

  const allProducts =  [...products, ...ComboProducts]
  const [product , setProduct] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const navigate = useNavigate();

  console.log(product);

   // 2. Slice the array to only get the amount we want to display
  const displayedProducts = allProducts.slice(0, visibleCount);

  return (
    <>
      <div className="mb-5">
        <button onClick={() => {setProduct(true); navigate('add')} } className="rounded bg-amber-800/80 font-bold px-4 py-2 text-white hover:bg-amber-950">
          Add New Product
        </button>
      </div>
      <br/>

      <div className="grid gap-4 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 ">
        { displayedProducts && displayedProducts.map((product) => (
          <div key={product.id} className="relative rounded-xl ">
            <img src={product.img} alt={product.title} className="cover  " />
            <div className="absolute left-3 top-3 bg-black/70 text-white text-sm px-3 py-1 flex items-center rounded-full gap-2 shadow">
              <span className="text-xs">⚡</span>
              <span className="text-xs font-medium">{product.tag}</span>
            </div>
            <div className=' p-3 bg-amber-100'>
              <h2 className="text-2xl font-semibold">{product.title}</h2>
              <div className="flex gap-3 mt-3">
                <p className='line-through'>₹{product.oldPrice}</p>
                <p className='font-bold' >₹{product.price}</p>
                <div className="ml-auto inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">
                {product.discountPct}% off
              </div>
              </div>
            </div>

            <div className=" flex justify-between px-3 mb-6 bg-amber-100 pb-3 ">
            <div className="text-xs text-gray-400 mb-1">{product.category}</div>
            <div className=" bg-white/90 text-xs text-gray-800 px-2 py-1 rounded-full flex items-center gap-2 shadow">
              <Star className="w-3 h-3 text-yellow-500" viewBox="0 0 24 24" fill="currentColor" />
              <span className="font-medium">{product.rating ?? "-"}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">{product.reviews ?? 0}</span>
            </div>
          </div>
          </div>
        ))}

        
      </div>
      
      {visibleCount < allProducts.length && <div className='flex justify-center'>
        <button onClick={() => setVisibleCount(allProducts.length)} className='border-amber-800 border text-amber-700  px-10 py-3 rounded-lg font-medium hover:bg-amber-700 hover:text-white'>View More</button>
      </div>
      }
      
    </>
  )
}
