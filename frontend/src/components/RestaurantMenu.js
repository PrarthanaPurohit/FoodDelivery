import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";

// GitHub Gist URL for menu data
const GIST_MENU_URL = "https://gist.githubusercontent.com/PrarthanaPurohit/1ad762b28e3ea478bd4812ee57bcecf9/raw/dummyMenu.json";

const Shimmer = () => (
  <div className="p-10 text-center text-xl">Loading...</div>
);

const RestaurantCard = () => {
  const { resId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const extractRestaurantData = (data) => {
    // 1️⃣ Restaurant Info
    const restaurantInfo = data?.data?.cards
      ?.find(
        (c) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
      )
      ?.card?.card?.info;

    // 2️⃣ REGULAR cards - check both groupedCard and direct cards array
    const regularCards =
      data?.data?.cards
        ?.find((c) => c?.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards || data?.data?.cards || [];

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
        id: restaurantInfo?.id || resId,
        name: restaurantInfo?.name || "Restaurant",
        cuisines: restaurantInfo?.cuisines?.join(", ") || "Indian, Chinese, Continental",
        costForTwo: restaurantInfo?.costForTwoMessage || "₹300 for two",
        rating: restaurantInfo?.avgRating || "4.2",
        area: restaurantInfo?.areaName || "Your Area",
        deliveryTime: restaurantInfo?.sla?.deliveryTime || 30,
      },
      categories,
    };
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("🔄 Fetching menu from GitHub Gist...");
        
        const response = await fetch(GIST_MENU_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Menu loaded successfully!");
        
        const extracted = extractRestaurantData(data);
        setRestaurant(extracted.restaurant);
        setCategories(extracted.categories);
        
      } catch (err) {
        console.error("❌ Error loading menu:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [resId]);

  if (loading) return <Shimmer />;
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-pink-200 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to Load Menu</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
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
