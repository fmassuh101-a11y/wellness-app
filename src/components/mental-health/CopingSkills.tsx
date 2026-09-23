'use client';

import { useState } from 'react';

interface CopingStrategy {
  id: string;
  title: string;
  description: string;
  steps: string[];
  duration: string;
  category: string;
}

const copingStrategies: { [key: string]: CopingStrategy[] } = {
  anxious: [
    {
      id: 'box-breathing',
      title: '4-7-8 Breathing',
      description: 'A powerful breathing technique to calm anxiety instantly',
      steps: [
        'Inhale through your nose for 4 counts',
        'Hold your breath for 7 counts',
        'Exhale through your mouth for 8 counts',
        'Repeat this cycle 4 times'
      ],
      duration: '2-3 minutes',
      category: 'Breathing'
    },
    {
      id: 'grounding-5-4-3-2-1',
      title: '5-4-3-2-1 Grounding',
      description: 'Use your senses to ground yourself in the present moment',
      steps: [
        'Name 5 things you can see',
        'Name 4 things you can touch',
        'Name 3 things you can hear',
        'Name 2 things you can smell',
        'Name 1 thing you can taste'
      ],
      duration: '3-5 minutes',
      category: 'Grounding'
    },
    {
      id: 'progressive-relaxation',
      title: 'Progressive Muscle Relaxation',
      description: 'Release physical tension that comes with anxiety',
      steps: [
        'Start with your toes - tense for 5 seconds, then relax',
        'Move to your calves, then thighs',
        'Continue up through your body to your head',
        'Notice the difference between tension and relaxation'
      ],
      duration: '10-15 minutes',
      category: 'Physical'
    }
  ],
  sad: [
    {
      id: 'self-compassion',
      title: 'Self-Compassion Break',
      description: 'Treat yourself with the kindness you\'d show a good friend',
      steps: [
        'Place your hand on your heart',
        'Say: "This is a moment of suffering"',
        'Say: "Suffering is part of life"',
        'Say: "May I be kind to myself in this moment"'
      ],
      duration: '2-3 minutes',
      category: 'Mindfulness'
    },
    {
      id: 'gentle-movement',
      title: 'Gentle Movement',
      description: 'Light physical activity to boost mood naturally',
      steps: [
        'Go for a short walk outside',
        'Do some gentle stretching',
        'Dance to your favorite song',
        'Try yoga poses like child\'s pose'
      ],
      duration: '10-20 minutes',
      category: 'Physical'
    },
    {
      id: 'gratitude-practice',
      title: 'Gratitude Practice',
      description: 'Shift focus to positive aspects of your life',
      steps: [
        'Write down 3 things you\'re grateful for today',
        'Include why you\'re grateful for each',
        'Think of someone who has helped you recently',
        'Consider sending them a thank you message'
      ],
      duration: '5-10 minutes',
      category: 'Cognitive'
    }
  ],
  angry: [
    {
      id: 'cooling-breath',
      title: 'Cooling Breath',
      description: 'Release anger through controlled breathing',
      steps: [
        'Curl your tongue and inhale through it',
        'Close your mouth and hold for 2 seconds',
        'Exhale slowly through your nose',
        'Repeat 5-10 times until you feel calmer'
      ],
      duration: '3-5 minutes',
      category: 'Breathing'
    },
    {
      id: 'physical-release',
      title: 'Safe Physical Release',
      description: 'Channel angry energy safely',
      steps: [
        'Do jumping jacks or run in place',
        'Punch a pillow or squeeze a stress ball',
        'Scream into a pillow',
        'Take a cold shower or splash cold water on face'
      ],
      duration: '5-10 minutes',
      category: 'Physical'
    },
    {
      id: 'cognitive-reframe',
      title: 'Perspective Check',
      description: 'Challenge angry thoughts with questions',
      steps: [
        'Ask: "Will this matter in 5 years?"',
        'Ask: "What would I tell a friend in this situation?"',
        'Ask: "What can I learn from this?"',
        'Write down your thoughts to see them clearly'
      ],
      duration: '5-10 minutes',
      category: 'Cognitive'
    }
  ],
  overwhelmed: [
    {
      id: 'brain-dump',
      title: 'Brain Dump',
      description: 'Get everything out of your head onto paper',
      steps: [
        'Set a timer for 10 minutes',
        'Write down everything on your mind',
        'Don\'t worry about organization',
        'Circle the top 3 most important items'
      ],
      duration: '10-15 minutes',
      category: 'Organization'
    },
    {
      id: 'priority-matrix',
      title: 'Priority Matrix',
      description: 'Organize tasks by importance and urgency',
      steps: [
        'List all your tasks',
        'Sort into: Urgent & Important, Important but not urgent',
        'Put aside: Urgent but not important, Neither urgent nor important',
        'Focus only on the first category today'
      ],
      duration: '10-15 minutes',
      category: 'Organization'
    },
    {
      id: 'micro-break',
      title: 'Micro-Break Reset',
      description: 'Take a purposeful 5-minute break',
      steps: [
        'Step away from your current task',
        'Take 5 deep breaths',
        'Stretch your neck and shoulders',
        'Drink a glass of water'
      ],
      duration: '5 minutes',
      category: 'Reset'
    }
  ]
};

