import HumanAnatomy from '@/components/anatomy/HumanAnatomy';
import Chatbot from '@/components/chat/Chatbot';

export default function PhysicalHealth() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text-vibrant">Physical Health</span> & Fitness
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strengthen your body, boost your energy, and build healthy habits that last a lifetime.
          </p>
        </div>

        {/* Interactive Anatomy Section */}
        <section className="mb-20">
          <div className="gradient-bg-soft rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-60">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-red-200 to-pink-300 rounded-full filter blur-xl animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-200 to-cyan-300 rounded-full filter blur-xl animate-pulse"></div>
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full filter blur-xl animate-pulse"></div>
            </div>

            <div className="relative z-10">
              <HumanAnatomy />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass-effect p-8 rounded-2xl card-glow hover-lift gradient-bg-card">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Exercise Routines</h3>
            <p className="text-gray-600 mb-6">
              Customized workout plans for all fitness levels, from beginner-friendly routines to advanced training programs.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mr-3"></span>
                💪 Strength Training Basics
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mr-3"></span>
                🏃 Cardio Workouts
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mr-3"></span>
                🤸 Flexibility & Mobility
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mr-3"></span>
                🏠 Home Workouts
              </li>
            </ul>
          </div>

          <div className="glass-effect p-8 rounded-2xl card-glow hover-lift gradient-bg-card">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Nutrition Guidance</h3>
            <p className="text-gray-600 mb-6">
              Evidence-based nutrition advice to fuel your body properly and support your fitness goals.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></span>
                🥗 Balanced Meal Planning
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></span>
                💧 Hydration Tips
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></span>
                ⚡ Pre & Post Workout Nutrition
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></span>
                🍽️ Healthy Recipe Ideas
              </li>
            </ul>
          </div>

          <div className="glass-effect p-8 rounded-2xl card-glow hover-lift gradient-bg-card">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
            <p className="text-gray-600 mb-6">
              Monitor your fitness journey with tools and metrics that help you stay motivated and on track.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></span>
                🎯 Fitness Goal Setting
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></span>
                📝 Workout Logging
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></span>
                📸 Progress Photos
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></span>
                📏 Body Measurements
              </li>
            </ul>
          </div>
        </div>

        <section className="gradient-bg-vibrant rounded-3xl p-8 lg:p-12 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 text-shadow">
              🚀 Quick Start: 7-Day Beginner Workout Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">📅 Week Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                    <span className="font-medium">🏋️ Monday</span>
                    <span className="text-red-600 font-semibold">Upper Body Strength</span>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                    <span className="font-medium">🏃 Tuesday</span>
                    <span className="text-blue-600 font-semibold">20min Cardio Walk</span>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                    <span className="font-medium">🦵 Wednesday</span>
                    <span className="text-green-600 font-semibold">Lower Body Strength</span>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                    <span className="font-medium">🧘 Thursday</span>
                    <span className="text-purple-600 font-semibold">Rest & Stretch</span>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                    <span className="font-medium">🔥 Friday</span>
                    <span className="text-orange-600 font-semibold">Full Body Circuit</span>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                    <span className="font-medium">🌟 Weekend</span>
                    <span className="text-pink-600 font-semibold">Active Recovery</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">✨ Key Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Builds Foundation</span>
                      <p className="text-gray-600 text-sm">Establishes proper form and exercise habits</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Manageable Commitment</span>
                      <p className="text-gray-600 text-sm">Short, effective workouts that fit your schedule</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Immediate Results</span>
                      <p className="text-gray-600 text-sm">Notice improved energy and mood within days</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center gradient-bg-soft rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full filter blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-cyan-300 to-teal-400 rounded-full filter blur-xl animate-pulse"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold gradient-text-vibrant mb-4">🎯 Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Take the first step towards a healthier, stronger you today.
            </p>
            <button className="btn-vibrant px-10 py-4 rounded-xl font-semibold text-lg shadow-xl">
              🚀 Start Your Fitness Journey
            </button>
          </div>
        </section>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}