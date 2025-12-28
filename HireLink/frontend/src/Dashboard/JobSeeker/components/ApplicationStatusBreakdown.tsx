// src/Dashboard/JobSeeker/components/ApplicationStatusBreakdown.tsx

import React from 'react';
import type { StatusBreakdown } from '../../types';

interface ApplicationStatusBreakdownProps {
  statusData: StatusBreakdown;
}

export const ApplicationStatusBreakdown: React.FC<ApplicationStatusBreakdownProps> = ({ statusData }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-medium  font-semibold text-gray-700 mb-6">Application Status Breakdown</h2>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{statusData.applied}</p>
          <p className="text-sm text-gray-600 mt-1">Applied</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{statusData.shortlisted}</p>
          <p className="text-sm text-gray-600 mt-1">Shortlisted</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">{statusData.rejected}</p>
          <p className="text-sm text-gray-600 mt-1">Rejected</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{statusData.hired}</p>
          <p className="text-sm text-gray-600 mt-1">Hired</p>
        </div>
      </div>
    </div>
  );
};