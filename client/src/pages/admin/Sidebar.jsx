import { ChartNoAxesColumn, Megaphone, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLoadUserQuery } from "@/featrues/api/authApi";

const Sidebar = () => {
  const { data } = useLoadUserQuery();
  // console.log(data);
  const userId = data?.user._id;
  // console.log(userId);
  return (
    <div className="flex">
      {/* Sidebar with Motion Effects */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen bg-white dark:bg-black shadow-lg"
      >
        <div className="space-y-4 mt-20">
          {/* Dashboard Link */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 p-3 rounded-lg transition-all hover:text-white hover:bg-black dark:bg-black dark:hover:bg-gray-800"
            >
              <ChartNoAxesColumn size={22} />
              <h1>Dashboard</h1>
            </Link>
          </motion.div>

          {/* Courses Link */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link
              to="/admin/courses"
              className="flex items-center gap-2 p-3 rounded-lg transition-all  hover:bg-black dark:bg-black dark:hover:bg-gray-800 hover:text-white"
            >
              <SquareLibrary size={22} />
              <h1>Courses</h1>
            </Link>
          </motion.div>

          {/* Ads Manager (Enabled) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link
              to={`/admin/ads/${userId}`}
              className="flex items-center gap-2 p-3 rounded-lg transition-all  hover:bg-black dark:bg-black dark:hover:bg-gray-800 hover:text-white"
            >
              <Megaphone size={22} />
              <h1>Ads Manager</h1>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-2 md:p-24 mt-24 md:mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
