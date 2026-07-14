function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      <img
  src={product.imageUrl || "https://placehold.co/600x400"}
  alt={product.name}
  className="w-full h-56 object-cover hover:scale-105 transition duration-300"
  onError={(e) => {
    e.target.src = "https://placehold.co/600x400?text=No+Image";
  }}
/>

      <div className="p-5">
        <h2 className="text-xl font-bold">{product.name}</h2>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>

          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {product.category}
          </span>
        </div>

        <button
          onClick={() => addToCart(product._id)}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;