import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";




const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/";

const RestaurantCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(false);
  const dispatch = useDispatch();

  // Case 1: Recommended type → has itemCards directly
  const items = data.itemCards || [];

  // Case 2: Nested type → has subcategories
  const nestedCategories = data.categories || [];

  const toggle = () => {
    setShowItems(!showItems);
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
            items.map((item) => (
              <div
                key={item.card.info.id}
                className="flex justify-between border-b py-2"
              >
                  <span className="font-semibold">{item.card.info.name}</span>
               <div className="flex items-center gap-6">
                  <p>₹{item.card.info.price / 100}</p>
              
                {item.card.info.imageId && (
                  <div className="relative">
                  <img
                    src={CDN_URL + item.card.info.imageId}
                    alt={item.card.info.name}
                    className="w-20 h-20 object-cover rounded-lg ml-2"
                  />
                  
                  <button 
                  className="absolute bottom-1 right-1 bg-emerald-500 text-white px-1.5 py-0.5 rounded-lg shadow-md hover:bg-emerald-600 transition"
                  onClick={
                    //dispatch an action
                    () => dispatch(addItem(item))}

                  >
                    Add
                    </button>
                  </div>
                )}
              </div></div>
            ))}

          {/* Nested subcategories */}
          {nestedCategories.length > 0 &&
            nestedCategories.map((cat, idx) => (
              <div key={idx} className="mb-2">
                <h4 className="font-bold">{cat.title}</h4>
                {cat.itemCards?.map((item) => (
                  <div
                    key={item.card.info.id}
                    className="flex justify-between border-b py-2"
                  >
                    <div>
                      <span className="font-semibold">
                        {item.card.info.name}
                      </span>
                      <p>₹{item.card.info.price / 100}</p>
                    </div>
                    {item.card.info.imageId && (
                      <div class="relative w-64 h-80 bg-gray-100 rounded-xl overflow-hidden shadow-md">
                      <img 
                        src={CDN_URL + item.card.info.imageId}
                        alt={item.card.info.name}
                        className="w-20 h-20 object-cover rounded-lg ml-2"
                      />
                      <button class="absolute bottom-3 right-3 bg-emerald-500 text-white px-1.5 py-0.5 rounded-xl shadow-lg hover:bg-emerald-600 transition"
                      onClick={
                    //dispatch an action
                    () => dispatch(addItem(item))}
                    >
                        Add
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
