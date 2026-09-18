import { ShoppingCart, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();

  const { toggleWishlist, isLiked } = useWishlist();

  if (!product) {
    console.log("Product is undefined!");
    return null;
  }

  const {
    id,
    tag,
    img,
    category,
    title,
    rating,
    reviews,
    price,
    oldPrice,
    discountPct
  } = product;

  // Check whether this product is in wishlist
  const liked = isLiked(id);

  return (
    <article className="snap-start w-68 md:w-80 bg-white rounded-xl shadow-md relative overflow-hidden">

      <Link
        to={`/product/${id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-amber-200"
      >

        <div className="relative w-full h-52 md:h-68 overflow-hidden">

          <img
            src={img}
            alt={title}
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/600x400?text=Image+not+found";
            }}
            className="w-80 h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-90"
            loading="lazy"
          />

          {tag && (
            <>
              {/* Product Tag */}
              <div className="absolute left-3 top-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2 shadow">
                <span className="text-xs">⚡</span>

                <span className="text-xs font-medium">
                  {tag}
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  toggleWishlist(product);
                }}
                className={`absolute right-3 top-3 transition-colors ${
                  liked ? "text-amber-500" : "text-gray-300"
                }`}
                aria-label={
                  liked
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <Heart
                  size={22}
                  className={liked ? "fill-current" : ""}
                />
              </button>
            </>
          )}

          {/* Rating */}
          <div className="flex justify-between m-3 mx-3">

            <div className="text-xs text-gray-400 mb-1">
              {category}
            </div>

            <div className="bg-white/90 text-xs text-gray-800 px-2 py-1 rounded-full flex items-center gap-2 shadow">

              <Star
                className="w-3 h-3 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              />

              <span className="font-medium">
                {rating ?? "-"}
              </span>

              <span className="text-gray-400">
                |
              </span>

              <span className="text-gray-500">
                {reviews ?? 0}
              </span>

            </div>
          </div>

        </div>

        {/* Product Details */}
        <div className="mt-6 px-3">

          <h3 className="font-semibold text-xl text-gray-900 wordwra md:text-2xl leading-tight mb-2 whitespace-pre-line">
            {title}
          </h3>

          <div className="flex items-center gap-3 mb-4">

            <div className="text-lg font-bold text-gray-900">
              ₹{price}
            </div>

            {oldPrice && (
              <div className="text-sm text-gray-600 line-through">
                ₹{oldPrice}
              </div>
            )}

            {discountPct && (
              <div className="ml-auto inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">
                {discountPct}% off
              </div>
            )}

          </div>

        </div>

      </Link>

      {/* Add To Cart */}
      <div className="px-3">

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            addToCart(product);
          }}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-md text-sm font-medium cursor-pointer text-black uppercase btn-gradient mb-2"
        >
          <ShoppingCart className="w-4 h-4" />

          ADD TO CART
        </button>

      </div>

    </article>
  );
}