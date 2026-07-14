import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const placeOrder = () => {
    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            rows="4"
            placeholder="Shipping Address"
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="button"
            onClick={placeOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
          >
            Place Order
          </button>

        </form>

      </div>
    </div>
  );
}

export default Checkout;