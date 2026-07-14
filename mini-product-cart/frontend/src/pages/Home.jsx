import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  fetchProducts();
}, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/products?search=${search}&category=${category}`
      );

      setProducts(response.data.products);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      await api.post(
        "/cart",
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Product Added Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold">
            Welcome to MiniCart 🛒
          </h1>

          <p className="mt-4 text-lg">
            Shop electronics with the best prices.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex gap-3">
  <input
    type="text"
    placeholder="Search products..."
    className="flex-1 p-3 rounded-lg border border-gray-300"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        fetchProducts();
      }
    }}
  />

  <button
    onClick={fetchProducts}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
  >
    Search
  </button>
</div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex flex-wrap gap-3">
        {["", "Mobile", "Laptop", "Accessories"].map((cat) => (
          <button
            key={cat || "All"}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg transition ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {cat || "All"}
          </button>
        ))}
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-xl">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;