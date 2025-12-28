// src/Dashboard/JobSeeker/types.ts

// User Dashboard types
export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Shortlisted' | 'Rejected' | 'Hired';
}

export interface DashboardStats {
  totalApplications: number;
  shortlisted: number;
  bookmarkedJobs: number;
  profileCompletion: number;
}

export interface StatusBreakdown {
  applied: number;
  shortlisted: number;
  rejected: number;
  hired: number;
}


// Employer dashboard types

export interface EmployerDashboardStats {
  activeJobs: number
  totalApplicants: number;
  totalJobPosted: number;
  shortlisted: number
}

export interface EmployerJobsPosted {
  id: string
  position: string;
  location: string;
  postedDate: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Remote";
  isOpen: boolean;
  noOfApplicants: number
}

export interface PostJobFormInputType {
  
}