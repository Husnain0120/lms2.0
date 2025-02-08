import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState();

  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:bg-gray-800 dark:to-gray-900 py-28 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-6">
          Discover, Learn, and Upskill with our wide range of courses
        </p>
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-700 rounded-full shadow-md overflow-hidden max-w-xl mx-auto mb-8"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses..."
            className="flex-grow px-6 py-2 text-gray-900 dark:text-gray-500 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
          />
          <Button className="bg-blue-600 dark:bg-indigo-700 text-white px-6 py-5 hover:bg-blue-700 dark:hover:bg-indigo-800 transition-colors rounded-r-full">
            Search
          </Button>
        </form>
        <Button
          type="submit"
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-700 text-blue-600 dark:text-gray-200 px-6 py-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
