import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

export const Header = () => {
    const [btnName, setBtnName] = useState("Login");

    const onlineStatus = useOnlineStatus();

    //subscribing to store using selector
    const cart = useSelector((store) => store.cart.items);

    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-300 shadow-sm bg-yellow-100 rounded-lg shadow-lg">
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
                    <li >
                        <Link to="/cart" className="relative inline-block">
                        <span className="text-2xl">🛒</span>
                        {/* 🔴 Badge */}
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {cart.length}
                                </span>
                            )}
                            </Link>
                        </li>
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