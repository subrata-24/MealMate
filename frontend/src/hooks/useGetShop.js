import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setOwnerData } from "../redux/ownerSlice";

const useGetShop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/get-shop`, {
          withCredentials: true,
        });
        dispatch(setOwnerData(result.data));
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, []);
};

export default useGetShop;
