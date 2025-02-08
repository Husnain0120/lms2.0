import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Star,
  Camera,
  Pencil,
  GraduationCap,
  ImageIcon,
} from "lucide-react";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/featrues/api/authApi";
import { toast } from "sonner";
import "./Profile.css";
import VerifiedBadge from "@/components/instagram-verified-badge";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [editOption, setEditOption] = useState(null);
  const editProfileButtonRef = useRef(null);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useLoadUserQuery();

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      error: updateUserError,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isSuccess && updateUserData) {
      refetch();
      toast.success(updateUserData.message || "Profile updated successfully");
    } else if (updateUserError) {
      const errorMessage =
        updateUserError.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    }
  }, [isSuccess, updateUserData, updateUserError, refetch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br  pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid-movement"></div>
      <div className="max-w-7xl mx-auto relative pt-3 ">
        {isLoading ? (
          <div className="flex  justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
          </div>
        ) : (
          <div className="bg-white dark:bg-black border dark:border-white  rounded-lg overflow-hidden">
            <div className="relative h-48 sm:h-64 md:h-80">
              <div className="absolute inset-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="a"
                      gradientUnits="userSpaceOnUse"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="100%"
                      gradientTransform="rotate(222,648,379)"
                    >
                      <stop offset="0" stop-color="#ffffff"></stop>
                      <stop offset="1" stop-color="#FC726E"></stop>
                    </linearGradient>
                    <pattern
                      patternUnits="userSpaceOnUse"
                      id="b"
                      width="300"
                      height="250"
                      x="0"
                      y="0"
                      viewBox="0 0 1080 900"
                    >
                      <g fill-opacity="0.5">
                        <polygon
                          fill="#444"
                          points="90 150 0 300 180 300"
                        ></polygon>
                        <polygon points="90 150 180 0 0 0"></polygon>
                        <polygon
                          fill="#AAA"
                          points="270 150 360 0 180 0"
                        ></polygon>
                        <polygon
                          fill="#DDD"
                          points="450 150 360 300 540 300"
                        ></polygon>
                        <polygon
                          fill="#999"
                          points="450 150 540 0 360 0"
                        ></polygon>
                        <polygon points="630 150 540 300 720 300"></polygon>
                        <polygon
                          fill="#DDD"
                          points="630 150 720 0 540 0"
                        ></polygon>
                        <polygon
                          fill="#444"
                          points="810 150 720 300 900 300"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="810 150 900 0 720 0"
                        ></polygon>
                        <polygon
                          fill="#DDD"
                          points="990 150 900 300 1080 300"
                        ></polygon>
                        <polygon
                          fill="#444"
                          points="990 150 1080 0 900 0"
                        ></polygon>
                        <polygon
                          fill="#DDD"
                          points="90 450 0 600 180 600"
                        ></polygon>
                        <polygon points="90 450 180 300 0 300"></polygon>
                        <polygon
                          fill="#666"
                          points="270 450 180 600 360 600"
                        ></polygon>
                        <polygon
                          fill="#AAA"
                          points="270 450 360 300 180 300"
                        ></polygon>
                        <polygon
                          fill="#DDD"
                          points="450 450 360 600 540 600"
                        ></polygon>
                        <polygon
                          fill="#999"
                          points="450 450 540 300 360 300"
                        ></polygon>
                        <polygon
                          fill="#999"
                          points="630 450 540 600 720 600"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="630 450 720 300 540 300"
                        ></polygon>
                        <polygon points="810 450 720 600 900 600"></polygon>
                        <polygon
                          fill="#DDD"
                          points="810 450 900 300 720 300"
                        ></polygon>
                        <polygon
                          fill="#AAA"
                          points="990 450 900 600 1080 600"
                        ></polygon>
                        <polygon
                          fill="#444"
                          points="990 450 1080 300 900 300"
                        ></polygon>
                        <polygon
                          fill="#222"
                          points="90 750 0 900 180 900"
                        ></polygon>
                        <polygon points="270 750 180 900 360 900"></polygon>
                        <polygon
                          fill="#DDD"
                          points="270 750 360 600 180 600"
                        ></polygon>
                        <polygon points="450 750 540 600 360 600"></polygon>
                        <polygon points="630 750 540 900 720 900"></polygon>
                        <polygon
                          fill="#444"
                          points="630 750 720 600 540 600"
                        ></polygon>
                        <polygon
                          fill="#AAA"
                          points="810 750 720 900 900 900"
                        ></polygon>
                        <polygon
                          fill="#666"
                          points="810 750 900 600 720 600"
                        ></polygon>
                        <polygon
                          fill="#999"
                          points="990 750 900 900 1080 900"
                        ></polygon>
                        <polygon
                          fill="#999"
                          points="180 0 90 150 270 150"
                        ></polygon>
                        <polygon
                          fill="#444"
                          points="360 0 270 150 450 150"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="540 0 450 150 630 150"
                        ></polygon>
                        <polygon points="900 0 810 150 990 150"></polygon>
                        <polygon
                          fill="#222"
                          points="0 300 -90 450 90 450"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="0 300 90 150 -90 150"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="180 300 90 450 270 450"
                        ></polygon>
                        <polygon
                          fill="#666"
                          points="180 300 270 150 90 150"
                        ></polygon>
                        <polygon
                          fill="#222"
                          points="360 300 270 450 450 450"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="360 300 450 150 270 150"
                        ></polygon>
                        <polygon
                          fill="#444"
                          points="540 300 450 450 630 450"
                        ></polygon>
                        <polygon
                          fill="#222"
                          points="540 300 630 150 450 150"
                        ></polygon>
                        <polygon
                          fill="#AAA"
                          points="720 300 630 450 810 450"
                        ></polygon>
                        <polygon
                          fill="#666"
                          points="720 300 810 150 630 150"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="900 300 810 450 990 450"
                        ></polygon>
                        <polygon
                          fill="#999"
                          points="900 300 990 150 810 150"
                        ></polygon>
                        <polygon points="0 600 -90 750 90 750"></polygon>
                        <polygon
                          fill="#666"
                          points="0 600 90 450 -90 450"
                        ></polygon>
                        <polygon
                          fill="#AAA"
                          points="180 600 90 750 270 750"
                        ></polygon>
                        <polygon
                          fill="#444"
                          points="180 600 270 450 90 450"
                        ></polygon>
                        <polygon
                          fill="#444"
                          points="360 600 270 750 450 750"
                        ></polygon>
                        <polygon
                          fill="#999"
                          points="360 600 450 450 270 450"
                        ></polygon>
                        <polygon
                          fill="#666"
                          points="540 600 630 450 450 450"
                        ></polygon>
                        <polygon
                          fill="#222"
                          points="720 600 630 750 810 750"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="900 600 810 750 990 750"
                        ></polygon>
                        <polygon
                          fill="#222"
                          points="900 600 990 450 810 450"
                        ></polygon>
                        <polygon
                          fill="#DDD"
                          points="0 900 90 750 -90 750"
                        ></polygon>
                        <polygon
                          fill="#444"
                          points="180 900 270 750 90 750"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="360 900 450 750 270 750"
                        ></polygon>
                        <polygon
                          fill="#AAA"
                          points="540 900 630 750 450 750"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="720 900 810 750 630 750"
                        ></polygon>
                        <polygon
                          fill="#222"
                          points="900 900 990 750 810 750"
                        ></polygon>
                        <polygon
                          fill="#222"
                          points="1080 300 990 450 1170 450"
                        ></polygon>
                        <polygon
                          fill="#FFF"
                          points="1080 300 1170 150 990 150"
                        ></polygon>
                        <polygon points="1080 600 990 750 1170 750"></polygon>
                        <polygon
                          fill="#666"
                          points="1080 600 1170 450 990 450"
                        ></polygon>
                        <polygon
                          fill="#DDD"
                          points="1080 900 1170 750 990 750"
                        ></polygon>
                      </g>
                    </pattern>
                  </defs>
                  <rect
                    x="0"
                    y="0"
                    fill="url(#a)"
                    width="100%"
                    height="100%"
                  ></rect>
                  <rect
                    x="0"
                    y="0"
                    fill="url(#b)"
                    width="100%"
                    height="100%"
                  ></rect>
                </svg>
              </div>
              <button className="absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ImageIcon className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8  -mt-16">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white dark:border-black shadow-xl mx-auto">
                    {data.user.photoUrl ? (
                      <img
                        src={data.user.photoUrl || "/images.jpeg"}
                        alt={data.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-4xl text-gray-600">
                          {data.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
                    onClick={() => editProfileButtonRef.current?.click()}
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white flex items-center justify-center ">
                  {data.user.name}{" "}
                  <span className=" mt-1 ml-1 ">
                    {data.user.role === "instructor" ? (
                      <VerifiedBadge size={21} />
                    ) : (
                      ""
                    )}
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {data.user.role}
                </p>
                <p className="mt-2 text-md font-semibold italic text-gray-500 dark:text-gray-400">
                  {data.user.email}
                </p>
              </div>
              <div className="mt-8 flex justify-center space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300"
                      ref={editProfileButtonRef}
                    >
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">
                        Edit Profile
                      </DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                      <div className="flex space-x-4">
                        <Button
                          className={`${
                            editOption === "name"
                              ? "bg-orange-500 text-white"
                              : "bg-gray-800 text-gray-200"
                          } transition-colors duration-200`}
                          onClick={() => setEditOption("name")}
                        >
                          Edit Name
                        </Button>
                        <Button
                          className={`${
                            editOption === "photo"
                              ? "bg-orange-500 text-white"
                              : "bg-gray-800 text-gray-200"
                          } transition-colors duration-200`}
                          onClick={() => setEditOption("photo")}
                        >
                          Edit Photo
                        </Button>
                      </div>

                      {editOption === "name" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="col-span-3"
                            minLength={2}
                          />
                        </div>
                      )}

                      {editOption === "photo" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="photo" className="text-right">
                            Photo
                          </Label>
                          <Input
                            id="photo"
                            type="file"
                            onChange={onChangeHandler}
                            className="col-span-3"
                            accept="image/*"
                          />
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        disabled={updateUserIsLoading}
                        onClick={updateUserHandler}
                        className="bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300"
                      >
                        {updateUserIsLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Updating...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                  onClick={() =>
                    document
                      .getElementById("enrolled-courses")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Courses
                </Button>
              </div>
            </div>
            <hr className="mt-3" />
            <div id="enrolled-courses" className="px-4 sm:px-6 lg:px-8 py-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                <GraduationCap className="w-8 h-8 mr-3 text-orange-500" />
                Enrolled Courses
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.user.enrolledCourses.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 col-span-full text-center py-12 text-xl animate-fade-in">
                    You haven't enrolled in any courses yet.
                  </p>
                ) : (
                  data.user.enrolledCourses.map((course, index) => (
                    <div
                      key={course._id}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <img
                        src={
                          course.courseThumbnail || "/placeholder-course.jpg"
                        }
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                          {course.courseTitle}
                        </h3>
                        {/* <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {course.description && course.description.length > 100
                            ? `${course.description.substring(0, 100)}...`
                            : course.description}
                        </p> */}
                        <p
                          className="text-gray-600 dark:text-gray-300 mb-4 font-thin "
                          dangerouslySetInnerHTML={{
                            __html:
                              course.description &&
                              course.description.length > 100
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
                          onClick={() =>
                            navigate(`/course-details/${course._id}`)
                          }
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
