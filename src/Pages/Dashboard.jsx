import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4">
          <div className="font-bold text-xl mb-8 text-indigo-700">SchoolHub</div>
          <nav className="flex flex-col gap-2">
            <a href="#" className="bg-indigo-100 text-indigo-700 rounded-lg px-4 py-2 font-semibold">Dashboard</a>
            <a href="#" className="text-gray-600 hover:bg-indigo-50 rounded-lg px-4 py-2">Teachers</a>
            <a href="#" className="text-gray-600 hover:bg-indigo-50 rounded-lg px-4 py-2">Students</a>
            <a href="#" className="text-gray-600 hover:bg-indigo-50 rounded-lg px-4 py-2">Attendance</a>
            <a href="#" className="text-gray-600 hover:bg-indigo-50 rounded-lg px-4 py-2">Finance</a>
            <a href="#" className="text-gray-600 hover:bg-indigo-50 rounded-lg px-4 py-2">Notice</a>
            <a href="#" className="text-gray-600 hover:bg-indigo-50 rounded-lg px-4 py-2">Calendar</a>
            <a href="#" className="text-gray-600 hover:bg-indigo-50 rounded-lg px-4 py-2">Library</a>
            <a href="#" className="text-gray-600 hover:bg-indigo-50 rounded-lg px-4 py-2">Message</a>
          </nav>
          <div className="mt-auto flex flex-col gap-2">
            <a href="#" className="text-gray-500 hover:text-indigo-700">Profile</a>
            <a href="#" className="text-gray-500 hover:text-indigo-700">Setting</a>
            <a href="#" className="text-gray-500 hover:text-red-500">Log out</a>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Top Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-indigo-100 rounded-xl p-6 flex flex-col items-start shadow">
              <span className="text-xs text-green-600 font-bold mb-1">↑ 15%</span>
              <span className="text-2xl font-bold text-indigo-700">124,684</span>
              <span className="text-gray-500">Students</span>
            </div>
            <div className="bg-yellow-100 rounded-xl p-6 flex flex-col items-start shadow">
              <span className="text-xs text-red-600 font-bold mb-1">↓ 3%</span>
              <span className="text-2xl font-bold text-yellow-700">12,379</span>
              <span className="text-gray-500">Teachers</span>
            </div>
            <div className="bg-purple-100 rounded-xl p-6 flex flex-col items-start shadow">
              <span className="text-xs text-red-600 font-bold mb-1">↓ 3%</span>
              <span className="text-2xl font-bold text-purple-700">29,300</span>
              <span className="text-gray-500">Staffs</span>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 flex flex-col items-start shadow">
              <span className="text-xs text-green-600 font-bold mb-1">↑ 5%</span>
              <span className="text-2xl font-bold text-yellow-600">95,800</span>
              <span className="text-gray-500">Awards</span>
            </div>
          </div>
          {/* Middle Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Students Pie */}
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <div className="w-32 h-32 mb-4">
                {/* Placeholder for Pie Chart */}
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-200 to-yellow-200 flex items-center justify-center">
                  <span className="text-4xl">👫</span>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="text-center">
                  <div className="font-bold text-lg">45,414</div>
                  <div className="text-gray-400 text-xs">Boys (47%)</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">40,270</div>
                  <div className="text-gray-400 text-xs">Girls (53%)</div>
                </div>
              </div>
            </div>
            {/* Attendance Bar Chart */}
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="font-semibold mb-2">Attendance</div>
              {/* Placeholder for Bar Chart */}
              <div className="h-32 flex items-end gap-2">
                {/* Simulated bars */}
                {[60, 80, 95, 70, 85].map((val, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-indigo-400 w-6 rounded-t-lg" style={{ height: `${val}%`, minHeight: '20px' }}></div>
                    <span className="text-xs mt-1">{['Mon','Tue','Wed','Thu','Fri'][i]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-green-600 font-bold">95% Present</div>
            </div>
            {/* Calendar/Agenda */}
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="font-semibold mb-2">Agenda</div>
              <div className="mb-2 text-gray-500">September 2030</div>
              <ul className="space-y-2">
                <li className="bg-indigo-50 rounded p-2 text-xs">08:00 am - Homeroom & Announcement</li>
                <li className="bg-yellow-50 rounded p-2 text-xs">10:00 am - Math Review & Practice</li>
                <li className="bg-blue-50 rounded p-2 text-xs">10:30 am - Science Experiment & Discussion</li>
              </ul>
            </div>
          </div>
          {/* Earnings and Messages */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Earnings Line Chart */}
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="font-semibold mb-2">Earnings</div>
              {/* Placeholder for Line Chart */}
              <div className="h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded mb-2 flex items-center justify-center">
                <span className="text-2xl text-indigo-600 font-bold">$837,000</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Income</span>
                <span>Expense</span>
              </div>
            </div>
            {/* Olympic Students */}
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-indigo-700 mb-2">24,680</div>
              <div className="text-gray-500">Olympic Students</div>
              <div className="text-green-600 text-xs mt-1">+15%</div>
            </div>
            {/* Competition */}
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">3,000</div>
              <div className="text-gray-500">Competition</div>
              <div className="text-red-600 text-xs mt-1">-8%</div>
            </div>
          </div>
          {/* Messages */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="font-semibold mb-2">Messages</div>
              <ul className="divide-y divide-gray-100">
                <li className="py-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">👩‍⚕️</span>
                  <div>
                    <div className="font-bold text-sm">Dr. Lila Ramirez</div>
                    <div className="text-xs text-gray-400">Please ensure the monthly attendance report is accurate before the April 30th deadline.</div>
                  </div>
                </li>
                <li className="py-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">👩‍🏫</span>
                  <div>
                    <div className="font-bold text-sm">Ms. Heather Morris</div>
                    <div className="text-xs text-gray-400">Don't forget the staff training on digital tools scheduled for May 5th at 3 PM in the...</div>
                  </div>
                </li>
                <li className="py-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">👨‍💼</span>
                  <div>
                    <div className="font-bold text-sm">Mr. Carl Jenkins</div>
                    <div className="text-xs text-gray-400">Budget review meeting for the next fiscal year is on April 28th at 1:00 PM.</div>
                  </div>
                </li>
              </ul>
            </div>
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="font-semibold mb-2">Recent Activity</div>
              <ul className="divide-y divide-gray-100">
                <li className="py-2 text-sm">Student Activity: 2,000+ students participated in the science fair.</li>
                <li className="py-2 text-sm">Notice Board: New library books have arrived.</li>
                <li className="py-2 text-sm">Competition: Inter-school math competition next week.</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 