import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/">
        <Button className="px-6 py-2">Go to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
