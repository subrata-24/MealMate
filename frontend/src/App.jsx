import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetShop from "./hooks/useGetShop";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
export const serverUrl = "http://localhost:8000";

const App = () => {
  useGetCurrentUser();
  useGetCity();
  useGetShop();
  useGetShopByCity();
  const { userData } = useSelector((state) => state.user);
  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/add-item"
          element={userData ? <AddItem /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/edit-item/:itemID"
          element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