const emotionOptions = [
  { key: 'anxious', label: 'Anxious/Worried', emoji: '😰', color: 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 text-amber-800 hover:from-amber-100 hover:to-yellow-100' },
  { key: 'sad', label: 'Sad/Down', emoji: '😢', color: 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-300 text-sky-800 hover:from-sky-100 hover:to-blue-100' },
  { key: 'angry', label: 'Angry/Frustrated', emoji: '😠', color: 'bg-gradient-to-br from-rose-50 to-red-50 border-rose-300 text-rose-800 hover:from-rose-100 hover:to-red-100' },
  { key: 'overwhelmed', label: 'Overwhelmed', emoji: '🤯', color: 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-300 text-violet-800 hover:from-violet-100 hover:to-purple-100' }
];

export default function CopingSkills() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<CopingStrategy | null>(null);

  const resetSelection = () => {
    setSelectedEmotion(null);
    setSelectedStrategy(null);
  };

  return (
    <div className="card-clean rounded-xl p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold gradient-text-primary mb-2">
          🛠️ Coping Skills Library
        </h3>
        <p className="text-secondary-custom">
          {!selectedEmotion
            ? "How are you feeling right now? Click to find helpful strategies."
            : selectedStrategy
            ? "Follow this step-by-step guide:"
            : "Choose a coping strategy that feels right for you:"
          }
        </p>
      </div>

      {!selectedEmotion && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emotionOptions.map((emotion) => (
            <button
              key={emotion.key}
              onClick={() => setSelectedEmotion(emotion.key)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${emotion.color} hover:shadow-md`}
            >
              <div className="text-4xl mb-3">{emotion.emoji}</div>
              <div className="font-semibold text-lg">{emotion.label}</div>
              <div className="text-sm opacity-75 mt-2">
                Click for coping strategies
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedEmotion && !selectedStrategy && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-semibold">
              Strategies for feeling {emotionOptions.find(e => e.key === selectedEmotion)?.label.toLowerCase()}
            </h4>
            <button
              onClick={resetSelection}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {copingStrategies[selectedEmotion]?.map((strategy) => (
              <button
                key={strategy.id}
                onClick={() => setSelectedStrategy(strategy)}
                className="text-left p-4 rounded-lg border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all duration-200 hover:scale-105"
              >
                <div className="font-semibold text-primary-custom mb-2">
                  {strategy.title}
                </div>
                <div className="text-sm text-secondary-custom mb-3">
                  {strategy.description}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 py-1 rounded">
                    {strategy.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {strategy.duration}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedStrategy && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-semibold text-primary-custom">
              {selectedStrategy.title}
            </h4>
            <button
              onClick={() => setSelectedStrategy(null)}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            >
              ← Back to strategies
            </button>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 rounded-lg p-6 mb-6">
            <p className="text-secondary-custom mb-4">{selectedStrategy.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-gradient-to-r from-white to-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                ⏱️ {selectedStrategy.duration}
              </span>
              <span className="bg-gradient-to-r from-white to-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                🏷️ {selectedStrategy.category}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold text-gray-700">Follow these steps:</h5>
            {selectedStrategy.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  {index + 1}
                </div>
                <div className="text-secondary-custom">{step}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
            <div className="flex items-center space-x-2 text-emerald-800 mb-2">
              <span>💡</span>
              <span className="font-semibold">Tip:</span>
            </div>
            <p className="text-emerald-700 text-sm">
              Practice makes perfect! Try this technique when you're calm so it's easier to use when you need it most.
              Bookmark this strategy if it works well for you.
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={resetSelection}
              className="btn-outline px-6 py-2 rounded-lg"
            >
              Try Another Strategy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}