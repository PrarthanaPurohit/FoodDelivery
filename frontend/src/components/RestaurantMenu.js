import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";

const Shimmer = () => (
  <div className="p-10 text-center text-xl">Loading...</div>
);

const RestaurantCard = () => {
  const { resId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);

  const extractRestaurantData = (data) => {
    // 1️⃣ Restaurant Info
    const restaurantInfo = data?.data?.cards
      ?.find(
        (c) =>
          c?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
      )
      ?.card?.info;

    // 2️⃣ REGULAR cards
    const regularCards =
      data?.data?.cards
        ?.find((c) => c?.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

    // 3️⃣ Item Categories (AS PER YOUR JSON)
    const categories = regularCards.filter((c) => {
      const type = c?.card?.card?.["@type"];
      return (
        type ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
        type ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
      );
    });

    return {
      restaurant: {
        id: restaurantInfo?.id,
        name: restaurantInfo?.name,
        cuisines: restaurantInfo?.cuisines?.join(", "),
        costForTwo: restaurantInfo?.costForTwoMessage,
        rating: restaurantInfo?.avgRating,
        area: restaurantInfo?.areaName,
        deliveryTime: restaurantInfo?.sla?.deliveryTime,
      },
      categories,
    };
  };

  useEffect(() => {
    const fetchMenu = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/menu?restaurantId=${resId}`);
    console.log("RAW RESPONSE:", response);

    const text = await response.text();
    console.log("RAW TEXT:", text);

    const data = JSON.parse(text);
    const extracted = extractRestaurantData(data);

    setRestaurant(extracted.restaurant);
    setCategories(extracted.categories);
  } catch (err) {
    console.error("Menu fetch error:", err);
  }
};


    fetchMenu();
  }, [resId]);

  if (!restaurant) return <Shimmer />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-pink-200">
      <div className="text-center p-4">
        <h2 className="font-bold text-2xl mb-4">{restaurant.name}</h2>

        <div className="border rounded-lg w-fit p-3 mx-auto bg-pink-200 mb-6">
          <p><b>🍴 Cuisines:</b> {restaurant.cuisines}</p>
          <p><b>💰 Cost for Two:</b> {restaurant.costForTwo}</p>
          <p><b>⭐ Rating:</b> {restaurant.rating}</p>
          <p><b>📍 Area:</b> {restaurant.area}</p>
          <p><b>⏰ Delivery Time:</b> {restaurant.deliveryTime} mins</p>
        </div>

        {/* Categories */}
        {categories.map((category, index) => (
          <RestaurantCategory
            key={category?.card?.card?.title || index}
            data={category.card.card}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantCard;
