import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isAuth,AuthLoading }) => {
  if (AuthLoading) {
    return <></>;
  }

  return isAuth ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoutes;
