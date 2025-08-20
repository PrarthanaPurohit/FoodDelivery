import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { useState } from "react";
import Shimmer from "./Shimmer";

const Body = () =>{
    const [listOfRestaurant, setListOfRestaurant] = useState(restaurantList);
    const [filteredRestaurant, setFilteredRestaurant] = useState(restaurantList);
    const [searchText, setSearchText] = useState("");
    
    if(listOfRestaurant.length === 0){
        return <Shimmer />;
    }

    return (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText}
                    onChange={ (e) => {
                        setSearchText(e.target.value);
                    }}></input>

                    <button onClick={() =>{
                        const filteredRestaurant = restaurantList.filter((res) =>{
                            return res.resName.toLowerCase().includes(searchText.toLowerCase()) || res.cuisine.toLowerCase().includes(searchText.toLowerCase());
                        });
                        setFilteredRestaurant(filteredRestaurant);
                    }}>Search</button>
                </div>

                <button className="filter-btn" onClick={()=>{
                    const filteredList = filteredRestaurant.filter(
                        (res) => res.rating > 4
                    );
                setFilteredRestaurant(filteredList);
                }}>Top Rated Restaurants</button>
            </div>

            <div className="res-container">
                {filteredRestaurant.map((restaurant)=>(
                    <RestaurantCard key={restaurant.id} {...restaurant}/>
                ))}
            </div>
        </div>
    )
};
export default Body;