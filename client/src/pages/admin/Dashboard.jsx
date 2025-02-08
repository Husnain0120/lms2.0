"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/featrues/api/purchaseApi";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetPurchasedCoursesQuery();
  const [isTableExpanded, setIsTableExpanded] = React.useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  const { purchasedCourse } = data || { purchasedCourse: [] };

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
    date: new Date(course.createdAt).toLocaleDateString(),
    time: new Date(course.createdAt).toLocaleTimeString(),
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;

  // Chart data
  const chartData = [
    {
      name: "Sales",
      value: totalSales,
      fill: "#3b82f6", // blue-500
    },
    {
      name: "Revenue",
      value: totalRevenue,
      fill: "#10b981", // green-500
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold text-gray-800 dark:text-white mb-6"
      >
        Dashboard
      </motion.h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatedCard
          title="Total Sales"
          value={totalSales}
          icon={<Users className="h-8 w-8 text-blue-500" />}
          trend={5.2}
          color="blue"
        />
        <AnimatedCard
          title="Total Revenue"
          value={`${totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-8 w-8 text-green-500" />}
          trend={3.1}
          color="green"
        />
        <AnimatedCard
          title="Sales Distribution"
          content={
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="30%"
                outerRadius="80%"
                data={chartData}
                startAngle={180}
                endAngle={0}
              >
                <PolarRadiusAxis
                  type="number"
                  domain={[0, Math.max(totalSales, totalRevenue)]}
                  tick={false}
                  axisLine={false}
                />
                <RadialBar
                  minAngle={15}
                  background
                  clockWise={true}
                  dataKey="value"
                  cornerRadius={10}
                  label={{ fill: "#666", position: "insideStart" }}
                />
                <Label
                  content={({ viewBox }) => {
                    const { cx, cy } = viewBox;
                    return (
                      <text
                        x={cx}
                        y={cy}
                        fill="#333"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={cx}
                          dy="-1em"
                          fontSize="1.2em"
                          fontWeight="bold"
                        >
                          Total
                        </tspan>
                        <tspan x={cx} dy="1.5em" fontSize="1em">
                          {totalSales + totalRevenue}
                        </tspan>
                      </text>
                    );
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          }
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Purchased Courses
            </CardTitle>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsTableExpanded(!isTableExpanded)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ChevronDown
                className={`h-6 w-6 transform transition-transform ${
                  isTableExpanded ? "rotate-180" : ""
                }`}
              />
            </motion.button>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={false}
              animate={{ height: isTableExpanded ? "auto" : "300px" }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="p-2 text-left text-gray-600 dark:text-gray-300">
                        Course Name
                      </th>
                      <th className="p-2 text-left text-gray-600 dark:text-gray-300">
                        Price
                      </th>
                      <th className="p-2 text-left text-gray-600 dark:text-gray-300">
                        Date
                      </th>
                      <th className="p-2 text-left text-gray-600 dark:text-gray-300">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.map((course, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-500"
                      >
                        <td className="p-2 text-gray-800 dark:text-gray-200">
                          {course.name}
                        </td>
                        <td className="p-2 text-gray-800 dark:text-gray-200">
                          {course.price}
                        </td>
                        <td className="p-2 text-gray-800 dark:text-gray-200">
                          {course.date}
                        </td>
                        <td className="p-2 text-gray-800 dark:text-gray-200">
                          {course.time}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const AnimatedCard = ({ title, value, icon, trend, color, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {content ? (
          content
        ) : (
          <>
            <div
              className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}
            >
              {value}
            </div>
            {trend && (
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                <span className="text-green-500 dark:text-green-400 font-medium">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  {trend}%
                </span>{" "}
                vs last month
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
    />
  </div>
);

const ErrorMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex justify-center items-center h-screen"
  >
    <p className="text-red-500 text-xl">
      Failed to get purchased courses. Please try again later.
    </p>
  </motion.div>
);

export default Dashboard;
