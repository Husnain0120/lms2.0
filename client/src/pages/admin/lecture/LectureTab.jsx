"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
import axios from "axios";
import { toast } from "sonner";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/featrues/api/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Upload, Trash2, AlertCircle } from "lucide-react";

const MEDIA_API = "http://localhost:8088/api/v1/media";

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [uploadVedioInfo, setUploadVedioInfo] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();

  const [editLecture, { isLoading: editIsLoading, error: editError }] =
    useEditLectureMutation();
  const [removeLecture, { isLoading: removeIsLoading, error: removeError }] =
    useRemoveLectureMutation();
  const { data: lectureData, isLoading: lectureIsLoading } =
    useGetLectureByIdQuery(lectureId);

  useEffect(() => {
    if (lectureData?.lecture) {
      setTitle(lectureData.lecture.lectureTitle);
      setIsFree(lectureData.lecture.isPreviewFree || false);
      setVideoPreviewUrl(lectureData.lecture.videoUrl);
      setUploadVedioInfo({
        videoUrl: lectureData.lecture.videoUrl,
        publicId: lectureData.lecture.publicId,
      });
    }
  }, [lectureData]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      setUploadProgress(0);
      setUploadError("");

      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            const progress = Math.round((loaded / total) * 100);
            setUploadProgress(progress < 100 ? progress : 99);
          },
        });

        if (res.data?.success && res.data?.data) {
          setUploadVedioInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setVideoPreviewUrl(res.data.data.url);
          setUploadProgress(100);
          toast.success(res.data.message || "Video uploaded successfully!");
        } else {
          throw new Error(res.data.message || "Unexpected API response");
        }
      } catch (error) {
        console.error("Video upload error:", error.response?.data || error);
        setUploadError("Video upload failed. Please try again.");
        setVideoPreviewUrl("");
        setUploadVedioInfo(null);
        toast.error("Video upload failed. Please try again.");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const handleEditLecture = async () => {
    try {
      await editLecture({
        lectureTitle: title,
        videoInfo: uploadVedioInfo,
        isPreviewFree: isFree,
        courseId,
        lectureId,
      });
      toast.success("Lecture updated successfully");
      navigate(`/admin/courses/edit/${courseId}/lecture`);
    } catch (error) {
      toast.error(error.data?.message || "Failed to update lecture");
    }
  };

  const removeLectureHandler = async () => {
    try {
      await removeLecture(lectureId);
      toast.success("Lecture removed successfully");
      navigate(`/admin/courses/edit/${courseId}/lecture`);
    } catch (error) {
      toast.error(error.data?.message || "Failed to remove lecture");
    }
  };

  if (lectureIsLoading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold">Edit Lecture</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Update your lecture details here
            </CardDescription>
          </div>
          <AlertDialog
            open={isRemoveDialogOpen}
            onOpenChange={setIsRemoveDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full sm:w-auto"
                disabled={removeIsLoading}
              >
                {removeIsLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin mr-2" />
                    Removing
                  </span>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Lecture
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  lecture and remove it from the course.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={removeLectureHandler}>
                  {removeIsLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin mr-2" />
                      Removing...
                    </span>
                  ) : (
                    "Remove"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="title" className="text-lg font-semibold">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              className="mt-1 text-lg"
              placeholder="Ex. Introduction ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="video-upload" className="text-lg font-semibold">
              Video <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="video-upload"
                type="file"
                onChange={fileChangeHandler}
                className="w-full"
                accept="video/*"
                ref={fileInputRef}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-2"
          >
            <Switch
              id="free-video"
              checked={isFree}
              onCheckedChange={setIsFree}
            />
            <Label htmlFor="free-video" className="text-base">
              Free video <span className="text-gray-500">(optional)</span>
            </Label>
          </motion.div>

          <AnimatePresence>
            {videoPreviewUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-2"
              >
                <Label className="text-lg font-semibold">Video Preview</Label>
                <video
                  src={videoPreviewUrl}
                  controls
                  className="w-full max-w-md h-auto rounded-md shadow-lg"
                ></video>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {mediaProgress && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-2"
              >
                <Progress value={uploadProgress} className="w-full" />
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-yellow-500 text-yellow-900 font-medium px-2.5 py-0.5 rounded-full">
                    {uploadProgress}%
                  </span>
                  <p className="flex items-center">
                    {uploadProgress === 99 ? (
                      <span className="text-yellow-600">
                        Finalizing upload, please wait...
                      </span>
                    ) : (
                      "Uploading..."
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {uploadError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-red-500"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{uploadError}</span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleEditLecture}
              disabled={editIsLoading || !uploadVedioInfo}
              className="w-full sm:w-auto"
            >
              {editIsLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin mr-2" />
                  Updating
                </span>
              ) : (
                "Update Lecture"
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
);

export default LectureTab;
