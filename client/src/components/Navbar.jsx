import { School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/DarkMode";
import { MobileNavbar } from "./MobileNavbar";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/featrues/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [logoutUser, { isSuccess, data }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logout Successfully");
      navigate("/login");
    }
  }, [isSuccess]);
  // console.log(user);
  return (
    <div className=" h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* DeskTop Style */}
      <div className="md:flex mx-auto max-w-7xl hidden justify-between items-center gap-10 h-full  ">
        <div className="flex items-center gap-2">
          <Link to={"/"} className="flex items-center gap-2">
            <School size={"30"} />
            <h1 className=" hidden  sm:block font-extrabold text-2xl">
              E-Learning
            </h1>
          </Link>
        </div>
        {/*avatar and dark mode */}
        <div className=" flex items-center gap-8">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer border-[2px] dark:border-orange-500 border-black">
                    <AvatarImage
                      src={user.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                      className=" object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to={"my-learning"}>My learning</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={"my-profile"}>Edit profile</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                  {user.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className=" cursor-pointer"
                        onClick={() => navigate("/admin/courses")}
                      >
                        Dashboard
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/*Mobile devices */}
      <div className=" flex md:hidden items-center justify-between px-4 h-full">
        <h1 className=" font-extrabold text-2xl">E-learning</h1>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;
