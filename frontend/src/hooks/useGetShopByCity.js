import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setShopInMyCity, setUserData } from "../redux/userSlice";

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
        dispatch(setShopInMyCity(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, [currentCity]);
};

export default useGetShopByCity;
