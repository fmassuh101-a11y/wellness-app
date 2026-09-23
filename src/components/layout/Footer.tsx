import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="font-semibold text-xl text-gray-900">WellnessHub</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Supporting your journey to better physical and mental health through resources,
              community, and personalized tools for wellness.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Health Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/physical-health" className="text-gray-600 hover:text-teal-600 text-sm">
                  Physical Health
                </Link>
              </li>
              <li>
                <Link href="/mental-health" className="text-gray-600 hover:text-teal-600 text-sm">
                  Mental Health
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-600 hover:text-teal-600 text-sm">
                  Community Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-teal-600 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-teal-600 text-sm">
                  Blog & News
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-gray-600 hover:text-teal-600 text-sm">
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © 2025 WellnessHub. All rights reserved. Built with care for your wellbeing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;