import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, authenticated, ...rest }) => {
  return authenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/" replace={true} />
  );
};


export default PrivateRoute;
