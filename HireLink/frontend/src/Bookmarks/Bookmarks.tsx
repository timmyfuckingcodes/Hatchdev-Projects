import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Briefcase, DollarSign } from "lucide-react";
import { JobCard } from "../BrowseJobs/components/JobCard"

import { Header } from "../Components/Header"
import { Footer } from "../Components/Footer"
import axios from "axios";


//data fetched using use effect



const Bookmarks = () => {
const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  


  useEffect(() => {

    const fetchBookmarkedJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/bookmarks", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });
      setBookmarkedJobs(response.data.bookmarks);
      console.log("Bookmarked jobs fetched:", response.data.bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarked jobs:", error);
    }
  };
    fetchBookmarkedJobs();
  }, []); 

  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      

      <main className="grow max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Saved Jobs
          </h1>
          <p className="text-slate-500 text-lg">Jobs you've bookmarked for later</p>
        </div>

        <div className="space-y-4">
          {/* 2. Use the component inside the map */}
          {bookmarkedJobs.map((job) => (
            <JobCard key={job.bookmark_Id} job={job} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
    )
}

export default Bookmarks;