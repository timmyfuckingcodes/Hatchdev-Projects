import React from "react";
import { useState } from "react";

const PostJobs: React.FC = () => {
// {
//   "title": "Frontend Developer",
//   "company_name": "TechNova Solutions",
//   "description": "We are looking for a skilled frontend developer to build responsive web applications using React and Tailwind CSS.",
//   "location": "Lagos, Nigeria",
//   "job_type": "Full-time",
//   "salary_min": 250000,
//   "salary_max": 450000,
//   "location_type": "Hybrid",
//   "requirements": 
//    " Strong knowledge of HTML, CSS, and JavaScript",
//   "isACTIVE": "Open"
// }
  // const [JobTitle, setJobTitle] = useState("");
  // const [JobDescription, setJobDescription] = useState("");
  // const [Requirements, setRequirements] = useState("");
  // const [Location, setLocation] = useState("");
  // const [JobTitle, setJobTitle] = useState("");
  // const  [JobTitle, setJobTitle] = useState("");
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="requirements"
            className="block text-gray-700 font-bold mb-2"
          >
            Requirements
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={5}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="salary"
            className="block text-gray-700 font-bold mb-2"
          >
            Salary
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJobs;
