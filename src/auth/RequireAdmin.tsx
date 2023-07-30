import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";


function RequireAdmin({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth?.isLoading) {
    return null;
  }

  if (auth?.userInfo?.isUserValid && auth?.userInfo?.data?.role != "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAdmin;
