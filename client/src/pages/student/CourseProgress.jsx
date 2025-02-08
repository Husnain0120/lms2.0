import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/featrues/api/courseProgressApi";
import {
  CheckCircle,
  CheckCircle2,
  CirclePlay,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { isSuccess: completedSuccess }] =
    useCompleteCourseMutation();
  const [inCompleteCourse, { isSuccess: inCompletedSuccess }] =
    useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(true);

  // Debounced toast function
  const debouncedToast = useCallback(
    debounce((message) => {
      toast.success(message);
    }, 1000),
    []
  );

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      debouncedToast("Course marked as completed");
    }
    if (inCompletedSuccess) {
      refetch();
      debouncedToast("Course marked as incomplete");
    }
  }, [completedSuccess, inCompletedSuccess, refetch, debouncedToast]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures } = courseDetails;

  const initialLecture = currentLecture || (lectures && lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
    debouncedToast("Progress updated");
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  const togglePlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  };

  return (
    <div
      className="max-w-full mx-auto p-4 pt-20
     bg-gray-50 dark:bg-gray-900 min-h-screen "
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Course Title and Completion Status */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white"
          >
            {courseTitle}
          </motion.h1>
          <Button
            onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
            variant={completed ? "outline" : "default"}
            className="transition-all duration-300 ease-in-out transform hover:scale-105 "
          >
            {completed ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Completed</span>
              </motion.div>
            ) : (
              "Mark as completed"
            )}
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video Player Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 rounded-lg shadow-2xl overflow-hidden bg-white dark:bg-gray-800"
          >
            <div className="aspect-w-16 aspect-h-9">
              <video
                src={currentLecture?.videoUrl || initialLecture.videoUrl}
                controls
                className="w-full h-full object-cover"
                onPlay={() =>
                  handleLectureProgress(
                    currentLecture?._id || initialLecture._id
                  )
                }
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                {`Lecture ${
                  lectures.findIndex(
                    (lec) =>
                      lec._id === (currentLecture?._id || initialLecture._id)
                  ) + 1
                }: ${
                  currentLecture?.lectureTitle || initialLecture.lectureTitle
                }`}
              </h3>
            </div>
          </motion.div>

          {/* Lecture Playlist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={togglePlaylist}
            >
              <h2 className="font-bold text-xl text-gray-800 dark:text-white">
                Course Lectures
              </h2>
              {isPlaylistOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
            <AnimatePresence>
              {isPlaylistOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex-1 overflow-y-auto space-y-2 p-4"
                    style={{ maxHeight: "60vh" }}
                  >
                    {lectures.map((lecture, index) => (
                      <motion.div
                        key={lecture._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card
                          className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${
                            lecture._id === currentLecture?._id
                              ? "bg-blue-50 dark:bg-blue-900 border-blue-500"
                              : "bg-white dark:bg-gray-800"
                          }`}
                          onClick={() => handleSelectLecture(lecture)}
                        >
                          <CardContent className="flex items-center justify-between p-3">
                            <div className="flex items-center space-x-3">
                              {isLectureCompleted(lecture._id) ? (
                                <CheckCircle2
                                  size={20}
                                  className="text-green-500"
                                />
                              ) : (
                                <CirclePlay
                                  size={20}
                                  className="text-blue-500"
                                />
                              )}
                              <div className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                {`${index + 1}. ${lecture.lectureTitle}`}
                              </div>
                            </div>
                            {isLectureCompleted(lecture._id) && (
                              <Badge
                                variant="success"
                                className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              >
                                Completed
                              </Badge>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
  </div>
);

// Error message component
const ErrorMessage = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-red-500 text-xl">
      Failed to load course details. Please try again later.
    </p>
  </div>
);

export default CourseProgress;
