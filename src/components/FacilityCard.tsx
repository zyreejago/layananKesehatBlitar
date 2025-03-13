import React from 'react';
import { Phone, Navigation2 } from 'lucide-react';
import { HealthcareFacility } from '../types';

interface FacilityCardProps {
  facility: HealthcareFacility;
  distance?: number;
  isNearest?: boolean;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility, distance, isNearest }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative ${
      isNearest ? 'border-2 border-emerald-500' : ''
    }`}>
      {isNearest && (
        <div className="absolute -top-3 -right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          Paling Dekat
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-800">{facility.name}</h3>
      <p className="text-gray-600 mt-2">{facility.address}</p>
      
      <div className="mt-4 flex items-center gap-2">
        <Phone className="w-5 h-5 text-emerald-600" />
        <a 
          href={`tel:${facility.phone}`} 
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          {facility.phone}
        </a>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <Navigation2 className="w-5 h-5 text-blue-600" />
        <span className="text-gray-700">
          {distance ? `${distance.toFixed(1)} km` : 'Calculating...'}
        </span>
      </div>

      <div className="mt-4">
        <span className={`inline-block text-sm px-3 py-1 rounded-full ${
          facility.type === 'Rumah Sakit' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-emerald-100 text-emerald-800'
        }`}>
          {facility.type}
        </span>
      </div>
    </div>
  );
}