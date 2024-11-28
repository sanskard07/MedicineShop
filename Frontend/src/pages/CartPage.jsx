import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const userId = "test-user"; // Replace with dynamic userId in real app
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart data for the logged-in user
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((response) => {
        setCart(response.data.items);
      })
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, [userId]);

  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to CheckoutPage when button is clicked
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center border p-4 rounded-md"
            >
              {/* Small Image */}
              <img
                src={item.productId.image} // Ensure the API includes an image URL
                alt={item.productId.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              {/* Product Details */}
              <div className="flex-1">
                <h2 className="font-bold text-lg">{item.productId.name}</h2>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-blue-600 font-semibold">
                  Price: Rs.{item.productId.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white p-2 rounded mt-6 block mx-auto transition transform duration-300 ease-in-out hover:bg-green-600 hover:scale-105"
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
