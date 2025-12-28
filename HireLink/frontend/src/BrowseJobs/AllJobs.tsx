// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, MapPin, Briefcase, DollarSign } from "lucide-react";
// import { JobCard } from "./components/JobCard"; // 1. Import the component
// import { Header } from "../Components/Header";
// import { Footer } from "../Components/Footer";

// const jobs = [
//   {
//     id: 1,
//     title: "Senior Frontend Developer",
//     company: "TechCorp Inc",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     salary: "$120,000 - $160,000",
//     posted: "12/10/2024",
//     status: "Open",
//     is_bookmarked: true,
//   },
//   {
//     id: 2,
//     title: "Product Designer",
//     company: "DesignHub",
//     location: "Remote",
//     type: "Remote",
//     salary: "$90,000 - $130,000",
//     posted: "12/12/2024",
//     status: "Open",
//     is_bookmarked: false,
//   },
//   {
//     id: 3,
//     title: "Full Stack Engineer",
//     company: "StartupXYZ",
//     location: "New York, NY",
//     type: "Full-time",
//     salary: "$100,000 - $140,000",
//     posted: "12/8/2024",
//     status: "Open",
//     is_bookmarked: true,
//   },
//   {
//     id: 4,
//     title: "Marketing Manager",
//     company: "GrowthCo",
//     location: "Austin, TX",
//     type: "Full-time",
//     salary: "$80,000 - $110,000",
//     posted: "12/14/2024",
//     status: "Open",
//     is_bookmarked: false,
//   },
//   {
//     id: 5,
//     title: "DevOps Engineer",
//     company: "TechCorp Inc",
//     location: "Remote",
//     type: "Remote",
//     salary: "$110,000 - $150,000",
//     posted: "12/11/2024",
//     status: "Open",
//     is_bookmarked: true,
//   },
//   {
//     id: 6,
//     title: "Data Analyst",
//     company: "DataDriven Co",
//     location: "Boston, MA",
//     type: "Full-time",
//     salary: "$70,000 - $95,000",
//     posted: "12/9/2024",
//     status: "Open",
//     is_bookmarked: true,
//   },
// ];

// const AllJobs = () => {
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [locationFilter, setLocationFilter] = useState("All Locations");
//   const [typeFilter, setTypeFilter] = useState("All Types");

//   const filteredJobs = jobs.filter((job) => {
//     const matchesSearch =
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.company.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesLocation =
//       locationFilter === "All Locations" || job.location.includes(locationFilter);
//     const matchesType = typeFilter === "All Types" || job.type === typeFilter;

//     return matchesSearch && matchesLocation && matchesType;
//   });

//   const uniqueLocations = ["All Locations", ...new Set(jobs.map((job) => job.location))];
//   const uniqueTypes = ["All Types", ...new Set(jobs.map((job) => job.type))];

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Header />

//       <main className="grow max-w-7xl mx-auto px-6 py-12 w-full">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Jobs</h1>
//           <p className="text-slate-500 text-lg">Find your next opportunity</p>
//         </div>

//         {/* Filter Section (Search inputs etc) - Keep exactly as is */}
//         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search jobs or companies..."
//                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 placeholder-slate-400"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="relative md:w-48">
//               <select
//                 className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
//                 value={locationFilter}
//                 onChange={(e) => setLocationFilter(e.target.value)}
//               >
//                 {uniqueLocations.map((loc) => (
//                   <option key={loc} value={loc}>
//                     {loc}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="relative md:w-48">
//               <select
//                 className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
//                 value={typeFilter}
//                 onChange={(e) => setTypeFilter(e.target.value)}
//               >
//                 {uniqueTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         <p className="text-slate-500 mb-6 font-medium">
//           {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
//         </p>

//         <div className="space-y-4">
//           {/* 2. Use the component inside the map */}
//           {filteredJobs.map((job) => (
//             <JobCard key={job.id} job={job} />
//           ))}

//           {/* Empty state */}
//           {filteredJobs.length === 0 && (
//             <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
//               <p className="text-slate-500 text-lg">
//                 No jobs found matching your criteria.
//               </p>
//               <button
//                 onClick={() => {
//                   setSearchTerm("");
//                   setLocationFilter("All Locations");
//                   setTypeFilter("All Types");
//                 }}
//                 className="mt-4 text-indigo-600 font-medium hover:underline"
//               >
//                 Clear filters
//               </button>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AllJobs;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Briefcase, DollarSign } from "lucide-react";
//import axios from "axios";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { useJobs } from "../hooks/Use-jobs";

// interface Job {
//   job_Id: number;
//   employer_Id: number;
//   title: string;
//   company_name: string;
//   description: string;
//   location: string;
//   job_type: string;
//   salary_min: string;
//   salary_max: string;
//   location_type: string;
//   requirements: string;
//   isACTIVE: string;
//   createdAt: string;
//   updatedAt: string;
// }

const AllJobs = () => {
  const { jobs, loading, error } = useJobs();

//const [jobs, setJobs] = useState<Job[]>([]);

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/api/jobs');
  //       console.log('Raw response:', response.data); // You’ll see { message, jobs }
        
  //       setJobs(response.data.jobs); // ✅ get the array
  //       console.log('Fetched jobs:', response.data.jobs);
  //     } catch (err) {
  //       console.error('Error fetching jobs:', err);
  //     }
  //   };
  
  //   fetchJobs();
  // }, []);
  

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "All Locations" ||
      job.location.includes(locationFilter);

    const matchesType = typeFilter === "All Types" || job.job_type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });
  const uniqueLocations = [
    "All Locations",
    ...new Set(jobs.map((job) => job.location)),
  ];
  const uniqueTypes = ["All Types", ...new Set(jobs.map((job) => job.job_type))];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="grow max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Browse Jobs
          </h1>
          <p className="text-slate-500 text-lg">Find your next opportunity</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative md:w-48">
              <select
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative md:w-48">
              <select
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <p className="text-slate-500 mb-6 font-medium">
          {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}{" "}
          found
        </p>
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.job_Id}
              onClick={() => navigate(`/jobs/${job.job_Id}`)}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-slate-500 font-medium mb-4">
                    {job.company_name}
                  </p>

                  <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      {job.job_type}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      {job.salary_min} - {job.salary_max}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold border border-slate-200">
                    {job.location_type}
                  </span>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold border border-emerald-100">
                    {job.isACTIVE}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-slate-500 text-lg">
                No jobs found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("All Locations");
                  setTypeFilter("All Types");
                }}
                className="mt-4 text-indigo-600 font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllJobs;