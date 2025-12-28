import { useState, useEffect } from 'react';
import axios from 'axios';


export interface UserInfo {
    name: string;
    email: string;
}
export const useJobseekerProfile = (token: string) => {
 const [UserInfo, setUserInfo] = useState({ name: 'John Doe', email: 'john@example.com' });
useEffect(() => {
  const fetchJobs = async () => {
    try {
      const User = await axios.get('http://localhost:3000/api/dashboard/jobseekerinfo',     {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

      console.log('Dashboardstats response:', User.data); // You’ll see { message, jobs }
      
      setUserInfo(User.data); // ✅ get the array
      console.log('Status jobs:', User.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

fetchJobs();
  }, []);

  return { UserInfo };
};
