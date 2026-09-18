import { useCart } from "../../context/CartContext";

import { X } from "lucide-react";

export default function CartItem({ item }) {

  const { addToCart, removeFromCart } = useCart();

  const increaseQ = () => addToCart(item);
  const decreaseQ = () => removeFromCart(item.id);

  return (
    <div className="grid items-center justify-between p-4 sm:p-6 mb-4 bg-gray-300 rounded-xl shadow-xl border-gray-800 transition duration-300 hover:border-amber-700/50 ">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="shrink-0 w-24 h-24">
          <img
            src={item.img}
            alt={item.title || item.name}
            className="w-full h-full object-cover rounded-lg border-2 border-gray-700"
          />
        </div>
        <div className="grow min-w-0">
          <h3 className="text-xl font-bold text-blue line-clamp-1 wrap-break-words">{item.title}</h3>
          <p className="text-lg text-orange-900 font-semibold mt-1">₹{item.price.toFixed(2)}</p>
          {item.category && <div className="text-sm text-gray-600 mt-1">{item.category}</div>}
        </div>

        <div className="flex items-center gap-4 w-auto">
          <div className="flex items-center border border-amber-800 rounded-full overflow-hidden shadow-lg">
            <button
              onClick={decreaseQ}
              className="p-2 text-white bg-amber-700 transition duration-150 w-8 h-8 flex items-center justify-center hover:bg-gray-700"
              aria-label={`Decrease quantity of ${item.title}`}
            >
              -
            </button>
            <span className="px-3 text-base font-bold text-white bg-amber-700">{item.quantity}</span>
            <button
              onClick={increaseQ}
              className="p-2 text-white bg-amber-700 transition duration-150 w-8 h-8 flex items-center justify-center hover:bg-gray-700"
              aria-label={`Increase quantity of ${item.title}`}
            >
              +
            </button>
          </div>
          <div className="hidden md:block text-right w-24">
            <p className="font-extrabold text-amber-800">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>

          <button
            onClick={() => removeFromCart(item.id, true)}
            className="p-3 bg-red-800/20 text-red-500 rounded-full hover:bg-red-800/60 transition duration-150 shadow-md"
            aria-label={`Remove ${item.title} from cart`}
            title="Remove"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  )
}
