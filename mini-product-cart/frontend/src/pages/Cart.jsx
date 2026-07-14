import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../services/api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/cart", {
        headers: {
          Authorization: token,
        },
      });

      setCart(response.data.cartItems);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      toast.error("Failed to load cart");
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/cart/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchCart();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/cart/${itemId}`, {
        headers: {
          Authorization: token,
        },
      });

      toast.success("Item Removed");
      fetchCart();
    } catch (error) {
      toast.error("Unable to remove item");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">My Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">
              🛒 Your Cart is Empty
            </h2>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-6 mb-5 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-500">
                    {item.product.description}
                  </p>

                  <p className="mt-2 font-semibold text-blue-600">
                    ₹ {item.product.price}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      className="bg-gray-300 hover:bg-gray-400 w-8 h-8 rounded"
                    >
                      -
                    </button>

                    <span className="text-lg font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow p-6 mt-8">
              <h2 className="text-3xl font-bold">
                Total: ₹ {totalPrice}
              </h2>

              <Link
                to="/checkout"
                className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Proceed To Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;