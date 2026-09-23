'use client';

import { useState, useEffect } from 'react';

export default function Community() {
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);
  const [requestedConsultations, setRequestedConsultations] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [pendingGroupJoin, setPendingGroupJoin] = useState<string | null>(null);

  useEffect(() => {
    const savedJoinedGroups = localStorage.getItem('communityJoinedGroups');
    const savedConsultations = localStorage.getItem('requestedConsultations');
    const savedUserName = localStorage.getItem('communityUserName');

    if (savedJoinedGroups) {
      setJoinedGroups(JSON.parse(savedJoinedGroups));
    }
    if (savedConsultations) {
      setRequestedConsultations(JSON.parse(savedConsultations));
    }
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  const handleJoinGroup = (groupName: string) => {
    if (!userName) {
      setPendingGroupJoin(groupName);
      setShowNameModal(true);
      return;
    }

    const updatedGroups = [...joinedGroups, groupName];
    setJoinedGroups(updatedGroups);
    localStorage.setItem('communityJoinedGroups', JSON.stringify(updatedGroups));
  };

  const handleLeaveGroup = (groupName: string) => {
    const updatedGroups = joinedGroups.filter(group => group !== groupName);
    setJoinedGroups(updatedGroups);
    localStorage.setItem('communityJoinedGroups', JSON.stringify(updatedGroups));
  };

  const handleRequestConsultation = (professionalName: string) => {
    const updatedConsultations = [...requestedConsultations, professionalName];
    setRequestedConsultations(updatedConsultations);
    localStorage.setItem('requestedConsultations', JSON.stringify(updatedConsultations));
  };

  const handleSaveName = () => {
    if (userName.trim()) {
      localStorage.setItem('communityUserName', userName.trim());
      setShowNameModal(false);
      if (pendingGroupJoin) {
        handleJoinGroup(pendingGroupJoin);
        setPendingGroupJoin(null);
      }
    }
  };
  const supportGroups = [
    {
      name: "Anxiety & Depression Support Circle",
      type: "Mental Health",
      location: "Online & Local Chapters",
      schedule: "Tuesdays 7:00 PM EST",
      description: "A safe space to share experiences and coping strategies for anxiety and depression.",
      contact: "anxietysupport@wellnesshub.com"
    },
    {
      name: "Mindful Living Group",
      type: "Mindfulness",
      location: "Hybrid (Online/In-Person)",
      schedule: "Saturdays 10:00 AM EST",
      description: "Practice mindfulness together through meditation, discussion, and mindful activities.",
      contact: "mindfulness@wellnesshub.com"
    },
    {
      name: "Fitness Accountability Partners",
      type: "Physical Health",
      location: "Online Community",
      schedule: "Daily Check-ins",
      description: "Stay motivated with workout buddies and celebrate fitness milestones together.",
      contact: "fitness@wellnesshub.com"
    },
    {
      name: "New Parent Wellness Circle",
      type: "Life Transitions",
      location: "Local Chapters Available",
      schedule: "Thursdays 2:00 PM EST",
      description: "Support for new parents navigating the challenges of parenthood while maintaining wellness.",
      contact: "parents@wellnesshub.com"
    }
  ];

  const professionals = [
    {
      name: "Dr. Sarah Chen",
      title: "Licensed Clinical Psychologist",
      specialty: "Anxiety, Depression, CBT",
      location: "New York, NY",
      accepting: true,
      telehealth: true
    },
    {
      name: "Mark Rodriguez, LCSW",
      title: "Licensed Clinical Social Worker",
      specialty: "Trauma, PTSD, Family Therapy",
      location: "Los Angeles, CA",
      accepting: true,
      telehealth: true
    },
    {
      name: "Dr. Emily Foster",
      title: "Registered Dietitian",
      specialty: "Nutrition Counseling, Eating Disorders",
      location: "Chicago, IL",
      accepting: false,
      telehealth: true
    },
    {
      name: "James Thompson, LPC",
      title: "Licensed Professional Counselor",
      specialty: "Addiction Recovery, Life Coaching",
      location: "Austin, TX",
      accepting: true,
      telehealth: false
    }
  ];

  const resources = [
    {
      category: "Crisis Support",
      items: [
        { name: "National Suicide Prevention Lifeline", contact: "988 (Call/Text)", available: "24/7" },
        { name: "Crisis Text Line", contact: "Text HOME to 741741", available: "24/7" },
        { name: "SAMHSA National Helpline", contact: "1-800-662-4357", available: "24/7" }
      ]
    },
    {
      category: "Mental Health Organizations",
      items: [
        { name: "National Alliance on Mental Illness (NAMI)", contact: "nami.org", available: "Resources & Support" },
        { name: "Mental Health America", contact: "mhanational.org", available: "Screening Tools" },
        { name: "Anxiety and Depression Association", contact: "adaa.org", available: "Educational Resources" }
      ]
    },
    {
      category: "Physical Health Resources",
      items: [
        { name: "CDC Physical Activity Guidelines", contact: "cdc.gov/physicalactivity", available: "Guidelines & Tips" },
        { name: "MyPlate Nutrition Guide", contact: "myplate.gov", available: "Nutrition Planning" },
        { name: "Sleep Foundation", contact: "sleepfoundation.org", available: "Sleep Health Info" }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 gradient-bg-soft">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text-vibrant">Community</span> & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with supportive communities, find professional help, and access trusted resources for your wellness journey.
          </p>
        </div>

        {/* Support Groups Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Support Groups</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {supportGroups.map((group, index) => (
              <div key={index} className="glass-effect gradient-bg-card rounded-2xl p-6 card-glow hover-lift">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-sm font-medium rounded-full">
                    {group.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {group.location}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {group.schedule}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {group.contact}
                  </div>
                </div>
                {joinedGroups.includes(group.name) ? (
                  <div className="mt-4 space-y-2">
                    <div className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 py-3 px-4 rounded-xl text-center">
                      <span className="text-emerald-700 font-semibold">✅ Joined!</span>
                    </div>
                    <button
                      onClick={() => handleLeaveGroup(group.name)}
                      className="w-full text-red-600 hover:text-red-800 text-sm underline"
                    >
                      Leave Group
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleJoinGroup(group.name)}
                    className="mt-4 w-full btn-vibrant py-3 px-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                  >
                    🤝 Join Group
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Professional Directory */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Professional Directory</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {professionals.map((professional, index) => (
              <div key={index} className="glass-effect gradient-bg-card rounded-2xl p-6 card-glow hover-lift">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{professional.name}</h3>
                    <p className="text-gray-600">{professional.title}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {professional.accepting ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Accepting Patients
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Not Accepting
                      </span>
                    )}
                    {professional.telehealth && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        Telehealth
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mb-2"><span className="font-medium">Specialty:</span> {professional.specialty}</p>
                <p className="text-gray-700 mb-4"><span className="font-medium">Location:</span> {professional.location}</p>
                {requestedConsultations.includes(professional.name) ? (
                  <div className="w-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 py-3 px-4 rounded-md text-center">
                    <span className="text-green-700 font-semibold">✅ Consultation Requested!</span>
                    <p className="text-green-600 text-sm mt-1">We'll contact you within 24-48 hours</p>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRequestConsultation(professional.name)}
                    className={`w-full py-3 px-4 rounded-md transition-all duration-200 ${
                      professional.accepting
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!professional.accepting}
                  >
                    {professional.accepting ? '📅 Request Consultation' : 'Currently Full'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Resource Directory */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Resource Directory</h2>
          </div>

          <div className="space-y-8">
            {resources.map((category, index) => (
              <div key={index} className="glass-effect gradient-bg-card rounded-2xl p-6 card-glow hover-lift">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.contact}</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-medium rounded-full">
                        {item.available}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My Groups Section */}
        {joinedGroups.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">My Groups</h2>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
              <p className="text-purple-800 mb-4">
                Welcome back, <strong>{userName}</strong>! You're part of these amazing communities:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {joinedGroups.map((groupName, index) => (
                  <div key={index} className="bg-white border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">{groupName}</h4>
                    <button
                      onClick={() => handleLeaveGroup(groupName)}
                      className="text-red-600 hover:text-red-800 text-sm underline"
                    >
                      Leave Group
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* My Consultation Requests */}
        {requestedConsultations.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">My Consultation Requests</h2>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6">
              <p className="text-cyan-800 mb-4">
                Your consultation requests are being processed. You'll receive contact within 24-48 hours:
              </p>
              <div className="space-y-3">
                {requestedConsultations.map((professionalName, index) => (
                  <div key={index} className="bg-white border border-cyan-200 rounded-lg p-4 flex items-center justify-between">
                    <span className="font-semibold text-cyan-900">{professionalName}</span>
                    <span className="text-cyan-600 text-sm">⏳ Pending</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="gradient-bg-vibrant rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-shadow">
              🤔 Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our team is here to help you find the right resources and support for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-vibrant px-8 py-4 rounded-xl font-semibold shadow-xl">
                💬 Contact Our Support Team
              </button>
              <button className="glass-effect text-gray-900 px-8 py-4 rounded-xl font-semibold hover-lift">
                📝 Request New Resource
              </button>
            </div>
          </div>
        </section>

        {/* Username Modal */}
        {showNameModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Join Community
              </h4>
              <p className="text-gray-600 mb-4">
                To join groups and participate in our community, please enter your name or username:
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name:
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name or username"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={30}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveName}
                  disabled={!userName.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  Join Community
                </button>
                <button
                  onClick={() => {
                    setShowNameModal(false);
                    setPendingGroupJoin(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}