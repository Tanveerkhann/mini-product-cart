import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=No+Image";
          }}
        />
      </Link>

      <div className="p-5">
        <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
          {product.category}
        </span>

        <h2 className="text-xl font-bold mt-3">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <h3 className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </h3>
        </div>

        <div className="flex gap-3 mt-5">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center bg-gray-900 hover:bg-black text-white py-3 rounded-lg transition"
          >
            View
          </Link>

          <button
            onClick={() => addToCart(product._id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;