// PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid, getUserRole } from "api/auth-service"; // Import your token validation function
import PropTypes from "prop-types";

function PrivateRoute({ roleRequired }) {
  const [auth, setAuth] = useState(false); // Determine if authorized
  const [userRole, setUserRole] = useState("");
  const [isLoading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const checkTokenValidity = isTokenValid(token);
    const checkUserRoleResponse = getUserRole(token);

    Promise.all([checkTokenValidity, checkUserRoleResponse])
      .then(([tokenValid, userRoleResponse]) => {
        if (tokenValid.data && userRoleResponse.data) {
          const rolesArray = userRoleResponse.data.split(",").map((role) => role.trim());
          setUserRole(rolesArray);
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch((error) => {
        console.error("Error while checking token validity or user role:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Carregando...</p>
      </div>
    );
  }

  const isValid = auth && userRole.includes(roleRequired);

  if (auth && !userRole.includes(roleRequired)) {
    return <Navigate to="/unauthorized" />;
  }

  return isValid ? <Outlet /> : <Navigate to="/sign-in" />;
}

PrivateRoute.propTypes = {
  roleRequired: PropTypes.string.isRequired, // You can adjust the prop type as needed
};

export default PrivateRoute;
