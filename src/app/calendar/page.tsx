'use client';

import { useState } from 'react';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');

  const events = [
    {
      id: 1,
      title: "Morning Meditation Session",
      type: "Mindfulness",
      date: "2025-09-27",
      time: "8:00 AM - 8:30 AM",
      location: "Online",
      description: "Start your day with guided meditation and breathwork.",
      spots: 15,
      maxSpots: 20,
      instructor: "Sarah Chen"
    },
    {
      id: 2,
      title: "Anxiety Support Group",
      type: "Mental Health",
      date: "2025-09-27",
      time: "7:00 PM - 8:30 PM",
      location: "Community Center & Online",
      description: "Weekly support group for managing anxiety and stress.",
      spots: 8,
      maxSpots: 12,
      instructor: "Mark Rodriguez, LCSW"
    },
    {
      id: 3,
      title: "Beginner Yoga Flow",
      type: "Physical Health",
      date: "2025-09-28",
      time: "6:30 PM - 7:30 PM",
      location: "Wellness Studio",
      description: "Gentle yoga practice suitable for all levels.",
      spots: 5,
      maxSpots: 15,
      instructor: "Emily Foster"
    },
    {
      id: 4,
      title: "Nutrition Workshop: Meal Prep Basics",
      type: "Nutrition",
      date: "2025-09-29",
      time: "2:00 PM - 4:00 PM",
      location: "Online",
      description: "Learn practical meal preparation strategies for busy lifestyles.",
      spots: 12,
      maxSpots: 25,
      instructor: "James Thompson, RD"
    },
    {
      id: 5,
      title: "Weekend Hiking Group",
      type: "Physical Health",
      date: "2025-09-30",
      time: "9:00 AM - 12:00 PM",
      location: "Local Trail (varies)",
      description: "Join our community for a refreshing nature hike.",
      spots: 7,
      maxSpots: 15,
      instructor: "Community Led"
    }
  ];

  const eventTypes = [
    { name: "All Events", color: "gray" },
    { name: "Mindfulness", color: "purple" },
    { name: "Mental Health", color: "blue" },
    { name: "Physical Health", color: "green" },
    { name: "Nutrition", color: "orange" }
  ];

  const getEventColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Mindfulness": "bg-purple-100 text-purple-800 border-purple-200",
      "Mental Health": "bg-blue-100 text-blue-800 border-blue-200",
      "Physical Health": "bg-green-100 text-green-800 border-green-200",
      "Nutrition": "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Events & Workshops
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community events, workshops, and group sessions designed to support your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Events</h3>
              <div className="space-y-2">
                {eventTypes.map((type) => (
                  <label key={type.name} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={type.name === "All Events"}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-gray-700">{type.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold text-teal-600">5 Events</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Spots</span>
                  <span className="font-semibold text-green-600">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Registered</span>
                  <span className="font-semibold text-blue-600">2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getEventColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{event.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Instructor: {event.instructor}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {event.spots} of {event.maxSpots} spots available
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full"
                          style={{ width: `${((event.maxSpots - event.spots) / event.maxSpots) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${
                      event.spots > 5 ? 'text-green-600' : event.spots > 0 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {event.spots > 5 ? 'Good availability' : event.spots > 0 ? 'Limited spots' : 'Waitlist only'}
                    </span>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        Learn More
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                          event.spots > 0
                            ? 'bg-teal-600 text-white hover:bg-teal-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={event.spots === 0}
                      >
                        {event.spots > 0 ? 'Register' : 'Join Waitlist'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                Load More Events
              </button>
            </div>
          </div>
        </div>

        {/* Host Your Own Event */}
        <section className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Want to Host Your Own Event?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Share your expertise and help others on their wellness journey by hosting workshops, support groups, or activities.
          </p>
          <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
            Apply to Host
          </button>
        </section>
      </div>
    </div>
  );
}