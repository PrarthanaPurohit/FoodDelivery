import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { addItem, removeItem } from "../utils/cartSlice";

const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/";

// Helper function to get image URL
const getImageUrl = (imageId) => {
  if (!imageId) return "";
  // If imageId is already a full URL, use it directly
  if (imageId.startsWith("http://") || imageId.startsWith("https://")) {
    return imageId;
  }
  // Otherwise, use Swiggy CDN
  return CDN_URL + imageId;
};

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white-50 to-blue-100 ">
      <div className="w-6/12 mx-auto mt-0 bg-white rounded-2xl shadow-2xl p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
        <div className="flex justify-end">
          <button
            className=" p-2 m-2 bg-teal-700 text-white hover:bg-teal-600 rounded-xl"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>

        <div className="m-4 p-4 bg-blue-100 rounded-lg">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {/* Items list */}
              {cartItems.map((item, index) => (
                <div
                  key={item.card.info.id + "-" + index}
                  className="flex justify-between border-b py-2 mx-2 px-2 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <span>
                    {item.card.info.name}
                    <span className="font-semibold ml-4">
                      x {item.quantity}
                    </span>
                  </span>
                  <div className="flex items-center gap-4">
                    <p>₹{(item.card.info.price / 100) * item.quantity}</p>

                    <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-md">
                      <img
                        src={getImageUrl(item.card.info.imageId)}
                        alt={item.card.info.name}
                        className="w-20 h-20 object-cover rounded-lg "
                      />

                      <button
                        className="absolute top-0 left-0 bg-gray-200 text-black px-1 py-0.5 rounded-md shadow hover:bg-emerald-600 hover:text-white transition"
                        onClick={() => dispatch(addItem(item))}
                      >
                        ➕
                      </button>

                      <button
                        className="absolute top-0 right-0 bg-gray-200 text-black px-1 py-0.5 rounded-lg shadow-md hover:bg-emerald-600 hover:text-white transition"
                        onClick={() => dispatch(removeItem(item))}
                      >
                        ➖
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* ⬇️ Footer (Total + Checkout button) ⬇️ */}
              <div className="mt-6 flex justify-between items-center border-t pt-4">
                <span className="font-bold text-xl text-gray-800">
                  Total: ₹
                  {cartItems.reduce(
                    (acc, item) =>
                      acc + (item.card.info.price / 100) * item.quantity,
                    0
                  )}
                </span>

                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition">
                  Checkout
                </button>
              </div>
              {/* ⬆️ Footer ends ⬆️ */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
