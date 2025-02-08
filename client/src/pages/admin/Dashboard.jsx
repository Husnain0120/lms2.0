import React from "react";
import { TrendingUp, Users, DollarSign, BookOpen } from "lucide-react";
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
  console.log("data: ", data);
  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return <h1 className="text-red-500">Failed to get purchased courses</h1>;

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
    <div className="p-6 space-y-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-500">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{totalSales}</div>
            <p className="text-sm text-gray-600 mt-1">
              <TrendingUp className="inline h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">5.2%</span> vs last
              month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-500">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              <TrendingUp className="inline h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">3.1%</span> vs last
              month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-500">
              Sales Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
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
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Purchased Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Course Name</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {courseData.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">
                      {course.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ₹{course.price}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.date}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
