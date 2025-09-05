import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/";

const RestaurantCategory = ({ data }) => {
  const cartItems = useSelector((store) => store.cart.items); // cart
  const [showItems, setShowItems] = useState(false);
  const dispatch = useDispatch();

  // Case 1: Recommended type → has itemCards directly
  const items = data.itemCards || [];

  // Case 2: Nested type → has subcategories
  const nestedCategories = data.categories || [];

  const toggle = () => {
    setShowItems(!showItems);
  };

  const getQuantity = (id) => {
    const found = cartItems.find((i) => i.card.info.id === id);
    return found ? found.quantity : 0;
  };
  return (
    <div className="mt-0">
      {/* Header */}
      <div
        className="w-6/12 mx-auto mt-0 bg-gray-100 shadow-lg p-4 flex justify-between cursor-pointer"
        onClick={toggle}
      >
        <span>
          {data.title}{" "}
          {items.length > 0
            ? `(${items.length})`
            : nestedCategories.length > 0
            ? `(${nestedCategories.length})`
            : ""}
        </span>
        <span>{showItems ? "🔼" : "🔽"}</span>
      </div>

      {/* Body */}
      {showItems && (
        <div className="w-6/12 mx-auto bg-white shadow p-2">
          {/* Direct items */}
          {items.length > 0 &&
            items.map((item) => {
              const quantity = getQuantity(item.card.info.id);

              return (
                <div
                  key={item.card.info.id}
                  className="flex justify-between border-b py-2"
                >
                  <span className="font-semibold">
                    {item.card.info.name}
                    {quantity > 0 && (
                      <span className="font-semibold ml-4">x {quantity}</span>
                    )}
                  </span>
                  <div className="flex items-center gap-6">
                    <p>₹{item.card.info.price / 100}</p>

                    {item.card.info.imageId && (
                      <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-md">
                        <img
                          src={CDN_URL + item.card.info.imageId}
                          alt={item.card.info.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        {/* ➕ Button */}
                        <button
                          className="absolute top-0 left-0 bg-gray-200 text-black px-1 py-0.5 rounded-l-md shadow hover:bg-emerald-600 hover:text-white transition"
                          onClick={() => dispatch(addItem(item))}
                        >
                          ➕
                        </button>

                        {/* ➖ Button */}
                        <button
                          className="absolute top-0 right-0 bg-gray-200 text-black px-1 py-0.5 rounded-r-md shadow hover:bg-emerald-600 hover:text-white transition"
                          onClick={() => dispatch(removeItem(item))}
                        >
                          ➖
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          {/* Nested subcategories */}
          {nestedCategories.length > 0 &&
            nestedCategories.map((cat, idx) => (
              <div key={idx} className="mb-2">
                <h4 className="font-bold">{cat.title}</h4>
                {cat.itemCards?.map((item) => {
                  const quantity = getQuantity(item.card.info.id);
                  return (
                    <div
                      key={item.card.info.id}
                      className="flex justify-between border-b py-2"
                    >
                      <div>
                        <span className="font-semibold">
                          {item.card.info.name}
                          {quantity > 0 && (
                            <span className="ml-4">x {quantity}</span>
                          )}
                        </span>
                        <p>₹{item.card.info.price / 100}</p>
                      </div>
                      {item.card.info.imageId && (
                        <div class="relative w-64 h-80 bg-gray-100 rounded-xl overflow-hidden shadow-md">
                          <img
                            src={CDN_URL + item.card.info.imageId}
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
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
