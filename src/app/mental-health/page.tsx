'use client';

// Esta pantalla no se genera al construir el sitio.
//
// Crea el cliente de Supabase al cargarse, y durante la construcción no hay
// sesión ni navegador: el prerenderizado fallaba y tumbaba la publicación
// entera. Al marcarla como dinámica se arma cuando alguien la visita, que es
// cuando sí existe todo lo que necesita.
export const dynamic = 'force-dynamic';


import MoodTracker from '@/components/mental-health/MoodTracker';
import CopingSkills from '@/components/mental-health/CopingSkills';
import CalmDownTimer from '@/components/mental-health/CalmDownTimer';
import SupportGroups from '@/components/mental-health/SupportGroups';
import Chatbot from '@/components/chat/Chatbot';

export default function MentalHealth() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 gradient-bg-soft">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text-vibrant">Mental Health</span> & Wellbeing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nurture your mind, manage stress, and cultivate inner peace with evidence-based tools and practices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="glass-effect gradient-bg-card rounded-2xl p-8 card-glow hover-lift border border-purple-200/50">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mindfulness & Meditation</h3>
            <p className="text-gray-600 mb-6">
              Develop presence and awareness through guided meditations and mindfulness exercises.
            </p>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">5-Minute Breathing Exercise</h4>
                <p className="text-gray-600 text-sm">Quick relief for stress and anxiety</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Body Scan Meditation</h4>
                <p className="text-gray-600 text-sm">15-minute guided relaxation practice</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Mindful Walking</h4>
                <p className="text-gray-600 text-sm">Connect with nature and present moment</p>
              </div>
            </div>
          </div>

          <div className="glass-effect gradient-bg-card rounded-2xl p-8 card-glow hover-lift border border-green-200/50">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stress Management</h3>
            <p className="text-gray-600 mb-6">
              Learn practical techniques to identify, understand, and manage stress in your daily life.
            </p>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Progressive Muscle Relaxation</h4>
                <p className="text-gray-600 text-sm">Release physical tension and stress</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Cognitive Restructuring</h4>
                <p className="text-gray-600 text-sm">Reframe negative thought patterns</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Time Management Tips</h4>
                <p className="text-gray-600 text-sm">Reduce overwhelm with better planning</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tools Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text-primary mb-4">
              🛠️ Interactive Mental Health Tools
            </h2>
            <p className="text-lg text-secondary-custom max-w-2xl mx-auto">
              Engage with these evidence-based tools designed to help you track, understand, and improve your mental wellbeing.
            </p>
          </div>

          {/* Mood Tracker */}
          <div className="mb-16">
            <MoodTracker />
          </div>

          {/* Coping Skills Library */}
          <div className="mb-16">
            <CopingSkills />
          </div>

          {/* Calm Down Timer */}
          <div className="mb-16">
            <CalmDownTimer />
          </div>

          {/* Support Groups */}
          <div className="mb-16">
            <SupportGroups />
          </div>
        </section>

        <section className="gradient-bg-soft rounded-3xl p-8 lg:p-12 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full filter blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-cyan-300 to-teal-400 rounded-full filter blur-xl animate-pulse"></div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold gradient-text-vibrant mb-8 text-center">
              ✨ Daily Mental Health Toolkit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center glass-effect p-6 rounded-2xl hover-lift border border-yellow-200/50">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🌅 Morning Intention</h3>
                <p className="text-gray-600">
                  Start your day with purpose by setting a positive intention and practicing gratitude.
                </p>
              </div>
              <div className="text-center glass-effect p-6 rounded-2xl hover-lift border border-blue-200/50">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">⚡ Midday Reset</h3>
                <p className="text-gray-600">
                  Take a mindful break to check in with yourself and reset your energy for the afternoon.
                </p>
              </div>
              <div className="text-center glass-effect p-6 rounded-2xl hover-lift border border-indigo-200/50">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🌙 Evening Reflection</h3>
                <p className="text-gray-600">
                  Wind down with journaling, reflection, and relaxation techniques for better sleep.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Recursos de Crisis - Chile</h2>
            <p className="text-gray-600 mb-8">
              Si estás experimentando una crisis de salud mental o tienes pensamientos de autolesión, por favor busca ayuda inmediata.
            </p>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-300 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-red-900 mb-2">🆘 Salud Responde (MINSAL)</h3>
                <p className="text-red-800 font-medium">600 360 7777</p>
                <p className="text-red-700 text-sm">Atención 24/7 para urgencias de salud mental</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-300 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-blue-900 mb-2">📱 Chat Hablemos de Todo</h3>
                <p className="text-blue-800 font-medium">
                  <a href="https://www.hablemosDeTodo.gob.cl" className="hover:underline">www.hablemosDeTodo.gob.cl</a>
                </p>
                <p className="text-blue-700 text-sm">Chat online gratuito Lunes a Viernes 9:00 a 18:00 hrs</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-green-900 mb-2">🧠 Fundación Todo Mejora</h3>
                <p className="text-green-800 font-medium">
                  <a href="https://todomejora.org" className="hover:underline">todomejora.org</a>
                </p>
                <p className="text-green-700 text-sm">Apoyo especializado para jóvenes LGBTI+ en crisis</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-300 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-purple-900 mb-2">📞 Línea de Emergencia</h3>
                <p className="text-purple-800 font-medium">131 (Ambulancia / SAMU)</p>
                <p className="text-purple-700 text-sm">Emergencias médicas y psiquiátricas 24/7</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-300 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-orange-900 mb-2">💙 Centro de Salud Mental Comunitaria</h3>
                <p className="text-orange-800 font-medium">Busca el COSAM más cercano</p>
                <p className="text-orange-700 text-sm">Atención especializada gratuita en salud mental</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Self-Care Checklist</h2>
            <p className="text-gray-600 mb-8">
              Small daily actions that can make a big difference in your mental wellbeing.
            </p>
            <div className="space-y-3">
              {[
                "Practice deep breathing for 5 minutes",
                "Write down 3 things you're grateful for",
                "Get 10 minutes of sunlight or fresh air",
                "Connect with a friend or loved one",
                "Do something creative or expressive",
                "Engage in gentle physical movement",
                "Limit social media and news consumption",
                "Maintain a consistent sleep schedule",
                "Eat nourishing, balanced meals",
                "Practice saying 'no' to protect your energy"
              ].map((item, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="gradient-bg-vibrant rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-shadow">
              💜 You're Not Alone
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Mental health is just as important as physical health. Taking care of your mind is a sign of strength, not weakness.
            </p>
            <button className="btn-vibrant px-10 py-4 rounded-xl font-semibold text-lg shadow-xl">
              🚀 Start Your Mental Wellness Journey
            </button>
          </div>
        </section>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}