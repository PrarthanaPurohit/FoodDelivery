import { useEffect, useState } from "react";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/menu?restaurantId=63800"
        );
        const data = await response.json();
        setMenu(data);
        console.log("Menu data:", data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="menu">
      <h1>Restaurant Menu</h1>
      {menu ? (
        <pre>{JSON.stringify(menu, null, 2)}</pre>
      ) : (
        <p>Loading menu...</p>
      )}
    </div>
  );
};

export default RestaurantMenu;



