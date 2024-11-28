import { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [products, setProducts] = useState([]); // Renamed from medicines to products
  const [userId, setUserId] = useState('test-user'); // For now, hardcoding userId for simplicity

  useEffect(() => {
    // Fetch products from backend (update endpoint to /products)
    axios
      .get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data); // Renamed from setMedicines to setProducts
      })
      .catch((err) => console.error(err));
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userId: userId,
        productId: productId, // Renamed from medicineId to productId
        quantity: 1, // Default quantity 1
      });
      alert('Added to Cart!');
    } catch (err) {
      console.log('Failed to add to cart:', err);
    }
  };

  return (
    <div className='mx-32'>
      <h1 className="text-center font-lato  text-3xl m-10 mb-6">Medicines</h1> {/* Changed heading from "Medicines" to "Products" */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        spaceBetween={20} // Reduced space between slides
        slidesPerView={3} // Number of slides visible at a time
        loop={true}
        className="product-carousel relative px-4" // Add horizontal padding to the swiper wrapper
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
                {/* Product Category (Regular/Recommended) */}
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{product.category}</span>
                  {product.isRecommended && (
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                      Recommended
                    </div>
                  )}
                </div>
                
                {/* Product Name */}
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>

                {/* Manufacturer Details */}
                <p className="text-sm text-gray-600">{product.manufacturer}</p>
                <p className="text-sm text-gray-600">{product.packSize}</p>

                {/* Pricing */}
                <div className="flex items-center my-4">
                  <p className="text-lg font-bold text-blue-500">₹{product.price}</p>
                  {/* <p className="text-xs line-through text-gray-500 ml-2">MRP ₹{product.mrp}</p> */}
                  {product.discount && (
                    <p className="text-xs text-red-500 ml-2">{product.discount}% OFF</p>
                  )}
                </div>

                {/* Add to Cart Button */}
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

      {/* Custom navigation arrows with Tailwind styling */}
      <div className="mx-32 swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
      <div className="mx-32 swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 z-10 text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </div>
    </div>
  );
};

export default Home;
