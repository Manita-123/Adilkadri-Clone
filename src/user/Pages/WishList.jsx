
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useWishlist } from "../../context/WishListContext";
import { useCart } from "../../context/CartContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-red-500" fill="red" size={28} />

          <h1 className="text-3xl font-semibold">
            My Wishlist
          </h1>

          <span className="text-gray-500">
            ({wishlist.length})
          </span>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <Heart
              size={60}
              className="mx-auto text-gray-300 mb-4"
            />

            <h2 className="text-xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Save your favorite products here.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (

          /* Wishlist Products */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {wishlist.map((product) => (
              <div
                key={product.id}
                className="border rounded-xl overflow-hidden bg-white"
              >

                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />

                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 text-amber-500"
                    aria-label="Remove from wishlist"
                  >
                    <Heart fill="red" size={22} />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-4">

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>

                  <h2 className="font-semibold mt-1">
                    {product.title}
                  </h2>

                  <p className="font-medium mt-2">
                    ₹{product.price}
                  </p>

                  <div className="flex gap-2 mt-4">

                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 text-black py-2 rounded-lg flex items-center justify-center gap-2 btn-gradient"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="border border-gray-300 px-3 rounded-lg"
                      aria-label="Remove product"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}
