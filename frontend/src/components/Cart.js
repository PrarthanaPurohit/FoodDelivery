import { useSelector } from "react-redux";

const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white-50 to-blue-100 ">
      <div className="w-6/12 mx-auto mt-0 bg-white rounded-2xl shadow-2xl p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>

        <div className="m-4 p-4 bg-blue-100 rounded-lg">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {/* Items list */}
              {cartItems.map((item) => (
                <div
                  key={item.card.info.id}
                  className="flex justify-between border-b py-2 mx-2 px-2 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div>
                    <span className="font-semibold">
                      {item.card.info.name}
                    </span>
                    <p>₹{item.card.info.price / 100}</p>
                  </div>
                  {item.card.info.imageId && (
                    <img
                      src={CDN_URL + item.card.info.imageId}
                      alt={item.card.info.name}
                      className="w-20 h-20 object-cover rounded-lg ml-2"
                    />
                  )}
                </div>
              ))}

              {/* ⬇️ Footer (Total + Checkout button) ⬇️ */}
              <div className="mt-6 flex justify-between items-center border-t pt-4">
                <span className="font-bold text-xl text-gray-800">
                  Total: ₹
                  {cartItems.reduce(
                    (acc, item) => acc + item.card.info.price / 100,
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

