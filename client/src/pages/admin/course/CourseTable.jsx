import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import Badge component
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/featrues/api/courseApi";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseTable.css";

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetCreatorCourseQuery();

  // Refetch data after creating a new course
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const courses = data?.courses || [];

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
      {/* Button to navigate to course creation page */}
      <button
        className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => navigate("/admin/courses/create")}
      >
        Create Course
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.25rem"
          height="1.25rem"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          className="ml-2"
        >
          <path d="M12 19v-7m0 0V5m0 7H5m7 0h7"></path>
        </svg>
      </button>

      <Table className="mt-4">
        {/* <TableCaption className="text-lg font-semibold text-gray-700">
          You have{" "}
          <span className="bg-green-100 text-green-800 px-5 rounded-lg">
            {courses.length}
          </span>{" "}
          courses created.
        </TableCaption> */}
        <TableHeader>
          <TableRow className="bg-gray-200 dark:bg-gray-700">
            <TableHead className="w-[50px] text-center cursor-default">
              #
            </TableHead>{" "}
            {/* Numbering column */}
            <TableHead className="cursor-default w-[300px]">Title</TableHead>
            <TableHead className="cursor-default w-[150px]">Category</TableHead>
            <TableHead className="cursor-default w-[100px]">
              Enrolled Students
            </TableHead>
            <TableHead className="cursor-default w-[100px]">Lectures</TableHead>
            <TableHead className="w-[100px] text-center cursor-default">
              Price
            </TableHead>{" "}
            {/* Price column */}
            <TableHead className="cursor-default w-[100px] text-center">
              Public
            </TableHead>
            <TableHead className="cursor-default w-[100px] text-center">
              Disabled
            </TableHead>
            <TableHead className="cursor-default text-right w-[150px]">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow
              key={course._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              <TableCell className="cursor-default text-center">
                {index + 1}
              </TableCell>{" "}
              {/* Numbering cell */}
              <TableCell className="font-medium cursor-default">
                {course.courseTitle}
              </TableCell>
              <TableCell>
                <Badge
                  variant="success"
                  className="bg-orange-500 cursor-default dark:bg-blue-900  text-white opacity-70 rounded-full dark:text-green-200"
                >
                  {course?.category.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className={"cursor-default"}>
                {course.enrolledStudents?.length || "0"}
              </TableCell>
              <TableCell className="cursor-default">
                {course.lectures?.length || "0"}
              </TableCell>
              {/* Price Column */}
              <TableCell className="text-center">
                <Badge
                  variant="success"
                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 cursor-default"
                >
                  {course?.coursePrice || "NA"}
                </Badge>
              </TableCell>
              {/* Badge for isPublic */}
              <TableCell className="text-center cursor-default">
                <Badge
                  variant={course.isPublished && "outline"}
                  className={
                    course.isPublished
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 cursor-default"
                  }
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              {/* Badge for isDisabled */}
              <TableCell className="text-center cursor-default">
                <Badge
                  variant={course.isDisabled ? "outline" : "outline"}
                  className={
                    course.isDisabled
                      ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  }
                >
                  {course.isDisabled ? "Disabled" : "Active"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  className="transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => navigate(`/admin/courses/edit/${course._id}`)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {courses.length === 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                {" "}
                {/* Updated colspan to 9 */}
                No courses available.
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export default CourseTable;
