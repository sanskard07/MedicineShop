import React from 'react';

function MedicineCard({ medicine }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img src={medicine.image} alt={medicine.name} className="w-full h-32 object-cover rounded-md" />
      <h3 className="text-xl font-semibold">{medicine.name}</h3>
      <p>{medicine.description}</p>
      <p className="text-lg font-bold">₹{medicine.price}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Add to Cart</button>
    </div>
  );
}

export default MedicineCard;
