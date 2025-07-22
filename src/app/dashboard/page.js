import BikeGrid from '@/components/dashboard/BikeGrid';
import TodayOverview from '@/components/dashboard/TodayOverview';

export default function StaffDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Staff Dashboard
        </h1>
        
        <div className="space-y-8">
          {/* Today's Overview Section */}
          <TodayOverview />
          
          {/* Bike Inventory Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bike Inventory
            </h2>
            <BikeGrid />
          </div>
        </div>
      </div>
    </div>
  );
}