import { CheckCircle, Zap} from "lucide-react"
import { Link } from 'react-router-dom'

export default function OrderConfirmation({ deliveryDetails }) {
    return (
        <div className="container mx-auto md:px-8 pt-12 ">
            <div className="p-12 bg-gray-200 rounded-3xl shadow-2xl max-w-2xl mx-auto text-center border border-green-700 text-white ">
                <CheckCircle className="sm:w-24 sm:h-24 w-12 h-12 text-green-600 mb-6 drop-shadow-lg mx-auto " />

                <h2 className="text-3xl font-extrabold text-gray-800 mb-4" >Order Confirmed!</h2>
                <p className="text-lg text-gray-500 mb-6">
                    Your transaction is complete. A confirmation email has been send to your account.
                </p>

                {deliveryDetails && <div className="p-6 bg-green-900/30 border border-green-700 rounded-xl font-mono text-left inline-block text-green-300 text-sm">
                    <p className="font-semibold text-lg mb-1">{deliveryDetails?.name}</p>
                    <p>{deliveryDetails?.address}</p>
                    <p>{deliveryDetails?.city}, {deliveryDetails?.zip}</p>
                </div>}

                
                    <Link to="/" className="w-full mt-8 text-center bg-amber-700 text-white font-bold text-lg rounded-full shadow-lg cursor-pointer hover:bg-amber-800 transition duration-300 flex items-center justify-center tracking-wider py-4 ">
                        <span>Continue Shopping</span>
                    </Link>
                </div>


            </div>
            )
}
