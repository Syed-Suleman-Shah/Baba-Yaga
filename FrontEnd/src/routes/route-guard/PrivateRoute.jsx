import { Navigate, useLocation } from "react-router-dom";
import { useAuthService } from "../../services/authService";
import { Fragment ,useEffect  } from "react";
 export const PrivateRoute = ({ authenticated, element,user, allowedRole}) => {


  const location = useLocation();

  // Redirect to login if not authenticated and the current path is not "/"
  // Ensure only admin can access this page if user is authenticated and role is admin and the current path is not "/admin"
  // Note: This is a basic example and may need to be adjusted based on your specific requirements.

  // Redirect to admin dashboard if authenticated and user role is admin and the current path is "/admin"
  // Note: This is a basic example and may need to be adjusted based on your specific requirements

  if (!authenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // if (
  //   authenticated &&
  //   user?.role !== allowedRole &&
  //   (location.pathname.includes("admin") || location.pathname.includes("/auth"))
  // ) {
  //   return <Navigate to="/home" />;
  // }

  if (
    authenticated &&
    user.role === allowedRole &&
    !location.pathname.includes("admin")
  ) {
    return <Navigate to="/admin" />;
  }
  return <Fragment>{element}</Fragment>;
};

