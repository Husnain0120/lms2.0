import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";

import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import Ads from "./pages/admin/ads_manager/ads";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <ProtectedRoute>
              <HeroSection />
              {/*courses */}
              <Courses />
            </ProtectedRoute>
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            {" "}
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <ProtectedRoute>
            {" "}
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            {" "}
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-details/:courseId",
        element: (
          <ProtectedRoute>
            {" "}
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            {" "}
            <CourseProgress />
          </ProtectedRoute>
        ),
      },
      // admin routes
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: (
              <AdminRoute>
                {" "}
                <Dashboard />
              </AdminRoute>
            ),
          },
          {
            path: "ads/:userId",
            element: (
              <AdminRoute>
                {" "}
                <Ads />
              </AdminRoute>
            ),
          },
          {
            path: "courses",
            element: (
              <ProtectedRoute>
                {" "}
                <CourseTable />
              </ProtectedRoute>
            ),
          },
          {
            path: "courses/create",
            element: (
              <ProtectedRoute>
                {" "}
                <AddCourse />
              </ProtectedRoute>
            ),
          },
          {
            path: "courses/edit/:courseId",
            element: (
              <ProtectedRoute>
                {" "}
                <EditCourse />
              </ProtectedRoute>
            ),
          },
          {
            path: "courses/edit/:courseId/lecture",
            element: (
              <ProtectedRoute>
                {" "}
                <CreateLecture />
              </ProtectedRoute>
            ),
          },
          {
            path: "courses/edit/:courseId/lecture/:lectureId",
            element: (
              <ProtectedRoute>
                {" "}
                <EditLecture />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <main>
          <RouterProvider router={appRouter} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
