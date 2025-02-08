import VerifiedBadge from "@/components/instagram-verified-badge";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex  flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4 w-full ">
      <Link
        to={`/course-details/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={course.courseThumbnail || "/images.jpeg"}
          alt="course-thumbnail"
          className="h-32 w-full md:w-48 object-cover rounded"
        />
        <div className="flex flex-col gap-2 w-full">
          {/* Course Title and Verified Badge in Same Line */}
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg md:text-xl">
              {course.courseTitle || "Unkown"}
            </h1>
          </div>

          <p className="text-sm dark:text-gray-400">
            {course.subTitle || "SubTitle: Nill"}
          </p>

          {/* Instructor Name and Verified Badge in Same Line */}
          <p className="text-sm dark:text-gray-500 flex items-center gap-1 ">
            Instructor:
            <span className="font-bold flex items-center  gap-1 dark:text-white">
              {course.creator?.name}
              <VerifiedBadge size={13} className="mt-1" />
            </span>
          </p>

          {/* Badge */}
          <Badge
            className="w-fit mt-2 md:mt-0 bg-orange-500 text-white cursor-default  rounded-3xl"
            variant="outline"
          >
            {course.courseLevel}
          </Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className=" font-bold text-lg md:text-xl">
          <span className="text-xs text-purple-900">Rs</span>
          {course.coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;
