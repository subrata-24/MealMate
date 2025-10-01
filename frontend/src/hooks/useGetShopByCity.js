import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useGetShopByCity = () => {
  const { currentCity } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-shop-by-city/${currentCity}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, []);
};

export default useGetShopByCity;
