import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";

// Simple loader
const Shimmer = () => <div>Loading...</div>;

const RestaurantCard = () => {
  const {resId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]); // 👈 new state for categories



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

      // 👇 Extract categories here
     const categoriesList =
  data.data.cards.find((card) => card.groupedCard)
    ?.groupedCard.cardGroupMap.REGULAR.cards.filter(
      (c) => {
        const type = c.card?.card?.["@type"];
        return (
          type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
          type === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        );
      }
    ) || [];
 setCategories(categoriesList);

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
    
    <div className="min-h-screen mt-0 bg-gradient-to-br from-pink-100 via-pink-50 to-pink-200 ">
      <div className="text-center">
      
      <div>
      <h2 className="font-bold p-4 text-2xl  ">{restaurant.name}</h2></div>

      <div className="border border-gray-50 rounded-lg w-fit p-2 mx-auto bg-pink-200">
      <p><span className="font-semibold">🍴 Cuisines:</span> {restaurant.cuisine}</p>
      <p><span className="font-semibold">💰 Cost for Two:</span> {restaurant.costForTwo}</p>
      <p><span className="font-semibold">⭐ Rating:</span> {restaurant.rating} </p>
      <p><span className="font-semibold">📍Address:</span> {restaurant.address}</p>
      <p><span className="font-semibold">⏰ Delivery Time:</span> {restaurant.deliveryTime} mins</p>
      </div>

      {/* categories accordian*/}
      
       {categories.map((category, index) => (
   <RestaurantCategory 
    key={category.card.card.title || index} 
    data={category.card.card} 
  />


    ))}


      </div>
    </div>
  
  );
};

export default RestaurantCard;






