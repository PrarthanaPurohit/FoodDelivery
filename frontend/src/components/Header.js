import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

export const Header = () => {
    const [btnName, setBtnName] = useState("Login");

    const onlineStatus = useOnlineStatus();

    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200 shadow-sm bg-yellow-100 rounded-lg shadow-lg">
            <div className="logo-container">
                <img className="w-44 h-auto rounded-3xl" src={LOGO_URL} alt="Logo"></img>
            </div>

            <div className="nav-items">
                <ul className="flex items-center space-x-6 text-lg">
                    <li>
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact Us</Link>
                    </li>
                    <li className="text-gray-700  hover:text-blue-600">Cart</li>
                    <button
                        className="px-5 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                        onClick={() => {
                            btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")
                        }}
                    >
                        {btnName}
                    </button>
                </ul>
            </div>
        </div>
    )
};