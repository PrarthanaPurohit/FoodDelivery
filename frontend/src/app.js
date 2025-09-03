import React from "react";
import ReactDOM from "react-dom/client";
import {Header} from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
const AppLayout = () => {
    return ( 
        <Provider store={appStore}>
        <div className="app">
            <Header/>
            <Outlet />  
            {/* outlet acts like a placeholder where child routes will be rendered. */}
        </div>
        </Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout />,
        errorElement:<Error />,
        children:[
            {
                path:"/",
                element: <Body />,
            },
            {
                path:"/about",
                element:<About />
            },
            {
                path:"/contact",
                element:<Contact />,
            },
            {
                path:"/restaurants/:resId",   //: tells the path is dynamic ie resId
                element:<RestaurantMenu />,
            },
            {
                path:"/cart",
                element:<Cart />
            }
        ],
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);