import React from 'react';
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Bookmark } from "lucide-react";
import axios from "axios";

// Define the shape of the job object
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  status: string;
  is_bookmarked: boolean;
}

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  const deleteBookmark = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/bookmarks/${job.job.job_Id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Bookmark deleted successfully");
      // Optionally refresh the page or update parent component state
      window.location.reload(); // Simple refresh, or you could lift state up
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking the bookmark button
    if ((e.target as HTMLElement).closest('.bookmark-btn')) {
      e.stopPropagation();
      deleteBookmark();
      return;
    }
    navigate(`/jobs/${job.job.job_Id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
            {job.job.title}
          </h3>

          <p className="text-slate-500 font-medium mb-4">{job.job.company_name}</p>

          <div className="flex flex-wrap gap-4 text-slate-500 text-sm mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {job.job.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-400" />
              {job.job.type}
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-slate-400" />
              {job.job.salary_min} - {job.job.salary_max} USD
            </div>
          </div>

          <div className="flex gap-2 mt-2 md:mt-0">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold border border-slate-200">
              {job.job.location_type}
            </span>
            <span className="px-3 py-1 text-white bg-emerald-500 rounded-lg text-xs font-semibold border border-emerald-100">
              {job.job.isACTIVE}
            </span>
          </div>
        </div>

        <div className="bookmark-btn flex gap-2 px-2 py-2 mt-2 md:mt-0 hover:bg-teal-500 hover:text-white transition hover:rounded-sm cursor-pointer">
          <Bookmark className="w-4 h-4 text-indigo-500 fill-indigo-500" />
        </div>
      </div>
    </div>
  );
};

export default JobCard;