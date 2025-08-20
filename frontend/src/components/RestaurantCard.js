const RestaurantCard = (props) => {
    return(
        <div className="res-card" >
           <img className="food-img" alt={props.resName} src={props.img} />

            <h3>{props.resName}</h3>  
            <div className="res-info">
                <h4>{props.cuisine}</h4>
                <h4 className="rating">{props.rating}</h4>
                <h4>{props.timing}</h4>
            </div>
        </div>
    )
};

export default RestaurantCard;