import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-black px-5 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-normal tracking-tight md:text-8xl">404</h1>
        <p className="mt-4 text-base text-white/65 md:text-lg">Oops! Page not found</p>
        <Link
          to="/"
          className="liquid-glass mt-8 inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-white/90 transition-colors hover:text-white"
        >
          <ArrowLeft className="relative z-10 h-4 w-4" aria-hidden="true" />
          <span className="relative z-10">Return to Home</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
