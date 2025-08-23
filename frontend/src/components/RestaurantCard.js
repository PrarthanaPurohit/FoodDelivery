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

export default RestaurantCard;