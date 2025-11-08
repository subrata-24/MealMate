import User from "./models/user.model.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("identity", async ({ userId }) => {
      try {
        // console.log(userId);
        const user = await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
          isOnline: true,
        });
      } catch (error) {
        console.log(error);
      }
    });

    /*
     Real-time Delivery Boy Location Update Handler
     Flow:
      1. Receive latitude, longitude, and delivery boy ID from client
      2. Find delivery boy in database by userId
      3. Update their location with GeoJSON Point format
      4. Broadcast updated location to all connected clients (customers can track delivery)
      Note: Uses io.emit to broadcast to all clients.
      Clients should filter by deliveryBoyId to show only relevant delivery boys.
     */
    socket.on("updateLocation", async ({ latitude, longitude, userId }) => {
      try {
        const user = await User.findByIdAndUpdate(userId, {
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          isOnline: true,
          socketId: socket.id,
        });

        if (user) {
          io.emit("updateDeliveryBoyLocation", {
            deliveryBoyId: userId,
            latitude,
            longitude,
          });
        }
      } catch (error) {
        console.log(
          `Find error delivery boy update location at real time ${error}`
        );
      }
    });

    socket.on("disconnect", async () => {
      try {
        await User.findOneAndUpdate(
          { socketId: socket.id },
          {
            socketId: null,
            isOnline: false,
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
  });
};
