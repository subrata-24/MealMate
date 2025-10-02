import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setShopData } from "../redux/ownerSlice.js";

const useGetShop = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/get-shop`, {
          withCredentials: true,
        });
        dispatch(setShopData(result.data));
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, [userData]);
};

export default useGetShop;
