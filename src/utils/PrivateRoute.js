// PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "api/auth-service"; // Import your token validation function

function PrivateRoute() {
  const [auth, setAuth] = useState(false); // Determine if authorized
  const [isLoading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = sessionStorage.getItem("token"); // Get the token from sessionStorage

      if (token) {
        try {
          const isValid = await isTokenValid(token); // Validate the token on the backend
          setAuth(isValid.data); // Set the authorization state based on the token validity
        } catch (error) {
          console.error("Error while checking token validity:", error);
        } finally {
          setLoading(false); // Set loading to false when token validation is complete
        }
      } else {
        setLoading(false); // Set loading to false if no token is present
      }
    };

    checkTokenValidity();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can add a loading indicator while checking the token
  }

  return auth ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
