import React, { useState, useEffect } from "react";
import axios from "axios";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userId, setUserId] = useState("test-user"); // Hardcoded userId for now

  useEffect(() => {
    // Fetch the cart items for the logged-in user
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((response) => {
        const cart = response.data;
        const totalAmount = cart.items.reduce(
          (sum, item) => sum + item.productId.price * item.quantity,
          0
        );
        setCartItems(cart.items);
        setTotalAmount(totalAmount);
      })
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, [userId]);

  const handlePayment = () => {
    // Create the order
    axios
      .post("http://localhost:5000/api/orders/create", { userId })
      .then((response) => {
        const { orderId, totalAmount } = response.data;
        // Start Razorpay payment
        const options = {
          key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
          amount: totalAmount * 100, // Convert to paise (1 INR = 100 paise)
          currency: "INR",
          name: "Your Store Name",
          description: "Payment for Medicine Order",
          image: "https://example.com/logo.png", // Optional logo
          handler: function (response) {
            // After successful payment, update the order status
            axios
              .post("http://localhost:5000/api/orders/payment-success", {
                paymentId: response.razorpay_payment_id,
                orderId: orderId,
              })
              .then(() => {
                alert("Payment successful!");
                // Redirect or clear cart, etc.
              })
              .catch((err) => alert("Payment failed"));
          },
          prefill: {
            name: "John Doe",
            email: "john@example.com",
            contact: "9876543210",
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((err) => console.error("Failed to create order:", err));
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl mb-4">Checkout</h1>
      <div>
        <h2 className="text-xl">Items in your cart</h2>
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center border p-4 mb-2 rounded"
          >
            {/* Small Image */}
            <img
              src={item.productId.image} // Ensure the API includes an image URL
              alt={item.productId.name}
              className="w-16 h-16 object-cover rounded mr-4"
            />
            {/* Product Details */}
            <div>
              <h3 className="font-bold">{item.productId.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.productId.price}</p>
            </div>
          </div>
        ))}
        <h3 className="text-xl mt-4">Total Amount: ₹{totalAmount}</h3>
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white p-2 rounded mt-4 transition transform duration-300 ease-in-out hover:bg-green-600 hover:scale-105"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
