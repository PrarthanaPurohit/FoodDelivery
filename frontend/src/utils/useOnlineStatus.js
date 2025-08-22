import { useEffect, useState } from "react";
const useOnlineStatus = () => {

    const [onlineStatus, setOnlineStatus] = useState(true);

    useEffect(() => {
        window.addEventListener("offline", () =>{
            setOnlineStatus(false);
        });

        window.addEventListener("offline", () =>{
            setOnlineStatus(false);
        });


    },[]);
    //boolean value
    return onlineStatus;
}

export default useOnlineStatus;