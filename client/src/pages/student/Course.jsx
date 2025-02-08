import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import VerifiedBadge from "@/components/instagram-verified-badge";

const Course = ({ course, user }) => {
  const [disable] = useState(course.isDisabled); // Directly set state from prop

  const getBadgeColor = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-500 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      case "advance":
        return "bg-red-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };
  const myLearning = user?.user;
  console.log(myLearning);
  return (
    <Card
      className={`overflow-hidden rounded-lg dark:bg-gray-950 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
        disable ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="relative">
        <img
          src={course.courseThumbnail || "./images.jpeg"}
          alt="courses"
          className="w-full h-36 object-cover rounded-t-lg"
        />
        <Badge
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-3xl shadow-lg ${getBadgeColor(
            course.courseLevel
          )}`}
        >
          {course.courseLevel || "medium"}
        </Badge>
      </div>
      <CardContent className="px-4 py-3 space-y-3">
        <h1 className="font-bold text-lg line-clamp-2 h-14 truncate">
          <Link to={`/course-details/${course._id}`}>{course.courseTitle}</Link>
        </h1>
        <div className="flex items-center space-x-2">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage
              src={course.creator.photoUrl || "https://github.com/shadcn.png"}
              alt={course.creator.name}
              className="object-cover border-[1px] border-black rounded-full"
            />
            <AvatarFallback>{course.creator.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-1">
              <h1 className="font-medium text-sm truncate">
                {course.creator.name}
              </h1>
              {course.creator.role === "instructor" && (
                <VerifiedBadge className="mt-1" size={13} />
              )}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {course.creator.role}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold text-white italic bg-fuchsia-800 px-2 py-1 rounded-full">
            Rs {Number.parseFloat(course.coursePrice).toFixed()}
          </div>
          <div className="text-xs text-gray-500">
            {course.enrolledStudents.length} students
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
