// src/Applications/MyApplications.tsx

import React, { useState,useEffect } from 'react';
import { ApplicationCard } from './components/ApplicationCard';
import { Header } from '../Components/Header';
import { Footer} from '../Components/Footer';
import axios from 'axios';
import type { Application } from '../Dashboard/types';

const MyApplications: React.FC = () => {
const token = localStorage.getItem('jwt')
const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/application/my-applications',     {
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
    console.log('Applications state after fetch:', applications);
  }, []);
 
  const user = { name: 'John Doe', email: 'john@example.com' }; // Replace with actual user data
  
  return (
    <div className="min-h-screen bg-gray-50 ">
     {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-2xl font-medium text-gray-900 mb-1">My Applications</h1>
                <p className="text-gray-500 text-sm">Track your job applications and their status</p>
            </div>

            {/* Applications Grid - Uses gap-4 for spacing between cards */}
            <div className="flex flex-col gap-4">
                {applications.map((application) => (
                    <ApplicationCard key={application.application_id} application={application} />
                ))}
            </div>
        </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export default MyApplications;