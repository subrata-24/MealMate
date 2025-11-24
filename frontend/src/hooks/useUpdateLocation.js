import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { serverUrl } from "../App";

function useUpdateLocation() {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) {
      return;
    }

    const updateLocation = async (lat, lon) => {
      try {
        await axios.post(
          `${serverUrl}/api/user/update-location`,
          { lat, lon },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Failed to update location:", error);
      }
    };
    const watchId = navigator.geolocation.watchPosition((pos) => {
      updateLocation(pos.coords.latitude, pos.coords.longitude);
    });
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [userData]);
}

export default useUpdateLocation;
