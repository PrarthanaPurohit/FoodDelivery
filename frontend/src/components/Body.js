import { useEffect, useState } from "react";
import RestaurantCard, {withDiscountLabel} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardDiscount = withDiscountLabel(RestaurantCard); //new component with label

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
        console.log(listOfRestaurant);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        
      }
    };

    fetchRestaurants();
  }, []);

  //To display msg if user goes offline
  const onlineStatus= useOnlineStatus(); //function called
  if(onlineStatus === false){
     return <h1>Looks like you are offline. Please check you internet connection</h1>
  }

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

    <div className="body min-h-screen bg-gradient-to-br from-yellow-50 via-white-50 to-amber-100">
      <div className="filter items-center flex flex-wrap px-4 py-2 gap-x-4">
        <div className="search">
          <input
            type="text"
            className="m-4 px-4 py-2 border border-black rounded-lg w-64"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search for restaurants or cuisines"
          />
          <button className="px-4 py-2 bg-green-200 rounded-lg hover:bg-green-300" onClick={handleSearch}>Search</button>
        </div>
        <div>
        <button className="filter-btn px-4 py-2 bg-green-200 items-center rounded-lg hover:bg-green-300" onClick={handleTopRated}>
          Top Rated Restaurants
        </button>
      </div>
        
      </div>
      

      <div className="res-container flex flex-wrap mx-14 ">
        {filteredRestaurant.map((restaurant) => (
          <Link 
          key={restaurant.info.id}
          to={`/restaurants/${restaurant.info.id}`}>
            <RestaurantCardDiscount restaurant={restaurant} />
        
    </Link>
        ))}
      </div>
    </div>
  );

  
};

export default Body;
