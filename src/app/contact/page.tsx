'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    supportType: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We\'ll get back to you within 24 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get Support & Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you on your wellness journey. Reach out for support, questions, or just to connect with our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="supportType" className="block text-sm font-medium text-gray-700 mb-2">
                    What can we help you with?
                  </label>
                  <select
                    id="supportType"
                    name="supportType"
                    value={formData.supportType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="general">General Question</option>
                    <option value="mental-health">Mental Health Support</option>
                    <option value="physical-health">Physical Health Guidance</option>
                    <option value="technical">Technical Support</option>
                    <option value="community">Community Resources</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Please provide details about your question or how we can help you..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>Privacy Note:</strong> Your information is kept confidential and secure. We never share personal details and only use your contact information to respond to your inquiry.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information & Resources */}
          <div className="space-y-8">
            {/* Emergency Resources */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">🚨 Emergency Resources</h3>
              <p className="text-red-800 text-sm mb-4">
                If you're experiencing a mental health crisis or thoughts of self-harm, please reach out immediately:
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-red-900">National Suicide Prevention Lifeline</p>
                  <p className="text-red-800">Call or Text: 988</p>
                </div>
                <div>
                  <p className="font-semibold text-red-900">Crisis Text Line</p>
                  <p className="text-red-800">Text HOME to 741741</p>
                </div>
                <div>
                  <p className="font-semibold text-red-900">Emergency Services</p>
                  <p className="text-red-800">Call: 911</p>
                </div>
              </div>
            </div>

            {/* Response Times */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📧 Response Times</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">General Questions</span>
                  <span className="font-medium text-teal-600">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Technical Support</span>
                  <span className="font-medium text-teal-600">48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Health Guidance</span>
                  <span className="font-medium text-teal-600">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Community Resources</span>
                  <span className="font-medium text-teal-600">12 hours</span>
                </div>
              </div>
            </div>

            {/* Other Ways to Connect */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🤝 Other Ways to Connect</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Community Forums</h4>
                  <p className="text-gray-600 text-sm">Join discussions with others on their wellness journey</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Local Support Groups</h4>
                  <p className="text-gray-600 text-sm">Find in-person meetings in your area</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Wellness Events</h4>
                  <p className="text-gray-600 text-sm">Attend workshops and group sessions</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Professional Referrals</h4>
                  <p className="text-gray-600 text-sm">We can help connect you with licensed professionals</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">❓ Frequently Asked</h3>
              <div className="space-y-3">
                <details className="cursor-pointer">
                  <summary className="font-medium text-gray-900">Is this service free?</summary>
                  <p className="text-gray-600 text-sm mt-2">Yes, all our basic wellness resources and support are completely free.</p>
                </details>
                <details className="cursor-pointer">
                  <summary className="font-medium text-gray-900">Are you licensed therapists?</summary>
                  <p className="text-gray-600 text-sm mt-2">We provide wellness guidance and can refer you to licensed professionals when needed.</p>
                </details>
                <details className="cursor-pointer">
                  <summary className="font-medium text-gray-900">How do I access community resources?</summary>
                  <p className="text-gray-600 text-sm mt-2">Visit our Community page or mention it in your message for personalized recommendations.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}