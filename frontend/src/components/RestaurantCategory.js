import { useState } from "react";

const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/";

const RestaurantCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(false);

  // Case 1: Recommended type → has itemCards directly
  const items = data.itemCards || [];

  // Case 2: Nested type → has subcategories
  const nestedCategories = data.categories || [];

  const toggle = () => {
    setShowItems(!showItems);
  };

  return (
    <div>
      {/* Header */}
      <div
        className="w-6/12 mx-auto my-6 bg-white shadow-lg p-4 flex justify-between cursor-pointer"
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
                <div>
                  <span className="font-semibold">{item.card.info.name}</span>
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
                      <img
                        src={CDN_URL + item.card.info.imageId}
                        alt={item.card.info.name}
                        className="w-20 h-20 object-cover rounded-lg ml-2"
                      />
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
