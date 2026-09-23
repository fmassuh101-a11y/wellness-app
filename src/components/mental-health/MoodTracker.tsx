'use client';

import { useState, useEffect } from 'react';

interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
  emoji: string;
}

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Very Sad', color: 'text-rose-500' },
  { value: 2, emoji: '😟', label: 'Sad', color: 'text-amber-500' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'text-indigo-500' },
  { value: 4, emoji: '😊', label: 'Happy', color: 'text-emerald-500' },
  { value: 5, emoji: '😁', label: 'Very Happy', color: 'text-green-500' }
];

export default function MoodTracker() {
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [moodNote, setMoodNote] = useState<string>('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [hasLoggedToday, setHasLoggedToday] = useState<boolean>(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Load mood history from localStorage
    const savedMoods = localStorage.getItem('moodHistory');
    if (savedMoods) {
      const history = JSON.parse(savedMoods);
      setMoodHistory(history);

      // Check if user has logged today
      const todayEntry = history.find((entry: MoodEntry) => entry.date === today);
      if (todayEntry) {
        setHasLoggedToday(true);
        setCurrentMood(todayEntry.mood);
        setMoodNote(todayEntry.note || '');
      }
    }
  }, [today]);

  const saveMood = () => {
    const selectedEmoji = moodEmojis.find(e => e.value === currentMood);

    const newEntry: MoodEntry = {
      date: today,
      mood: currentMood,
      note: moodNote.trim(),
      emoji: selectedEmoji?.emoji || '😐'
    };

    const updatedHistory = moodHistory.filter(entry => entry.date !== today);
    updatedHistory.push(newEntry);
    updatedHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Keep only last 30 days
    const last30Days = updatedHistory.slice(0, 30);

    setMoodHistory(last30Days);
    localStorage.setItem('moodHistory', JSON.stringify(last30Days));
    setHasLoggedToday(true);
  };

  const getCurrentMoodEmoji = () => {
    return moodEmojis.find(e => e.value === currentMood);
  };

  const getAverageMood = () => {
    if (moodHistory.length === 0) return 0;
    const sum = moodHistory.reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / moodHistory.length).toFixed(1);
  };

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return 'neutral';
    const recent = moodHistory.slice(0, 5).reduce((acc, entry) => acc + entry.mood, 0) / Math.min(5, moodHistory.length);
    const older = moodHistory.slice(5, 10).reduce((acc, entry) => acc + entry.mood, 0) / Math.min(5, moodHistory.slice(5, 10).length);

    if (recent > older + 0.3) return 'improving';
    if (recent < older - 0.3) return 'declining';
    return 'stable';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="card-clean rounded-xl p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold gradient-text-primary mb-2">
          📊 Daily Mood Tracker
        </h3>
        <p className="text-secondary-custom">
          {hasLoggedToday ? "Today's mood logged!" : "How are you feeling today?"}
        </p>
      </div>

      {/* Current Mood Selection */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">
            {getCurrentMoodEmoji()?.emoji}
          </div>
          <h4 className="text-xl font-semibold text-primary-custom mb-2">
            {getCurrentMoodEmoji()?.label}
          </h4>
        </div>

        {/* Mood Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="1"
            max="5"
            value={currentMood}
            onChange={(e) => setCurrentMood(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer mood-slider"
            disabled={hasLoggedToday}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            {moodEmojis.map((mood) => (
              <span key={mood.value} className={`${mood.color} text-lg`}>
                {mood.emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Mood Note */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Optional note about your mood:
          </label>
          <textarea
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
            placeholder="What's influencing your mood today?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
            disabled={hasLoggedToday}
          />
        </div>

        {/* Save Button */}
        {!hasLoggedToday && (
          <button
            onClick={saveMood}
            className="w-full btn-primary rounded-lg py-3 font-semibold"
          >
            Log Today's Mood
          </button>
        )}

        {hasLoggedToday && (
          <div className="text-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
            <span className="text-emerald-700 font-medium">
              ✅ Mood logged for today! Come back tomorrow.
            </span>
          </div>
        )}
      </div>

      {/* Mood Statistics */}
      {moodHistory.length > 0 && (
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-primary-custom mb-4">Your Mood Insights</h4>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
              <div className="text-2xl font-bold text-cyan-600">{getAverageMood()}</div>
              <div className="text-xs text-cyan-600">Average Mood</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border border-violet-200">
              <div className="text-2xl font-bold text-violet-600">{moodHistory.length}</div>
              <div className="text-xs text-violet-600">Days Tracked</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
              <div className="text-lg font-bold text-emerald-600">
                {getMoodTrend() === 'improving' && '📈 Improving'}
                {getMoodTrend() === 'declining' && '📉 Needs Care'}
                {getMoodTrend() === 'stable' && '➡️ Stable'}
              </div>
              <div className="text-xs text-emerald-600">Trend</div>
            </div>
          </div>

          {/* Recent Mood History */}
          <div>
            <h5 className="font-medium text-gray-700 mb-3">Recent History</h5>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {moodHistory.slice(0, 7).map((entry, index) => (
                <div key={entry.date} className="flex items-center justify-between p-2 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{entry.emoji}</span>
                    <div>
                      <div className="text-sm font-medium">
                        {entry.date === today ? 'Today' : formatDate(entry.date)}
                      </div>
                      {entry.note && (
                        <div className="text-xs text-gray-500 truncate max-w-48">
                          {entry.note}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {moodEmojis.find(m => m.value === entry.mood)?.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .mood-slider::-webkit-slider-thumb {
          appearance: none;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .mood-slider::-moz-range-thumb {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}