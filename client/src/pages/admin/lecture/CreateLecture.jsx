import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft, Loader2, Plus } from "lucide-react";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/featrues/api/courseApi";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [lectureTitle, setLectureTitle] = useState("");
  const MAX_TITLE_LENGTH = 60;

  // API Calls
  const [createLecture, { isLoading, data, isSuccess, error }] =
    useCreateLectureMutation();
  const {
    data: lectureData,
    error: lectureError,
    isLoading: lectureLoading,
  } = useGetCourseLectureQuery(courseId);

  // Create Lecture Handler
  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) {
      toast.error("Lecture title cannot be empty");
      return;
    }
    await createLecture({ courseId, lectureTitle });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture created successfully");
      setLectureTitle(""); // Clear input after success
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to create lecture");
    }
  }, [data, error, isSuccess]);

  return (
    <div className="flex-1 mx-8 md:mx-10">
      {/* Header */}
      <div className="mb-5">
        <h1 className="font-bold text-2xl">Create a New Lecture</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Fill in the required details to create a new lecture effortlessly.
        </p>
      </div>

      {/* Form Input */}
      <div className="space-y-4">
        <div>
          <Label>Lecture Title</Label>
          <Input
            disabled={isLoading}
            type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter lecture title..."
            maxLength={MAX_TITLE_LENGTH}
            className={`mt-1 ${
              lectureTitle.length >= MAX_TITLE_LENGTH ? "border-red-500" : ""
            }`}
          />
          {lectureTitle.length >= MAX_TITLE_LENGTH && (
            <p className="text-red-500 text-xs">Max length of title is 60</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => navigate(`/admin/courses/edit/${courseId}`)}
          >
            <ArrowBigLeft className="mr-2" /> Back to Course
          </Button>

          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Please wait
              </>
            ) : (
              <>
                Create Lecture <Plus className="ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Lectures List */}
        <div className="mt-8">
          {lectureLoading ? (
            <p className="flex items-center text-gray-600 dark:text-gray-300">
              <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading
              lectures...
            </p>
          ) : lectureError ? (
            <p className="text-red-500">Failed to load lectures</p>
          ) : lectureData?.lectures?.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              No lectures available
            </p>
          ) : (
            lectureData?.lectures?.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture01={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
