import React from "react";
import Navbar from "./Navbar";
import { categories } from "../src/category";
import CategoryCard from "./CategoryCard";

const UserDashboard = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col gap-6 items-center bg-[#fff9f6] overflow-y-auto">
      {/* Navbar */}
      <Navbar />

      {/* Page Body */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start px-4 sm:px-6 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Inspiration for your first order
        </h1>

        {/* Categories Grid */}
        <div className="w-full">
          <div className="w-full flex overflow-x-auto gap-4 pb-2">
            {categories.map((cate, index) => (
              <CategoryCard data={cate} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
