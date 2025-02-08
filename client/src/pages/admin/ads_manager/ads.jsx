import React from "react";

const Ads = () => {
  return (
    <div
      className="flex rounded-xl flex-col items-center justify-center min-h-screen 
                    bg-gradient-to-r from-blue-400 to-purple-500 
                    dark:from-gray-900 dark:to-gray-800 
                    text-white text-center p-6"
    >
      <h1 className="text-5xl font-extrabold mb-4 animate-pulse">
        🚀 Coming Soon...
      </h1>
      <p className="text-lg max-w-lg">
        We are building an{" "}
        <span className="font-semibold">amazing Ads Manager</span> for admins to
        create and manage ads for students and updates. Stay tuned for an
        exciting experience! 🔥
      </p>
    </div>
  );
};

export default Ads;
