import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import temp1 from "../src/assets/temp1.jpg";
import temp2 from "../src/assets/temp2.jpg";
import temp4 from "../src/assets/temp4.jpg";
import temp5 from "../src/assets/temp5.jpg";
import temp7 from "../src/assets/temp7.png";
import temp8 from "../src/assets/temp8.jpg";
import temp9 from "../src/assets/temp9.jpg";
import temp10 from "../src/assets/temp10.jpg";
import temp11 from "../src/assets/temp11.jpg";

const foodImages = [
  { id: 1, img: temp1, name: "Spicy Burger", price: "$12.99" },
  { id: 2, img: temp2, name: "Spicy Burger", price: "$12.99" },
  { id: 4, img: temp4, name: "Spicy Burger", price: "$12.99" },
  { id: 5, img: temp5, name: "Spicy Burger", price: "$12.99" },
  { id: 7, img: temp7, name: "Spicy Burger", price: "$12.99" },
  { id: 8, img: temp8, name: "Spicy Burger", price: "$12.99" },
  { id: 9, img: temp9, name: "Spicy Burger", price: "$12.99" },
  { id: 10, img: temp10, name: "Spicy Burger", price: "$12.99" },
  { id: 11, img: temp11, name: "Spicy Burger", price: "$12.99" },
];

const FoodCarousel = () => {
  return (
    <div className="w-full px-4 sm:px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black text-gray-900 mb-4">
          ✨ Featured This Week
        </h2>
        <p className="text-xl text-gray-600">
          Handpicked delights just for you
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="!pb-12"
      >
        {foodImages.map((food) => (
          <SwiperSlide key={food.id}>
            <div
              className="group bg-white rounded-2xl border-2 border-orange-100 
                            shadow-lg hover:shadow-2xl hover:border-orange-200 
                            transform hover:-translate-y-2 
                            transition-all duration-500 overflow-hidden"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={food.img}
                  alt={food.name}
                  className="w-full h-full object-cover 
                             transform group-hover:scale-125 
                             transition-all duration-700"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodCarousel;
