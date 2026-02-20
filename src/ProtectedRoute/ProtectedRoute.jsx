// // src/ProtectedRoute/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useSelector((state) => state.auth);

//   if (loading) {
//     return null; // Or a loading spinner
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // ENFORCE SUBSCRIPTION CHECK
//   if (!user.isSubscriptionActive) {
//     return <Navigate to="/pricing" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


// src/ProtectedRoute/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="text-white p-4">Checking authentication...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  if (user.role !== "admin" && !user.isSubscriptionActive) {
    return <Navigate to="/pricing" replace />;
  }

  return children;
};

export default ProtectedRoute;
