
import { useOrders } from "../../context/OrderContext";

export default function Order() {

  const { orders } = useOrders();

  return (
    <div className="bg-amber-50 py-6 px-4">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>

            <h2>{order.id}</h2>

            <p>Date: {order.date}</p>

            <p>Status: {order.status}</p>

            {order.items.map((product) => (
              <div key={product.id}>

                <img
                  src={product.img}
                  alt={product.title}
                  width="150"
                />

                <h3>{product.title}</h3>

                <p>₹{product.price}</p>

                <p>
                  Quantity: {product.quantity || 1}
                </p>

              </div>
            ))}

            <h3>
              Total: ₹{order.totalAmount}
            </h3>

          </div>
        ))
      )}
    </div>
  );
}