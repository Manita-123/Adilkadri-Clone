import { useParams,  useLocation,  Link } from "react-router-dom";
import { products, ComboProducts } from "../data";
import { ChevronLeft, Tag } from "lucide-react";
import Options from "../component/Options";
import ComboProduct from "../component/ComboProducts";
import ProductList from "../component/ProductList";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
    const location = useLocation();

  // 1) prefer product passed via navigate(state)
  const productFromState = location.state?.product;

  // 2) fallback to main products array
  const productFromProducts = products.find((item) => String(item.id) === String(id));

  // 3) fallback to combo products
  const productFromCombo = (ComboProducts || []).find((item) => String(item.id) === String(id));

  const product = productFromState || productFromProducts || productFromCombo;

  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h1 className="text-2xl font-bold">
          Product Not Found
        </h1>

        <Link
          to="/"
          className="inline-block mt-5 px-5 py-3 bg-black text-white rounded"
        >
          Back To Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 my-4 md:my-8 ">

      <div className="bg-taupe-200 rounded-2xl shadow-2xl p-4 sm:p-6 mb-9">

        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-amber-800 font-semibold mb-8"
        >
          <ChevronLeft className="w-6 h-6" />
          Back To All Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center ">

          {/* Product Image */}
          <div>
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>

          {/* Product Information */}
          <div className="overflow-hidden">

            <p className="text-gray-500 mb-2">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold mb-4">
              {product.title}
            </h1>

            <p className="text-lg mb-4 w-70  bg-white px-3 py-1 rounded-4xl font font-semibold">
              ⭐ {product.rating} |  ({product.reviews} reviews)
            </p>

            <div className="flex justify-between my-3 md:mt-5 ">
              <div className="flex gap-4 items-center">

                <span className="text-3xl font-bold">
                  ₹{product.price}
                </span>

                {product.oldPrice && (
                  <span className="line-through text-xl text-gray-500">
                    ₹{product.oldPrice}
                  </span>
                )}

              </div>

              {product.discountPct && (
                <span className="bg-green-600 px-3 py-1 text-white font-semibold rounded">{product.discountPct}%</span>
              )}

            </div>

            <h2 className="text-xl fond-bold flex text-amber-800 mt-8 border-b border-e-amber-600/50 pb-2 items-center space-x-2">
              <Tag className="w-5 h-5" />
              <span>Product Ovreview</span>
            </h2>
            <p className="text-gray-500 mt-3 text-lg leading-relaxed ">{product.description}</p>

            <button
              onClick={() => addToCart(product)}
              className=" w-full flex items-center justify-center gap-3 py-3 rounded-md mt-4 text-sm font-medium cursor-pointer text-black uppercase btn-gradient "
            >
              <ShoppingCart className="w-4 h-4" />
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <Options />

      <ProductList title="Explore All items" />

      <ComboProduct title="Combo Products" />
    </div>
  );
}

export default ProductDetail;


