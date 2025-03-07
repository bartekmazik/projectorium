import React from "react";
import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="absolute left-0 top-0 h-screen w-screen bg-white flex flex-row justify-center items-center">
      <LoaderCircle className="animate-spin text-primary dark:text-foreground" />
    </div>
  );
};

export default LoadingSpinner;
