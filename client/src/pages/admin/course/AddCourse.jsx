import { Button } from "@/components/ui/button";
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
import { useCreateCourseMutation } from "@/featrues/api/courseApi";
import { ArrowBigLeft, Loader2, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState(""); // State for course title
  const [category, setCategory] = useState(""); // State for course category
  const navigate = useNavigate();

  // Mutation hook for creating a course
  const [createCourse, { data, error, isSuccess, isLoading }] =
    useCreateCourseMutation();

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

  // Handle category selection
  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  // Create course handler
  const createCourseHandler = async () => {
    if (!courseTitle || !category) {
      toast.error("Course title and category are required.");
      return;
    }

    toast.loading("Creating course...");
    await createCourse({ courseTitle, category });
  };

  // useEffect to handle toast notifications
  useEffect(() => {
    if (isSuccess) {
      toast.dismiss(); // Remove the loading toast
      toast.success(data.message || "Course created successfully.");

      navigate("/admin/courses");

      // Reset form fields
      setCourseTitle(""); // Clear the course title input field
      setCategory("");
      // Clear the category selection
    }

    if (error) {
      toast.dismiss(); // Remove the loading toast
      toast.error(error.data?.message || "Failed to create course.");
    }
  }, [data, error, isSuccess]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add a course, add some basic course details for your new course
        </h1>
        <p className="text-xs">
          Fill in the required details to create a new course effortlessly.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            disabled={isLoading}
            type="text"
            name="courseTitle"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle} // Reset to empty when isSuccess is true
            placeholder="Your Course Name"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select
            disabled={isLoading}
            onValueChange={getSelectedCategory}
            value={category || undefined} // Use `undefined` to reset the Select to placeholder
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Course Category</SelectLabel>
                {categories.map((category, index) => (
                  <SelectItem key={index} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => navigate("/admin/courses")}
          >
            <span>
              <ArrowBigLeft />
            </span>{" "}
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                Create{" "}
                <span>
                  <Plus />
                </span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
