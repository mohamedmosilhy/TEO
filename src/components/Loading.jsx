import React from "react";

const LoadingSpinner = ({ size = "default", className = "" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-main/30 border-t-main rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export const PageLoading = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <LoadingSpinner size="large" />
  </div>
);

export const InlineLoading = ({ text = "Loading..." }) => (
  <div className="flex items-center gap-3 text-main">
    <LoadingSpinner size="small" />
    <span className="text-sm">{text}</span>
  </div>
);

export default LoadingSpinner;
