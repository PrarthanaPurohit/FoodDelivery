import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/restaurants");
        const data = await response.json();

        // Extract restaurant array from Swiggy API response
        const restaurants =
          data?.data?.cards
            ?.find(
              (card) =>
                card.card?.card?.gridElements?.infoWithStyle?.restaurants
            )
            ?.card.card.gridElements.infoWithStyle.restaurants || [];

        setListOfRestaurant(restaurants);
        setFilteredRestaurant(restaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  // Show loader while data is not fetched
  if (listOfRestaurant.length === 0) {
    return <Shimmer />;
  }

  // Search handler
  const handleSearch = () => {
    const filtered = listOfRestaurant.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
      res.info.cuisines.join(", ").toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filtered);
  };

  // Top rated filter handler
  const handleTopRated = () => {
    const filtered = filteredRestaurant.filter(
      (res) => parseFloat(res.info.avgRating) > 4
    );
    setFilteredRestaurant(filtered);
  };

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for restaurants or cuisines"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button className="filter-btn" onClick={handleTopRated}>
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            resName={restaurant.info.name}
            cuisine={restaurant.info.cuisines.join(", ")}
            rating={restaurant.info.avgRating}
            timing={restaurant.info.sla.deliveryTime + " mins"}
            img={
  restaurant.info.cloudinaryImageId
    ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.info.cloudinaryImageId}`
    : "https://via.placeholder.com/150" // placeholder image
}

          />
        ))}
      </div>
    </div>
  );
};

export default Body;
