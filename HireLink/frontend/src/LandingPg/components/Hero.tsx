import { Link } from "react-router-dom";
import { Briefcase, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Find Your Dream Job or Top Talent
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-gray-600 text-xl">
        A modern job board connecting employers with job seekers. Start your
        journey today.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/jobs"
          className="group rounded-md bg-indigo-700 px-6 py-3 text-white flex justify-center items-center font-bold gap-x-2 hover:bg-indigo-800 transition-colors"
        >
          <Briefcase className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          Find Jobs
        </Link>
        <Link
          to="/signup"
          className="group rounded-md border border-gray-300 px-6 py-3 flex justify-center items-center font-bold gap-x-2 hover:bg-gray-50 transition-colors"
        >
          <TrendingUp className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          Post a Job
        </Link>
      </div>
    </section>
  );
}
