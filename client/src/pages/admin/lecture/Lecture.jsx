import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture01, index, courseId }) => {
  const navigate = useNavigate();

  const gotoUpdateLecture = () => {
    navigate(`${lecture01._id}`);
  };

  return (
    <div className="flex items-center justify-between bg-[#f7f9fa] dark:bg-[#252525] px-5 py-3 rounded-lg shadow-lg my-3 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Lecture Title */}
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Lecture {index + 1}: {lecture01.lectureTitle}
      </h1>

      {/* Edit Button */}
      <Edit
        className="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
        size={22}
        onClick={gotoUpdateLecture}
      />
    </div>
  );
};

export default Lecture;
