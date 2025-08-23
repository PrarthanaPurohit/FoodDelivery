import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    const [btnName, setBtnName] = useState("Login");

    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200 shadow-sm">
            <div className="logo-container">
                <img className="w-48 h-auto" src={LOGO_URL} alt="Logo"></img>
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
                    <li className="text-gray-700">Cart</li>
                    <button
                        className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
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