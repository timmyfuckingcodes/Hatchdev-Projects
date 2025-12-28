import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="bg-indigo-700 py-20 text-center text-white">
      <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
      <p className="mt-4 text-[18px] text-blue-100">
        Join thousands of job seekers and employers using HireLink
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/signup"
          className="rounded text-indigo-700 bg-white px-6 py-3 font-bold hover:bg-gray-100 transition-colors"
        >
          Create Free Account
        </Link>
        <Link
          to="/jobs"
          className="rounded border border-white px-6 py-3 font-bold hover:bg-indigo-600 transition-colors"
        >
          Browse Jobs
        </Link>
      </div>
    </section>
  );
}
