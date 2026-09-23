import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg-clean">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 subtle-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-custom mb-6 leading-tight">
              Your Journey to{" "}
              <span className="gradient-text-primary">Better Health</span>{" "}
              Starts Here
            </h1>
            <p className="text-xl text-secondary-custom mb-8 max-w-3xl mx-auto leading-relaxed">
              Welcome to WellnessHub, your comprehensive platform for physical and mental wellbeing.
              We're here to support, guide, and empower you on your path to a healthier, happier life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/physical-health"
                className="btn-primary px-8 py-4 rounded-lg font-semibold"
              >
                Explore Physical Health
              </Link>
              <Link
                href="/mental-health"
                className="btn-secondary px-8 py-4 rounded-lg font-semibold"
              >
                Mental Health Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-custom mb-4">
              Everything You Need for Wellness
            </h2>
            <p className="text-lg text-secondary-custom max-w-2xl mx-auto">
              Comprehensive tools and resources designed to support every aspect of your health journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-clean p-8 rounded-xl section-border">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-custom mb-3">Physical Health</h3>
              <p className="text-secondary-custom mb-4">
                Exercise routines, nutrition guidance, and fitness tracking to keep your body strong and healthy.
              </p>
              <Link href="/physical-health" className="text-primary-custom font-medium hover:underline inline-flex items-center">
                Learn more →
              </Link>
            </div>

            <div className="glass-effect p-8 rounded-2xl card-glow hover-lift gradient-bg-card">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mental Health</h3>
              <p className="text-gray-600 mb-4">
                Mindfulness exercises, stress management tools, and mental wellness resources for inner peace.
              </p>
              <Link href="/mental-health" className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center">
                Learn more →
              </Link>
            </div>

            <div className="glass-effect p-8 rounded-2xl card-glow hover-lift gradient-bg-card">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-600 mb-4">
                Connect with like-minded individuals and find local support groups and wellness communities.
              </p>
              <Link href="/community" className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center">
                Learn more →
              </Link>
            </div>

            <div className="glass-effect p-8 rounded-2xl card-glow hover-lift gradient-bg-card">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-violet-200 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-violet-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Journal</h3>
              <p className="text-gray-600 mb-4">
                Track your progress, reflect on your journey, and monitor your physical and mental wellness goals.
              </p>
              <Link href="/journal" className="text-violet-600 font-medium hover:text-violet-700 inline-flex items-center">
                Learn more →
              </Link>
            </div>

            <div className="glass-effect p-8 rounded-2xl card-glow hover-lift gradient-bg-card">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Health News & Blog</h3>
              <p className="text-gray-600 mb-4">
                Stay informed with the latest health tips, research, and wellness trends from trusted sources.
              </p>
              <Link href="/blog" className="text-orange-600 font-medium hover:text-orange-700 inline-flex items-center">
                Learn more →
              </Link>
            </div>

            <div className="glass-effect p-8 rounded-2xl card-glow hover-lift gradient-bg-card">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-rose-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 0h4m-4 0h-4m0 0V7a4 4 0 118 0v4m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Events & Workshops</h3>
              <p className="text-gray-600 mb-4">
                Join virtual and in-person wellness events, workshops, and group sessions in your area.
              </p>
              <Link href="/calendar" className="text-rose-600 font-medium hover:text-rose-700 inline-flex items-center">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of others who have transformed their lives through our comprehensive wellness platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-white text-primary-custom px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              View Pricing Plans
            </Link>
            <Link
              href="/journal"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
