"use client";

import { useEffect, useState, useCallback } from "react";
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
import LanguageSwitcher from "./LanguageSwitcher";

// Import translations
import enTranslations from "../locales/en.json";
import urTranslations from "../locales/ur.json";

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
  const [currentLanguage, setCurrentLanguage] = useState("en");
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
    input.courseTitle &&
    input.category &&
    input.courseLevel &&
    input.coursePrice;

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
      toast.error(t("pleaseFillAllRequiredFields"));
      return;
    }

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await editCourses({ formData, courseId }).unwrap();
      toast.success(t("courseUpdatedSuccessfully"));
      // navigate("/admin/courses");
    } catch (err) {
      toast.error(err.data?.message || t("failedToUpdateCourse"));
    }
  };

  const handlePublishStatus = async (status) => {
    try {
      await publichCourse({ courseId, query: status }).unwrap();
      toast.success(t("coursePublishStatusUpdatedSuccessfully"));
    } catch (err) {
      toast.error(t("failedToUpdateCoursePublishStatus"));
    }
  };

  const handleDisableCourse = async () => {
    try {
      await disableCourse(courseId).unwrap();
      toast.success(t("courseStatusUpdatedSuccessfully"));
    } catch (err) {
      toast.error(err.data?.message || t("failedToUpdateCourseStatus"));
    }
  };

  const handleLanguageChange = useCallback((language) => {
    setCurrentLanguage(language);
  }, []);

  useEffect(() => {
    // Removed RTL logic here
  }, []);

  const t = (key) => {
    const translations =
      currentLanguage === "en" ? enTranslations : urTranslations;
    return translations[key] || key;
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
                  ? t("courseIsDisabled")
                  : t("courseIsActive")}
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
                    {t("unpublish")}
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 mr-2" />
                    {t("publish")}
                  </>
                )}
              </Button>
              <LanguageSwitcher
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t("removeCourse")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("removeCourseConfirmation")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        /* Add remove course logic here */
                      }}
                    >
                      {t("remove")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            {t("craftYourEducationalMasterpiece")}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {t("shapeExceptionalLearningExperiences")}
            <span className="text-red-500">*</span>
            {t("ensureAllDetailsAreAccurateBeforePublishing")}
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
                  {t("courseTitle")}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="courseTitle"
                  name="courseTitle"
                  value={input.courseTitle}
                  onChange={handleInputChange}
                  placeholder={t("courseTitlePlaceholder")}
                  className={`${!input.courseTitle ? "border-red-500" : ""}`}
                  required
                />
                {!input.courseTitle && (
                  <p className="text-xs text-red-500 mt-1">
                    {t("compellingTitleRequired")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subTitle">{t("subTitle")}</Label>
                <Input
                  id="subTitle"
                  name="subTitle"
                  value={input.subTitle}
                  onChange={handleInputChange}
                  placeholder={t("subTitlePlaceholder")}
                  className=""
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t("courseDescription")}</Label>
              <RichTextEditor
                input={input}
                setInput={setInput}
                lang={currentLanguage}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{t("category")}</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                  value={input.category}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder={t("selectCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("courseCategories")}</SelectLabel>
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
                  {t("skillLevel")}
                  <span className="text-red-500">*</span>
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
                    <SelectValue placeholder={t("selectProficiencyLevel")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("learningJourney")}</SelectLabel>
                      <SelectItem value="Beginner">
                        {t("beginnerFriendly")}
                      </SelectItem>
                      <SelectItem value="Medium">
                        {t("intermediateMastery")}
                      </SelectItem>
                      <SelectItem value="Advance">
                        {t("advancedExpertise")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {!input.courseLevel && (
                  <p className="text-xs text-red-500 mt-1">
                    {t("selectAppropriateDifficultyLevel")}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="coursePrice">
                  {t("coursePrice")}
                  <span className="text-red-500">*</span>
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
                    placeholder={t("coursePricePlaceholder")}
                    className={`pl-7 ${
                      !input.coursePrice ? "border-red-500" : ""
                    }`}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                {!input.coursePrice && (
                  <p className="text-xs text-red-500 mt-1">
                    {t("setFairPriceForYourCourse")}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseThumbnail">{t("courseThumbnail")}</Label>
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
                  alt={t("courseThumbnailPreview")}
                />
              )}
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (window.confirm(t("discardChangesConfirmation"))) {
                    navigate(`/admin/courses`);
                  }
                }}
              >
                <X className="w-4 h-4 mr-2" />
                {t("discardChanges")}
              </Button>
              <Button
                type="submit"
                disabled={editLoading || courseLoading || !isFormValid}
                className="bg-primary hover:bg-primary/90 transition-colors"
              >
                {editLoading || courseLoading ? (
                  <>
                    <Loader className="mr-2" />
                    {t("securingChanges")}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t("commitUpdates")}
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
