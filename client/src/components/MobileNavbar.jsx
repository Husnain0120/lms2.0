import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";
import DarkMode from "@/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/featrues/api/authApi";
import { toast } from "sonner";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  const [logoutUser, { isSuccess, data }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logout Successfully");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-lg shadow-xl bg-gray-200 dark:bg-gray-950 hover:bg-gray-200 "
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader
          className={"flex flex-row items-center justify-between mt-2"}
        >
          <Link to="/">
            <SheetTitle>E-Learning</SheetTitle>
          </Link>

          <DarkMode />
        </SheetHeader>
        <DropdownMenuSeparator className="mr-2" />
        <nav className=" flex flex-col space-y-4 ">
          {user ? (
            <>
              <span>
                <Link to={"my-learning"}>My Learning</Link>
              </span>
              <span>
                <Link to={"my-profile"}>Edit Profile</Link>
              </span>
              <span onClick={logoutHandler} className=" cursor-pointer">
                Log out
              </span>
              {user.role === "instructor" && (
                <SheetFooter>
                  <SheetClose asChild>
                    <Button
                      type="submit"
                      onClick={() => navigate("/admin/courses")}
                    >
                      Dashboard
                    </Button>
                  </SheetClose>
                </SheetFooter>
              )}
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
