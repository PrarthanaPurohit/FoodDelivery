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
    <div>
      <h2>{restaurant.name}</h2>
      <p>Cuisines: {restaurant.cuisine}</p>
      <p>Cost for Two: {restaurant.costForTwo}</p>
      <p>Rating: {restaurant.rating} ⭐</p>
      <p>Address: {restaurant.address}</p>
      <p>Delivery Time: {restaurant.deliveryTime} mins</p>

      <h3>Menu Items:</h3>
      <ul>
        {restaurant.menu.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantCard;






