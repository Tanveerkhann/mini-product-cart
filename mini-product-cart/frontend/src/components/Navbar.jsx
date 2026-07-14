import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart", {
        headers: {
          Authorization: token,
        },
      });

      setCartCount(response.data.cartItems.length);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
       <nav className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <Link to="/" className="text-3xl font-extrabold tracking-wide">
          🛒 MiniCart
        </Link>

        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-blue-400 transition">
              Home
              </Link>

          <Link to="/cart" className="hover:text-blue-400 transition">
             🛒 Cart ({cartCount})
               </Link>

          {!token ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;