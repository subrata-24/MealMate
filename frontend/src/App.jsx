import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetShop from "./hooks/useGetShop";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemsByCity from "./hooks/useGetItemsByCity";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrders from "./pages/MyOrders";
import useGetMyOrders from "./hooks/useGetMyOrders";
import useUpdateLocation from "./hooks/useUpdateLocation";
import TrackOrderPage from "./pages/TrackOrderPage";
import Shop from "./pages/Shop";
import { io } from "socket.io-client";
import { setSocket } from "./redux/userSlice";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoyDashboard from "../components/DeliveryBoyDashboard";
import SuccessfullOrderDeliver from "./pages/SuccessfullOrderDeliver";
export const serverUrl = "http://localhost:8000";

const App = () => {
  useGetCurrentUser();
  useGetCity();
  useGetShop();
  useGetShopByCity();
  useGetItemsByCity();
  useGetMyOrders();
  useUpdateLocation();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const socketInstance = io(serverUrl, { withCredentials: true });
    dispatch(setSocket(socketInstance));
    socketInstance.on("connect", () => {
      if (userData) {
        socketInstance.emit("identity", { userId: userData._id });
      }
    });

    // Disconnect the socket when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, [userData?._id]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!userData ? <LandingPage /> : <Navigate to="/home" />}
        />
        {/* <Route
          path="/user"
          element={
            userData && userData?.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/owner"
          element={
            userData && userData?.role === "owner" ? (
              <OwnerDashboard />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/delivery-boy"
          element={
            userData && userData?.role === "deliveryBoy" ? (
              <DeliveryBoyDashboard />
            ) : (
              <Navigate to={"/"} />
            )
          }
        /> */}

        {/* <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
        /> */}
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to={"/"} />}
        />
        <Route
          path="/add-item"
          element={userData ? <AddItem /> : <Navigate to={"/"} />}
        />
        <Route
          path="/edit-item/:itemID"
          element={userData ? <EditItem /> : <Navigate to={"/"} />}
        />
        <Route
          path="/cart"
          element={userData ? <CartPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/checkout"
          element={userData ? <CheckOut /> : <Navigate to={"/"} />}
        />
        <Route
          path="/place-order"
          element={userData ? <OrderPlaced /> : <Navigate to={"/"} />}
        />
        <Route
          path="/my-orders"
          element={userData ? <MyOrders /> : <Navigate to={"/"} />}
        />

        <Route
          path="/track-order/:orderId"
          element={userData ? <TrackOrderPage /> : <Navigate to={"/"} />}
        />

        <Route
          path="/shop/:shopId"
          element={userData ? <Shop /> : <Navigate to={"/"} />}
        />
        <Route
          path="/complete-order"
          element={
            userData ? <SuccessfullOrderDeliver /> : <Navigate to={"/"} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
