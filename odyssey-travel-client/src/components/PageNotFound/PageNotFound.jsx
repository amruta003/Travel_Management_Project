import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

      <div className="text-center">

        {/* Icon */}
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-red-600 text-6xl mb-4"
        />

        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-gray-800 dark:text-gray-200">
          404
        </h1>

        {/* Message */}
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
          Oops! The page you're looking for doesn't exist.
        </p>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          It might have been moved or deleted.
        </p>

        {/* Go Home */}
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-md"
        >
          Go Back Home
        </a>
      </div>

    </div>
  );
}


export default PageNotFound
