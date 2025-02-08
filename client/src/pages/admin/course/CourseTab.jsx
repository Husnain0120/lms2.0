"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import RichTextEditor from "@/components/RichTextEditor";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDisableCourseMutation,
  useEditCoursesMutation,
  useGetCourseByIdQuery,
  usePublichCourseMutation,
} from "@/featrues/api/courseApi";
import Loader from "@/components/Loader";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Save, X, UploadCloud, CheckCircle } from "lucide-react";

const categories = [
  "Ada",
  "Assembly",
  "Bash",
  "C",
  "C#",
  "C++",
  "COBOL",
  "CSS",
  "Dart",
  "Django",
  "Elixir",
  "Elm",
  "Erlang",
  "Express",
  "F#",
  "Fortran",
  "Go",
  "GraphQL",
  "Haskell",
  "HTML",
  "Java",
  "JavaScript",
  "Julia",
  "Kotlin",
  "Lisp",
  "Lua",
  "MATLAB",
  "Mern Stack",
  "MongoDB",
  "Next.js",
  "Node.js",
  "Objective-C",
  "Pascal",
  "Perl",
  "PHP",
  "PostgreSQL",
  "Prolog",
  "Python",
  "R",
  "React",
  "Redis",
  "Ruby",
  "Rust",
  "Scala",
  "Shell",
  "Smalltalk",
  "Solidity",
  "SQL",
  "Swift",
  "TypeScript",
  "VBA",
  "Visual Basic",
  "Vue.js",
  "XML",
  "YAML",
  "Zig",
];

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [
    editCourses,
    { isLoading: editLoading, isSuccess: editSuccess, error: editError },
  ] = useEditCoursesMutation();
  const [publichCourse] = usePublichCourseMutation();
  const [disableCourse] = useDisableCourseMutation();

  const {
    data: courseData,
    isLoading: courseLoading,
    error: courseError,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const isFormValid =
    input.courseTitle && input.courseLevel && input.coursePrice;

  useEffect(() => {
    if (courseData?.course) {
      const course = courseData.course;
      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: course.courseThumbnail || "",
      });
      setPreviewThumbnail(course.courseThumbnail || null);
    }
  }, [courseData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateCourse = async () => {
    if (!isFormValid) {
      toast.error("Please fill all required fields marked with *");
      return;
    }

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await editCourses({ formData, courseId }).unwrap();
      toast.success("Course updated successfully");
      navigate("/admin/courses");
    } catch (err) {
      toast.error(err.data?.message || "Failed to update course");
    }
  };

  const handlePublishStatus = async (status) => {
    try {
      await publichCourse({ courseId, query: status }).unwrap();
      toast.success("Course publish status updated successfully");
    } catch (err) {
      toast.error("Failed to update course publish status");
    }
  };

  const handleDisableCourse = async () => {
    try {
      await disableCourse(courseId).unwrap();
      toast.success("Course status updated successfully");
    } catch (err) {
      toast.error(err.data?.message || "Failed to update course status");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={`${
          editLoading || courseLoading ? "pointer-events-none opacity-60" : ""
        }`}
      >
        {(editLoading || courseLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/75 z-50">
            <Loader />
          </div>
        )}
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="course-status"
                checked={!courseData?.course.isDisabled}
                onCheckedChange={handleDisableCourse}
              />
              <Label htmlFor="course-status">
                {courseData?.course.isDisabled
                  ? "Course is Disabled"
                  : "Course is Active"}
              </Label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                disabled={
                  courseData?.course.lectures.length === 0 ||
                  !isFormValid ||
                  editLoading
                }
                onClick={() =>
                  handlePublishStatus(
                    courseData?.course.isPublished ? "false" : "true"
                  )
                }
              >
                {courseData?.course.isPublished ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Unpublish
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 mr-2" />
                    Publish
                  </>
                )}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Course
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the course and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        /* Add remove course logic here */
                      }}
                    >
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            Craft Your Educational Masterpiece
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Shape exceptional learning experiences. Required fields are marked
            with <span className="text-red-500">*</span>. Ensure all details are
            accurate before publishing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateCourse();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseTitle">
                  Course Title<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="courseTitle"
                  name="courseTitle"
                  value={input.courseTitle}
                  onChange={handleInputChange}
                  placeholder="Ex. Fullstack Web Development Masterclass"
                  className={!input.courseTitle ? "border-red-500" : ""}
                />
                {!input.courseTitle && (
                  <p className="text-xs text-red-500 mt-1">
                    A compelling title is required
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subTitle">Subtitle</Label>
                <Input
                  id="subTitle"
                  name="subTitle"
                  value={input.subTitle}
                  onChange={handleInputChange}
                  placeholder="Ex. From Zero to Hero: Build Modern Web Applications"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                  value={input.category}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course Categories</SelectLabel>
                      {categories.map((category, index) => (
                        <SelectItem key={index} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseLevel">
                  Skill Level<span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("courseLevel", value)
                  }
                  value={input.courseLevel}
                >
                  <SelectTrigger
                    id="courseLevel"
                    className={!input.courseLevel ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Proficiency Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Learning Journey</SelectLabel>
                      <SelectItem value="Beginner">
                        Beginner Friendly
                      </SelectItem>
                      <SelectItem value="Medium">
                        Intermediate Mastery
                      </SelectItem>
                      <SelectItem value="Advance">
                        Advanced Expertise
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {!input.courseLevel && (
                  <p className="text-xs text-red-500 mt-1">
                    Select appropriate difficulty level
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="coursePrice">
                  Course Price<span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1.5 mr-1 text-muted-foreground">
                    Rs{" "}
                  </span>
                  <Input
                    id="coursePrice"
                    name="coursePrice"
                    type="number"
                    value={input.coursePrice}
                    onChange={handleInputChange}
                    placeholder="Ex. 299"
                    className={`pl-7 ${
                      !input.coursePrice ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {!input.coursePrice && (
                  <p className="text-xs text-red-500 mt-1">
                    Set a fair price for your course
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseThumbnail">Course Thumbnail</Label>
              <Input
                id="courseThumbnail"
                type="file"
                onChange={handleThumbnailChange}
                accept="image/*"
              />
              {previewThumbnail && (
                <img
                  src={previewThumbnail || "/placeholder.svg"}
                  className="w-full max-w-md mt-2 rounded-md border"
                  alt="Course Thumbnail Preview"
                />
              )}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to cancel editing the course?"
                    )
                  ) {
                    navigate(`/admin/courses`);
                  }
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Discard Changes
              </Button>
              <Button
                type="submit"
                disabled={editLoading || courseLoading || !isFormValid}
                className="bg-primary hover:bg-primary/90 transition-colors"
              >
                {editLoading || courseLoading ? (
                  <>
                    <Loader className="mr-2" />
                    Securing Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Commit Updates
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseTab;
