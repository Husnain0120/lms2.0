import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const { courseId } = useParams();

  return (
    <div>
      <div className=" flex items-center justify-between mb-5 ">
        <div className=" flex items-center gap-2 ">
          <Link to={`/admin/courses/edit/${courseId}/lecture`}>
            <Button
              size="icon"
              variant="outline"
              color="primary"
              className="rounded-full p-2 hover:bg-primary-100 dark:hover:bg-primary-600 transition-all duration-300"
            >
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1>Update Your Lecture</h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
