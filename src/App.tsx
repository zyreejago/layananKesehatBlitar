import React, { useState, useEffect } from 'react';
import { Stethoscope, Loader2 } from 'lucide-react';
import { FacilityCard } from './components/FacilityCard';
import { healthcareFacilities } from './data/facilities';
import { calculateDistance } from './utils/distance';
import { Coordinates } from './types';

function App() {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          setError('Mohon izinkan akses lokasi untuk melihat fasilitas kesehatan terdekat.');
          setLoading(false);
        }
      );
    } else {
      setError('Browser Anda tidak mendukung geolokasi.');
      setLoading(false);
    }
  }, []);

  const sortedFacilities = userLocation
    ? [...healthcareFacilities].sort((a, b) => {
        const distanceA = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          a.latitude,
          a.longitude
        );
        const distanceB = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          b.latitude,
          b.longitude
        );
        return distanceA - distanceB;
      })
    : healthcareFacilities;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-emerald-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-8 h-8" />
            <h1 className="text-2xl font-bold">SehatDekat</h1>
          </div>
          <p className="mt-2 text-emerald-100">
          Temukan fasilitas kesehatan terdekat di Kabupaten Blitar dengan mudah
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedFacilities.map((facility, index) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                distance={
                  userLocation
                    ? calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        facility.latitude,
                        facility.longitude
                      )
                    : undefined
                }
                isNearest={index === 0}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;