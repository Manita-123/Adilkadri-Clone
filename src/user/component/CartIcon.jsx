import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom'

const CartIcon = () => {
    const { cartCount } = useCart();
    return (
        <div className="relative inline-block">
            {/* Cart Icon */}
            <Link to="/cart">
                <ShoppingCart strokeWidth={1.5} className=' text-red-900' />

                {/* Cart Count */}
                {cartCount > 0 && (
                    <span className="absolute right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6b2525] text-xs font-bold text-white transform translate-x-1/2 -translate-y-1/2">
                        {cartCount}
                    </span>
                )}
            </Link>
        </div>
    );
};

export default CartIcon;