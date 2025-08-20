import { Link } from "react-router-dom";

import { useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const err = useRouteError();
    console.log(err);
  return (
    <div className="error-container">
      <h1 className="error-title">Oops! 🍔</h1>
      <h3>
        {err.status}: {err.statusText}
      </h3>
      <p className="error-message">
        The page you are looking for is either cooking or doesn’t exist.
      </p>
      
      <Link to="/" className="error-button">
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
