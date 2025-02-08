import BuyCourseBtn from "@/components/BuyCourseBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/featrues/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle, CheckCircle } from "lucide-react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-20">
      <div
        className="bg-cover bg-center bg-no-repeat text-white relative"
        style={{
          backgroundImage: `url(${
            course?.courseThumbnail || "/placeholder.svg"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              {course?.courseTitle}
            </h1>
            <p className="text-xl mb-4">Course Sub-title</p>
            <p className="mb-2">
              Created By{" "}
              <span className="text-blue-300 underline italic">
                {course?.creator.name}
              </span>
            </p>
            <div className="flex items-center gap-2 text-sm mb-2">
              <BadgeInfo size={16} />
              <p>Last updated {course?.createdAt.split("T")[0]}</p>
            </div>
            <p>Students enrolled: {course?.enrolledStudents.length}</p>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>
                    {course.lectures.length} lectures
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {course.lectures.map((lecture, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <span>
                        {purchased ? (
                          <PlayCircle size={14} />
                        ) : (
                          <Lock size={14} />
                        )}
                      </span>
                      <p>{lecture.lectureTitle}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-4 flex flex-col">
                  <div className="w-full aspect-video mb-4">
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={course.lectures[0].videoUrl}
                      controls={true}
                    />
                  </div>
                  <h2 className="text-lg font-semibold mb-2">
                    Preview Lecture
                  </h2>
                  <Separator className="my-4" />
                  {purchased ? (
                    <div className="space-y-4">
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="mr-2" />
                        <span className="font-semibold">Course Purchased</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        You have full access to this course. Continue your
                        learning journey!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">
                        <span>Rs</span>
                        {course.coursePrice.toFixed(2)}
                      </h2>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-center">
                          <CheckCircle
                            className="mr-2 text-green-600"
                            size={16}
                          />
                          Full lifetime access
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            className="mr-2 text-green-600"
                            size={16}
                          />
                          Access on mobile and TV
                        </li>
                        <li className="flex items-center">
                          <CheckCircle
                            className="mr-2 text-green-600"
                            size={16}
                          />
                          Certificate of completion
                        </li>
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4">
                  {purchased ? (
                    <Button onClick={handleContinueCourse} className="w-full">
                      Continue Course
                    </Button>
                  ) : (
                    <BuyCourseBtn courseId={courseId} />
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const ErrorMessage = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-red-500 text-xl">
      Failed to load course details. Please try again later.
    </p>
  </div>
);

export default CourseDetail;
