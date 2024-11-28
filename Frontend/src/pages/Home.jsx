import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState("test-user"); // Hardcoded userId for simplicity
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch products from backend
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter the products or fetch based on the search query
    axios
      .get(`http://localhost:5000/api/products?search=${searchQuery}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.error(err));
  };

  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        userId: userId,
        productId: productId,
        quantity: 1,
      });
      alert("Added to Cart!");
    } catch (err) {
      console.log("Failed to add to cart:", err);
    }
  };

  return (
    <div className="mx-32">
      {/* Search Bar */}

      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full shadow-md px-4 py-4 mt-8 mb-2 w-full"
        // Ensures the entire form has proper width and spacing.
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 15.232l4.768 4.768M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search your Medicines"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="outline-none font-sans text-gray-700 flex-grow text-lg pl-2"
          // Adjusted `pl-2` for balanced padding within the input field.
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-lg"
          // Adjusted button color to match the image reference and added `px-6` for better size.
        >
          Search
        </button>
      </form>

      <h1 className="text-center font-lato text-3xl m-10 mb-6">Medicines</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        className="product-carousel relative px-4"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="bg-white border border-gray-300 p-10 rounded-lg shadow-lg flex">
              <div className="w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
              <div className="w-1/2 pl-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {product.category}
                  </span>
                  {product.isRecommended && (
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                      Recommended
                    </div>
                  )}
                </div>
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.manufacturer}</p>
                <p className="text-sm text-gray-600">{product.packSize}</p>
                <div className="flex items-center my-4">
                  <p className="text-lg font-bold text-blue-500">
                    ₹{product.price}
                  </p>
                  {product.discount && (
                    <p className="text-xs text-red-500 ml-2">
                      {product.discount}% OFF
                    </p>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md w-full hover:bg-red-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="swiper-button-next absolute top-1/2 m-10 right-0 transform -translate-y-1/2 z-10 text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div className="swiper-button-prev absolute m-10 top-1/2 left-0 transform -translate-y-1/2 z-10 text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;
