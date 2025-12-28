// src/hooks/useJobs.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Job {
  job_Id: number;
  employer_Id: number;
  title: string;
  company_name: string;
  description: string;
  location: string;
  job_type: string;
  salary_min: string;
  salary_max: string;
  location_type: string;
  requirements: string;
  isACTIVE: string;
  createdAt: string;
  updatedAt: string;
}

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/jobs');
        setJobs(response.data.jobs);
        console.log('Fetched jobs:', response.data.jobs);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
};