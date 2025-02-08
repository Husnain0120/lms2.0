import React from "react";
import { CourseSkeleton } from "./Courses";

import { useLoadUserQuery } from "@/featrues/api/authApi";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user || [];
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mt-20 mx-auto my-12 px-4 lg:px-8">
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Learning
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <CourseSkeleton key={index} />
          ))
        ) : myLearning.enrolledCourses.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              You're not enrolled in any courses yet
            </p>
          </div>
        ) : (
          myLearning.enrolledCourses.map((course, index) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={course.courseThumbnail || "/placeholder-course.jpg"}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white   truncate">
                  {course.courseTitle}
                </h3>
                {/* <p className="text-gray-600 dark:text-gray-300 mb-4">
                                   {course.description && course.description.length > 100
                                     ? `${course.description.substring(0, 100)}...`
                                     : course.description}
                                 </p> */}
                <p
                  className="text-gray-600 dark:text-gray-300 mb-4 font-thin truncate "
                  dangerouslySetInnerHTML={{
                    __html:
                      course.description && course.description.length > 100
                        ? `${course.description.substring(0, 100)}...`
                        : course.description
                        ? course.description
                        : "Description is not aviable",
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    {course.enrolledStudents.length} Enrolled Students
                  </span>
                  <span>{course.lectures.length} lessons</span>
                </div>
                <Button
                  onClick={() => navigate(`/course-details/${course._id}`)}
                  className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300"
                >
                  Continue Learning
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyLearning;
