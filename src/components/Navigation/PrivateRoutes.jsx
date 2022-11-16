import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isAuth,AuthLoading }) => {

  if (AuthLoading) {
    return <></>;
  }

  console.log(isAuth);

  return isAuth ? <Outlet/> : <Navigate to="/login" />;
};

export default PrivateRoutes;
