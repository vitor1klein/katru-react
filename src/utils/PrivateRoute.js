import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import PropTypes from "prop-types";

function PrivateRoute() {
  const auth = true; // determine if authorized, from context or however you're doing it

  return auth ? <Outlet /> : <Navigate to="/sign-in" />;
}

// PrivateRoute.propTypes = {
//   user: PropTypes.bool.isRequired,
//   path: PropTypes.string.isRequired,
//   element: PropTypes.element.isRequired,
// };

export default PrivateRoute;
