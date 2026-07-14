import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-lg w-full">

        <div className="text-6xl mb-5">
          🎉
        </div>

        <h1 className="text-4xl font-bold text-green-600">
          Order Placed!
        </h1>

        <p className="text-gray-600 mt-5">
          Thank you for shopping with MiniCart.
        </p>

        <p className="text-gray-500 mt-2">
          Your order has been placed successfully.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}

export default OrderSuccess;