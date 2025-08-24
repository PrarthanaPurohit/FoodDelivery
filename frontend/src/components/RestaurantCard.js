const RestaurantCard = (props) => {
    return(
        <div className="res-card m-4 px-2 w-[200px] border bg-gray-200 hover:bg-gray-300 h-[400px]  " >
           <img className="food-img h-1/2 w-[200px] py-2" alt={props.resName} src={props.img} />

            <h3 className="font-bold py-3 text-lg">{props.resName}</h3>  
            <div className="res-info flex-wrap space-between">
                <h4>{props.cuisine}</h4>
                <h4 className="rating before:content-['⭐'] ">{props.rating}</h4>
                <h4>{props.timing}</h4>
            </div>
        </div>
    )
};

// higher order component - returning a new component
export const withDiscountLabel = (RestaurantCard) => {
  return (props) => {
    const discountInfo = props.restaurant.info.aggregatedDiscountInfoV3;
    const pureVeg = props.restaurant.info.badgesV2?.entityBadges?.imageBased?.badgeObject?.[0]?.attributes?.description;


    return (
      <div className="relative">
        {discountInfo && (
          <span className="absolute left-2 bg-blue-300 text-white px-2 py-1 text-xs rounded-md shadow-md">
            {discountInfo.header}{" "}
            {discountInfo.subHeader && `| ${discountInfo.subHeader}`}
          </span>
        )}
          <div>
            {pureVeg &&(
            
            <span className= "absolute  right-2 text-white bg-green-500 px-2 py-1 text-xs rounded-md shadow-md ">
            Pure Veg
          </span>)}
          </div>


        {/* Pass props properly to RestaurantCard */}
        <RestaurantCard
          resName={props.restaurant.info.name}
          cuisine={props.restaurant.info.cuisines.join(", ")}
          rating={props.restaurant.info.avgRating}
          timing={props.restaurant.info.sla.deliveryTime + " mins"}
          img={
            props.restaurant.info.cloudinaryImageId
              ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${props.restaurant.info.cloudinaryImageId}`
              : "https://via.placeholder.com/150"
          }
        />
      </div>
    );
  };
};

export default RestaurantCard;