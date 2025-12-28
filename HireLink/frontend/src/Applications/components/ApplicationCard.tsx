// src/Applications/components/ApplicationCard.tsx

import React from 'react';
import type { Application } from '../../Dashboard/types';

interface ApplicationCardProps {
  application: Application;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'Applied':
        return 'bg-gray-200 text-gray-700 border-gray-200';
      case 'Shortlisted':
        return 'bg-yellow-700 text-white border-yellow-200';
      case 'Rejected':
        return 'bg-red-200 text-red-800 border-red-200';
      case 'Hired':
        return 'bg-green-200 text-green-800 border-green-200';
      default:
        return 'bg-gray-200 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-indigo-900">
            {application.job.title}
          </h3>
          <p className="text-sm text-gray-600">{application.job.company_name}</p>
        </div>
        <span className={`px-3 py-1 rounded-md text-xs font-semibold border ${getStatusColor(application.status)}`}>
          {application.status}
        </span>
      </div>
      
      <div className="text-sm text-gray-500">
        Applied on {application.job.createdAt}
      </div>
    </div>
  );
};