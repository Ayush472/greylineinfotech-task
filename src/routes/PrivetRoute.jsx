import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

const PrivetRoute = () => {
  const userData = localStorage.getItem("userData");
  console.log(userData,"userData");
  let data = JSON.parse(userData);
  return (
    <>
      {data?.email != null && data?.email != "" ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default PrivetRoute;
