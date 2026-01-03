import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPg/LandingPage";
import Login from "./Auth/Login/Login";
import Signup from "./Auth/Signup/Signup";
import AllJobs from "./BrowseJobs/AllJobs";
import EachJob from "./EachJobs/EachJob";

import JobSeekerLayout from "./Dashboard/JobSeeker/JobSeekerLayout";
import JobSeekerDashboard from "./Dashboard/JobSeeker/JobSeekerDashboard";
import Profile from "./Dashboard/JobSeeker/Profile";
import MyApplications from "./Applications/MyApplications";
import Settings from "./Dashboard/JobSeeker/Settings";

import EmployerDashboard from "./Dashboard/Employer/EmployerDashboard";
import EmployerLayout from "./Dashboard/Employer/Layout/EmployerLayout";
import EmployerJobsPage from "./Dashboard/Employer/EmployerJobsPage";
import PostNewJob from "./Dashboard/Employer/PostNewJob";
import EditProfile from "./Dashboard/Employer/EditProfile";
import Bookmarks from "./Bookmarks/Bookmarks";
import EmployerProfile from "./Dashboard/Employer/EmployerProfile";
import JobSeekerBio from "./Dashboard/JobSeeker/components/JobSeekerBio";

function App() {
  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/jobs", element: <AllJobs /> },
    { path: "/jobs/:id", element: <EachJob /> },


    // JOB SEEKER ROUTES (NESTED STRUCTURE)
    {
      path: "/jobseeker",
      element: <JobSeekerLayout />,
      children: [
        { index: true, element: <JobSeekerDashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "applications", element: <MyApplications /> },
        { path: "settings", element: <Settings /> },
        { path: "bookmarks", element: <Bookmarks/> },
        {path: "bio",element: <JobSeekerBio/>}
      ],
    },

    //EMPLOYER ROUTES
    {
      path: "/employer",
      element: <EmployerLayout />,
      children: [
        { index: true, element: <EmployerDashboard /> },
         { path: "profile", element: <EmployerProfile/> },
        { path: "dashboard", element: <EmployerDashboard /> },
        { path: "manage-jobs", element: <EmployerJobsPage /> },
        { path: "new-job", element: <PostNewJob /> },
        { path: "edit-profile", element: <EditProfile /> },
      ],
    },
  ];

  return (
    <Routes>
      {routes.map((route, idx) => (
        <Route key={idx} {...route}>
          {route.children?.map((child, cIdx) => (
            <Route key={cIdx} {...child} />
          ))}
        </Route>
      ))}
    </Routes>
  );
}

export default App;
