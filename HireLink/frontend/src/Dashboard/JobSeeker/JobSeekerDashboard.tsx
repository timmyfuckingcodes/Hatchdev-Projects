// src/Dashboard/JobSeeker/JobSeekerDashboard.tsx

import React, { useState, useEffect } from 'react';
import { FileText, TrendingUp, Bookmark, Briefcase, AppWindow } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { ApplicationStatusBreakdown } from './components/ApplicationStatusBreakdown';
import { RecentApplications } from './components/RecentApplications';
import { Header } from '../../Components/Header';
import { Footer} from '../../Components/Footer';
import type { DashboardStats, StatusBreakdown,Application } from '../types';
import axios from 'axios';
import  { useJobseekerProfile  } from '../../hooks/Use-jobseekerProfile';

const JobSeekerDashboard: React.FC = () => {
const token = localStorage.getItem('jwt')
  // Mock data - replace with actual API calls
  const { UserInfo } = useJobseekerProfile(token || '');
  const [stats] = useState<DashboardStats>({
    totalApplications: 3,
    shortlisted: 0,
    bookmarkedJobs: 2,
    profileCompletion: 100,
  });

  const [statusData] = useState<StatusBreakdown>({
    applied: 2,
    shortlisted: 0,
    rejected: 0,
    hired: 0,
  });
//Handles RECENT aPPLICATION
  const [Applications, setApplications] = useState([]);
 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard/recentapplications',     {
          headers: {
           Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json'
          },
        }
      );

        console.log('Raw response:', response.data); // You’ll see { message, jobs }
        
        setApplications(response.data.applications); // ✅ get the array
        console.log('Fetched jobs:', response.data.applications);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };
  
    fetchJobs();
    console.log('Applications state after fetch:', Applications);
  }, []);
 //GET DASHBOARD STATS
  // const [recentApplications] = useState<Application[]>([
  //   {
  //     id: '1',
  //     jobTitle: 'Senior Frontend Developer',
  //     company: 'TechCorp Inc',
  //     appliedDate: '12/11/2024',
  //     status: 'Shortlisted',
  //   },
  //   {
  //     id: '2',
  //     jobTitle: 'Full Stack Engineer',
  //     company: 'StartupXYZ',
  //     appliedDate: '12/9/2024',
  //     status: 'Applied',
  //   },
  //   {
  //     id: '3',
  //     jobTitle: 'DevOps Engineer',
  //     company: 'TechCorp Inc',
  //     appliedDate: '12/12/2024',
  //     status: 'Applied',
  //   },
  // ]);

  //GET DASHBOARD STATS
  const [DashboardStats, setDashboardStats] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard/jobseeker',{
          headers: {
           Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json'
          }
        }
      );

        console.log('Dashboardstats response:', response.data); // You’ll see { message, jobs }
        
        setDashboardStats(response.data.stats); // ✅ get the array
        console.log('Fetched jobs:', response.data.stats);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };
  
    fetchJobs();
    console.log('Applications state after fetch:', Applications);
  }, []);


//Get status status
const [StatusStats, setStatusStats] = useState([]);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/dashboard/applicationstatus',     {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

      console.log('Dashboardstats response:', response.data); // You’ll see { message, jobs }
      
      setStatusStats(response.data.statusBreakdown); // ✅ get the array
      console.log('Status jobs:', response.data.statusBreakdown);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  fetchJobs();
  console.log('Applications state after fetch:', Applications);
}, []);



const user = { name: UserInfo.name, email: UserInfo.email }; // Replace with actual user data


  return (
    <div className="min-h-screen bg-gray-50">
     {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mt-5 mb-8">
          <h1 className="text-2xl font-medium text-gray-800 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Here's your job search overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Applications"
            value={DashboardStats.totalApplications}
            icon={<FileText className="w-5 h-5" />}
          />
          <StatCard
            title="Shortlisted"
            value={stats.shortlisted}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            title="Bookmarked Jobs"
            value={DashboardStats.totalBookmarks}
            icon={<Bookmark className="w-5 h-5" />}
          />
          <StatCard
            title="Profile Completion"
            value={`${stats.profileCompletion}%`}
            icon={<Briefcase className="w-5 h-5" />}
          />
        </div>

        {/* Status Breakdown */}
        <div className="mb-8">
          <ApplicationStatusBreakdown statusData={StatusStats} />
        </div>

        {/* Recent Applications */}
        <RecentApplications applications={Applications} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export default JobSeekerDashboard;