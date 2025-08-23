import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Simple loader
const Shimmer = () => <div>Loading...</div>;

const RestaurantCard = () => {
  const {resId } = useParams();
  const [restaurant, setRestaurant] = useState(null);



  const extractRestaurantData = (data) => {
    // Extract main restaurant info
    const restaurantInfo = data.data.cards.find(
      (card) =>
        card.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    ).card.card.info;

    // Extract address
    const addressLabel = restaurantInfo.labels.find(
      (l) => l.title === "Address"
    );

    // Extract first 3 menu items
    let menuItems = [];
    const regularCards =
      data.data.cards.find((card) => card.groupedCard)
        ?.groupedCard.cardGroupMap.REGULAR.cards || [];

    for (let c of regularCards) {
      const items = c.card?.card?.itemCards;
      if (items) {
        items.forEach((item) => {
          const info = item.card.info;
          menuItems.push({
            name: info.name,
            price: info.price / 100, // convert paise to rupees
          });
        });
      }
    }

    menuItems = menuItems.slice(0, 3); // first 3 items

    return {
      id: restaurantInfo.id,
      name: restaurantInfo.name,
      cuisine: restaurantInfo.cuisines.join(", "),
      costForTwo: restaurantInfo.costForTwoMessage,
      rating: restaurantInfo.avgRating,
      address: addressLabel ? addressLabel.message : "Address not available",
      deliveryTime: restaurantInfo.sla.deliveryTime,
      menu: menuItems,
    };
  };
  
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/menu?restaurantId=${resId || 63800}`
        );
        const data = await response.json();
        const extracted = extractRestaurantData(data);
        setRestaurant(extracted);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, [resId]);

  if (!restaurant) return <Shimmer />;

  return (
    
    <div className="max-w-3xl mx-auto pt-4 mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="bg-emerald-100 p-4  border-b rounded-t-lg">
      <h2 className="font-bold p-4 text-2xl m-2 ">{restaurant.name}</h2></div>

      <div className="font-mono px-4 py-4 bg-emerald-50 border overflow-hidden border-gray-200 shadow-md">
      <p><span className="font-semibold">🍴 Cuisines:</span> {restaurant.cuisine}</p>
      <p><span className="font-semibold">💰 Cost for Two:</span> {restaurant.costForTwo}</p>
      <p><span className="font-semibold">⭐ Rating:</span> {restaurant.rating} </p>
      <p><span className="font-semibold">📍Address:</span> {restaurant.address}</p>
      <p><span className="font-semibold">⏰ Delivery Time:</span> {restaurant.deliveryTime} mins</p>

      <h3 className="mt-4 mb-2 font-semibold text-lg text-gray-800">Menu Items:</h3>
      <ul className=" list-inside space-y-1 text-gray-700">
        {restaurant.menu.map((item, index) => (
          <li key={index} className="list-disc ">
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
      </div>
    </div>
  
  );
};

export default RestaurantCard;






