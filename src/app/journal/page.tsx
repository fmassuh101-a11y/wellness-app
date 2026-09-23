'use client';

import { useState, useEffect } from 'react';

interface JournalEntry {
  id: string;
  date: string;
  mood: number;
  exercise: string;
  sleep: number;
  sleepQuality: string;
  gratitude: string;
  reflection: string;
  intention: string;
  category: string;
  tags: string[];
  photos?: string[];
  weather?: string;
  highlights: string[];
  challenges: string[];
  goals: string[];
}

interface JournalStats {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
  avgMood: number;
  avgSleep: number;
  activeDays: number;
}

const categories = [
  { id: 'personal', name: 'Personal Growth', emoji: '🌱', color: 'from-emerald-400 to-teal-500' },
  { id: 'work', name: 'Work & Career', emoji: '💼', color: 'from-blue-400 to-indigo-500' },
  { id: 'health', name: 'Health & Fitness', emoji: '💪', color: 'from-green-400 to-cyan-500' },
  { id: 'relationships', name: 'Relationships', emoji: '❤️', color: 'from-pink-400 to-rose-500' },
  { id: 'mindfulness', name: 'Mindfulness', emoji: '🧘', color: 'from-purple-400 to-violet-500' },
  { id: 'creativity', name: 'Creativity', emoji: '🎨', color: 'from-orange-400 to-red-500' },
  { id: 'adventure', name: 'Adventure', emoji: '🌍', color: 'from-cyan-400 to-blue-500' },
  { id: 'learning', name: 'Learning', emoji: '📚', color: 'from-indigo-400 to-purple-500' }
];

const dailyPrompts = [
  "What made you smile today?",
  "Describe a moment when you felt proud of yourself.",
  "What's one thing you learned about yourself today?",
  "How did you show kindness to someone today?",
  "What challenged you today and how did you handle it?",
  "What are you most excited about right now?",
  "Describe a perfect moment from today.",
  "What would you tell your past self from a week ago?",
  "What are you most grateful for in this exact moment?",
  "How did you step out of your comfort zone today?",
  "What's something beautiful you noticed today?",
  "How did you take care of yourself today?",
  "What would make tomorrow even better?",
  "Describe your energy level and what influenced it.",
  "What's one thing you want to remember about today?"
];

const inspirationQuotes = [
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: "Anonymous" },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
  { text: "Progress, not perfection.", author: "Anonymous" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.", author: "Anonymous" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" }
];

const moodEmojis = [
  { value: 1, emoji: '😰', label: 'Overwhelmed', color: 'text-red-500' },
  { value: 2, emoji: '😢', label: 'Sad', color: 'text-red-400' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'text-yellow-500' },
  { value: 4, emoji: '😊', label: 'Good', color: 'text-lime-500' },
  { value: 5, emoji: '😄', label: 'Great', color: 'text-green-500' },
  { value: 6, emoji: '🤗', label: 'Happy', color: 'text-green-600' },
  { value: 7, emoji: '😍', label: 'Joyful', color: 'text-emerald-500' },
  { value: 8, emoji: '🤩', label: 'Excited', color: 'text-teal-500' },
  { value: 9, emoji: '🥳', label: 'Euphoric', color: 'text-cyan-500' },
  { value: 10, emoji: '✨', label: 'Magical', color: 'text-blue-500' }
];

export default function Journal() {
  const [selectedTab, setSelectedTab] = useState('today');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [stats, setStats] = useState<JournalStats>({
    currentStreak: 0,
    longestStreak: 0,
    totalEntries: 0,
    avgMood: 0,
    avgSleep: 0,
    activeDays: 0
  });

  // Today's entry form state
  const [mood, setMood] = useState(7);
  const [exercise, setExercise] = useState('');
  const [sleep, setSleep] = useState(8);
  const [sleepQuality, setSleepQuality] = useState('Good');
  const [gratitude, setGratitude] = useState('');
  const [reflection, setReflection] = useState('');
  const [intention, setIntention] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personal');
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [highlights, setHighlights] = useState<string[]>(['']);
  const [challenges, setChallenges] = useState<string[]>(['']);
  const [goals, setGoals] = useState<string[]>(['']);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // UI state
  const [showPrompts, setShowPrompts] = useState(false);
  const [todayPrompt, setTodayPrompt] = useState('');
  const [todayQuote, setTodayQuote] = useState(inspirationQuotes[0]);
  const [hasEntryToday, setHasEntryToday] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Load data from localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    const savedStats = localStorage.getItem('journalStats');

    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries);
      setEntries(parsedEntries);

      // Check if there's an entry for today
      const todayEntry = parsedEntries.find((entry: JournalEntry) => entry.date === today);
      if (todayEntry) {
        setHasEntryToday(true);
        loadTodayEntry(todayEntry);
      }

      // Calculate stats
      calculateStats(parsedEntries);
    }

    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    // Set daily prompt and quote
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setTodayPrompt(dailyPrompts[dayOfYear % dailyPrompts.length]);
    setTodayQuote(inspirationQuotes[dayOfYear % inspirationQuotes.length]);
  }, [today]);

  const loadTodayEntry = (entry: JournalEntry) => {
    setMood(entry.mood);
    setExercise(entry.exercise);
    setSleep(entry.sleep);
    setSleepQuality(entry.sleepQuality);
    setGratitude(entry.gratitude);
    setReflection(entry.reflection);
    setIntention(entry.intention);
    setSelectedCategory(entry.category);
    setCurrentTags(entry.tags);
    setHighlights(entry.highlights);
    setChallenges(entry.challenges);
    setGoals(entry.goals);
  };

  const calculateStats = (entriesData: JournalEntry[]) => {
    if (entriesData.length === 0) return;

    const sortedEntries = entriesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date();
    let checkDate = new Date(today);

    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasEntry = sortedEntries.some(entry => entry.date === dateStr);

      if (hasEntry) {
        tempStreak++;
        if (i === 0 || (currentStreak === 0 && tempStreak > 0)) {
          currentStreak = tempStreak;
        }
      } else {
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
        if (i === 0) {
          currentStreak = 0;
        }
        tempStreak = 0;
      }

      checkDate.setDate(checkDate.getDate() - 1);
    }

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }

    // Calculate averages
    const avgMood = entriesData.reduce((sum, entry) => sum + entry.mood, 0) / entriesData.length;
    const avgSleep = entriesData.reduce((sum, entry) => sum + entry.sleep, 0) / entriesData.length;
    const activeDays = entriesData.filter(entry => entry.exercise.length > 0).length;

    const newStats = {
      currentStreak,
      longestStreak,
      totalEntries: entriesData.length,
      avgMood: Math.round(avgMood * 10) / 10,
      avgSleep: Math.round(avgSleep * 10) / 10,
      activeDays
    };

    setStats(newStats);
    localStorage.setItem('journalStats', JSON.stringify(newStats));
  };

  const saveEntry = () => {
    const newEntry: JournalEntry = {
      id: hasEntryToday ? entries.find(e => e.date === today)?.id || Date.now().toString() : Date.now().toString(),
      date: today,
      mood,
      exercise,
      sleep,
      sleepQuality,
      gratitude,
      reflection,
      intention,
      category: selectedCategory,
      tags: currentTags,
      highlights: highlights.filter(h => h.trim()),
      challenges: challenges.filter(c => c.trim()),
      goals: goals.filter(g => g.trim())
    };

    let updatedEntries;
    if (hasEntryToday) {
      updatedEntries = entries.map(entry => entry.date === today ? newEntry : entry);
    } else {
      updatedEntries = [newEntry, ...entries];
      setHasEntryToday(true);
    }

    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    calculateStats(updatedEntries);

    // Show success message (you could add a toast notification here)
    alert('Entry saved successfully! 🎉');
  };

  const addTag = () => {
    if (newTag.trim() && !currentTags.includes(newTag.trim())) {
      setCurrentTags([...currentTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCurrentTags(currentTags.filter(tag => tag !== tagToRemove));
  };

  const addListItem = (list: string[], setList: (items: string[]) => void) => {
    setList([...list, '']);
  };

  const updateListItem = (list: string[], setList: (items: string[]) => void, index: number, value: string) => {
    const newList = [...list];
    newList[index] = value;
    setList(newList);
  };

  const removeListItem = (list: string[], setList: (items: string[]) => void, index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const exportEntries = () => {
    setIsExporting(true);
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wellness-journal-${today}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setIsExporting(false), 1000);
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.reflection.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.gratitude.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'mood') return b.mood - a.mood;
    return 0;
  });

  const getCurrentMoodEmoji = () => moodEmojis.find(m => m.value === mood);
  const getCategoryData = () => categories.find(c => c.id === selectedCategory);

  const tabs = [
    { id: 'today', label: "Today's Entry", emoji: '📝' },
    { id: 'history', label: 'Journal History', emoji: '📖' },
    { id: 'insights', label: 'Wellness Insights', emoji: '📊' },
    { id: 'goals', label: 'Goals & Streaks', emoji: '🎯' }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            ✨ Wellness Journal ✨
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Track your daily wellness journey, reflect on your progress, and discover patterns in your health and happiness.
          </p>

          {/* Daily Quote */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6 max-w-2xl mx-auto mb-8">
            <div className="text-cyan-800 text-lg font-medium mb-2">💫 Daily Inspiration</div>
            <blockquote className="text-cyan-900 text-lg italic mb-2">"{todayQuote.text}"</blockquote>
            <cite className="text-cyan-600 text-sm">— {todayQuote.author}</cite>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <div className="text-emerald-100 text-sm">🔥 Current Streak</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold">{stats.totalEntries}</div>
            <div className="text-blue-100 text-sm">📖 Total Entries</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold">{stats.avgMood}</div>
            <div className="text-purple-100 text-sm">😊 Avg Mood</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold">{stats.longestStreak}</div>
            <div className="text-orange-100 text-sm">🏆 Best Streak</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-8">
          <nav className="flex space-x-1 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="mr-2">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Today's Entry Tab */}
        {selectedTab === 'today' && (
          <div className="space-y-8">
            {/* Daily Prompt */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-violet-900">💭 Today's Prompt</h3>
                <button
                  onClick={() => setShowPrompts(!showPrompts)}
                  className="text-violet-600 hover:text-violet-800 text-sm underline"
                >
                  {showPrompts ? 'Hide' : 'Show'} More Prompts
                </button>
              </div>
              <p className="text-violet-800 text-lg">{todayPrompt}</p>

              {showPrompts && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dailyPrompts.slice(0, 6).map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setTodayPrompt(prompt)}
                      className="text-left p-3 bg-white border border-violet-200 rounded-lg hover:bg-violet-50 transition-colors duration-200"
                    >
                      <p className="text-violet-700 text-sm">{prompt}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Entry Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  📝 Today's Wellness Check-in
                </h2>
                {hasEntryToday && (
                  <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    ✅ Entry Exists
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Mood Selector */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      How are you feeling today?
                    </label>
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{getCurrentMoodEmoji()?.emoji}</div>
                      <div className="text-lg font-semibold text-slate-700">{getCurrentMoodEmoji()?.label}</div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={mood}
                      onChange={(e) => setMood(parseInt(e.target.value))}
                      className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-slate-500">1</span>
                      <span className="text-sm font-medium text-slate-700">{mood}/10</span>
                      <span className="text-xs text-slate-500">10</span>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Entry Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`p-3 rounded-lg border transition-all duration-200 ${
                            selectedCategory === category.id
                              ? `bg-gradient-to-r ${category.color} text-white shadow-md scale-105`
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-lg mr-2">{category.emoji}</span>
                          <span className="text-xs font-medium">{category.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Physical Activity */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      💪 Physical Activity
                    </label>
                    <textarea
                      rows={3}
                      value={exercise}
                      onChange={(e) => setExercise(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                      placeholder="What physical activities did you do today? (exercise, walks, sports, etc.)"
                    />
                  </div>

                  {/* Sleep */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      😴 Sleep Quality & Hours
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="12"
                          value={sleep}
                          onChange={(e) => setSleep(parseFloat(e.target.value))}
                          className="w-full px-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                          placeholder="Hours"
                        />
                        <p className="text-xs text-slate-500 mt-1">Hours slept</p>
                      </div>
                      <div>
                        <select
                          value={sleepQuality}
                          onChange={(e) => setSleepQuality(e.target.value)}
                          className="w-full px-3 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                        >
                          <option>Excellent</option>
                          <option>Good</option>
                          <option>Fair</option>
                          <option>Poor</option>
                        </select>
                        <p className="text-xs text-slate-500 mt-1">Sleep quality</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Gratitude */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      🙏 Gratitude
                    </label>
                    <textarea
                      rows={3}
                      value={gratitude}
                      onChange={(e) => setGratitude(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                      placeholder="What are you grateful for today?"
                    />
                  </div>

                  {/* Daily Reflection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      💭 Daily Reflection
                    </label>
                    <textarea
                      rows={4}
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                      placeholder="How did today go? What did you learn? Any challenges or victories?"
                    />
                  </div>

                  {/* Tomorrow's Intention */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      🌅 Tomorrow's Intention
                    </label>
                    <input
                      type="text"
                      value={intention}
                      onChange={(e) => setIntention(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                      placeholder="What's one thing you want to focus on tomorrow?"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      🏷️ Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {currentTags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-indigo-500 hover:text-indigo-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 text-sm"
                        placeholder="Add a tag..."
                      />
                      <button
                        onClick={addTag}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights, Challenges, Goals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Highlights */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    ⭐ Today's Highlights
                  </label>
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => updateListItem(highlights, setHighlights, index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-slate-50 text-sm"
                        placeholder="What went well?"
                      />
                      {highlights.length > 1 && (
                        <button
                          onClick={() => removeListItem(highlights, setHighlights, index)}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addListItem(highlights, setHighlights)}
                    className="text-green-600 hover:text-green-800 text-sm underline"
                  >
                    + Add highlight
                  </button>
                </div>

                {/* Challenges */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    🎯 Challenges
                  </label>
                  {challenges.map((challenge, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={challenge}
                        onChange={(e) => updateListItem(challenges, setChallenges, index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-slate-50 text-sm"
                        placeholder="What was difficult?"
                      />
                      {challenges.length > 1 && (
                        <button
                          onClick={() => removeListItem(challenges, setChallenges, index)}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addListItem(challenges, setChallenges)}
                    className="text-orange-600 hover:text-orange-800 text-sm underline"
                  >
                    + Add challenge
                  </button>
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    🚀 Tomorrow's Goals
                  </label>
                  {goals.map((goal, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => updateListItem(goals, setGoals, index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-sm"
                        placeholder="What do you want to achieve?"
                      />
                      {goals.length > 1 && (
                        <button
                          onClick={() => removeListItem(goals, setGoals, index)}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addListItem(goals, setGoals)}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    + Add goal
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={saveEntry}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
                >
                  {hasEntryToday ? '📝 Update Entry' : '✨ Save Entry'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Journal History Tab */}
        {selectedTab === 'history' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                    placeholder="Search entries..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.emoji} {category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                  >
                    <option value="date">Date (Newest First)</option>
                    <option value="mood">Mood (Highest First)</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-slate-600 text-sm">
                  Showing {filteredEntries.length} of {entries.length} entries
                </p>
                <button
                  onClick={exportEntries}
                  disabled={isExporting}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 text-sm disabled:opacity-50"
                >
                  {isExporting ? '⏳ Exporting...' : '📁 Export Journal'}
                </button>
              </div>
            </div>

            {/* Entries */}
            {filteredEntries.length > 0 ? (
              <div className="space-y-6">
                {filteredEntries.map((entry) => {
                  const categoryData = categories.find(c => c.id === entry.category);
                  const moodData = moodEmojis.find(m => m.value === entry.mood);

                  return (
                    <div key={entry.id} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900 mb-1">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h3>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <span className="text-2xl">{moodData?.emoji}</span>
                              <span className="text-sm font-medium text-slate-600">{entry.mood}/10</span>
                            </div>
                            {categoryData && (
                              <span className={`bg-gradient-to-r ${categoryData.color} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                                {categoryData.emoji} {categoryData.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        {entry.exercise && (
                          <div>
                            <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                              💪 <span className="ml-1">Exercise</span>
                            </h4>
                            <p className="text-slate-600 text-sm">{entry.exercise}</p>
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                            😴 <span className="ml-1">Sleep</span>
                          </h4>
                          <p className="text-slate-600 text-sm">{entry.sleep}h ({entry.sleepQuality})</p>
                        </div>
                        {entry.gratitude && (
                          <div>
                            <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                              🙏 <span className="ml-1">Gratitude</span>
                            </h4>
                            <p className="text-slate-600 text-sm">{entry.gratitude}</p>
                          </div>
                        )}
                        {entry.reflection && (
                          <div>
                            <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                              💭 <span className="ml-1">Reflection</span>
                            </h4>
                            <p className="text-slate-600 text-sm">{entry.reflection}</p>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {entry.tags.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600 px-2 py-1 rounded-full text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlights, Challenges, Goals */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {entry.highlights.length > 0 && (
                          <div>
                            <h5 className="font-medium text-slate-700 text-sm mb-2">⭐ Highlights</h5>
                            <ul className="space-y-1">
                              {entry.highlights.map((highlight, index) => (
                                <li key={index} className="text-slate-600 text-xs">• {highlight}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {entry.challenges.length > 0 && (
                          <div>
                            <h5 className="font-medium text-slate-700 text-sm mb-2">🎯 Challenges</h5>
                            <ul className="space-y-1">
                              {entry.challenges.map((challenge, index) => (
                                <li key={index} className="text-slate-600 text-xs">• {challenge}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {entry.goals.length > 0 && (
                          <div>
                            <h5 className="font-medium text-slate-700 text-sm mb-2">🚀 Goals</h5>
                            <ul className="space-y-1">
                              {entry.goals.map((goal, index) => (
                                <li key={index} className="text-slate-600 text-xs">• {goal}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No entries found</h3>
                <p className="text-slate-500">
                  {entries.length === 0
                    ? "Start journaling to see your entries here!"
                    : "Try adjusting your search or filter criteria."
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {/* Wellness Insights Tab */}
        {selectedTab === 'insights' && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold mb-2">{stats.avgMood}</div>
                <div className="text-cyan-100 text-sm">💖 Average Mood</div>
                <div className="text-cyan-200 text-xs mt-1">Last {entries.length} entries</div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold mb-2">{stats.avgSleep}h</div>
                <div className="text-indigo-100 text-sm">😴 Average Sleep</div>
                <div className="text-indigo-200 text-xs mt-1">Last {entries.length} entries</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-green-500 text-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold mb-2">{stats.activeDays}</div>
                <div className="text-emerald-100 text-sm">💪 Active Days</div>
                <div className="text-emerald-200 text-xs mt-1">Days with exercise</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold mb-2">{((stats.activeDays / stats.totalEntries) * 100).toFixed(0)}%</div>
                <div className="text-orange-100 text-sm">📈 Activity Rate</div>
                <div className="text-orange-200 text-xs mt-1">Exercise consistency</div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                🔍 Your Wellness Patterns
              </h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                  <h4 className="font-semibold text-emerald-900 mb-3 flex items-center">
                    💪 <span className="ml-2">Exercise & Mood Connection</span>
                  </h4>
                  <p className="text-emerald-800">
                    {stats.activeDays > 0
                      ? `You tend to feel ${stats.avgMood > 7 ? 'much happier' : 'better'} on days when you exercise. Keep it up!`
                      : 'Try adding some physical activity to boost your mood and energy levels.'
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    😴 <span className="ml-2">Sleep Sweet Spot</span>
                  </h4>
                  <p className="text-blue-800">
                    {stats.avgSleep >= 7 && stats.avgSleep <= 9
                      ? `Your average of ${stats.avgSleep} hours is in the optimal range for mental health.`
                      : stats.avgSleep < 7
                      ? `Consider getting more sleep - your current ${stats.avgSleep}h average could be impacting your mood.`
                      : `You're getting plenty of sleep at ${stats.avgSleep}h average. Make sure it's quality sleep too!`
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                    🌟 <span className="ml-2">Consistency Streak</span>
                  </h4>
                  <p className="text-purple-800">
                    {stats.currentStreak >= 3
                      ? `Amazing! You've journaled for ${stats.currentStreak} days straight. This consistency is building great self-awareness.`
                      : stats.currentStreak >= 1
                      ? `You're on a ${stats.currentStreak}-day streak! Try to keep it going for even better insights.`
                      : 'Daily journaling can provide powerful insights into your patterns. Try to build a consistent habit!'
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="font-semibold text-yellow-900 mb-3 flex items-center">
                    🎯 <span className="ml-2">Goal Achievement</span>
                  </h4>
                  <p className="text-yellow-800">
                    {entries.length >= 7
                      ? `You've been tracking for ${entries.length} days! Consider setting specific wellness goals to work towards.`
                      : 'Keep journaling to unlock personalized insights about your wellness patterns and goal achievement.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            {entries.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  📊 Entry Categories
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map(category => {
                    const count = entries.filter(entry => entry.category === category.id).length;
                    const percentage = entries.length > 0 ? (count / entries.length * 100).toFixed(0) : 0;

                    return (
                      <div key={category.id} className="text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-2 text-white text-2xl shadow-lg`}>
                          {category.emoji}
                        </div>
                        <div className="font-semibold text-slate-700 text-sm">{category.name}</div>
                        <div className="text-slate-500 text-xs">{count} entries ({percentage}%)</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Goals & Streaks Tab */}
        {selectedTab === 'goals' && (
          <div className="space-y-8">
            {/* Streak Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-8 text-center shadow-lg">
                <div className="text-6xl mb-4">🔥</div>
                <div className="text-4xl font-bold mb-2">{stats.currentStreak}</div>
                <div className="text-orange-100 text-lg">Current Streak</div>
                <div className="text-orange-200 text-sm mt-2">
                  {stats.currentStreak === 0
                    ? 'Start your streak today!'
                    : stats.currentStreak === 1
                    ? 'Great start! Keep it going!'
                    : `${stats.currentStreak} days of consistent journaling!`
                  }
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-8 text-center shadow-lg">
                <div className="text-6xl mb-4">🏆</div>
                <div className="text-4xl font-bold mb-2">{stats.longestStreak}</div>
                <div className="text-yellow-100 text-lg">Best Streak</div>
                <div className="text-yellow-200 text-sm mt-2">
                  {stats.longestStreak === 0
                    ? 'Your best streak awaits!'
                    : `Your personal record is ${stats.longestStreak} days!`
                  }
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                🏅 Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Achievement badges */}
                <div className={`p-6 rounded-xl border-2 text-center ${stats.totalEntries >= 1 ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-4xl mb-3">{stats.totalEntries >= 1 ? '✅' : '⭕'}</div>
                  <div className="font-semibold text-slate-700 mb-1">First Entry</div>
                  <div className="text-slate-500 text-sm">Complete your first journal entry</div>
                </div>

                <div className={`p-6 rounded-xl border-2 text-center ${stats.currentStreak >= 3 ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-4xl mb-3">{stats.currentStreak >= 3 ? '🔥' : '⭕'}</div>
                  <div className="font-semibold text-slate-700 mb-1">3-Day Streak</div>
                  <div className="text-slate-500 text-sm">Journal for 3 consecutive days</div>
                </div>

                <div className={`p-6 rounded-xl border-2 text-center ${stats.currentStreak >= 7 ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-4xl mb-3">{stats.currentStreak >= 7 ? '🌟' : '⭕'}</div>
                  <div className="font-semibold text-slate-700 mb-1">Week Warrior</div>
                  <div className="text-slate-500 text-sm">Journal for 7 consecutive days</div>
                </div>

                <div className={`p-6 rounded-xl border-2 text-center ${stats.totalEntries >= 10 ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-4xl mb-3">{stats.totalEntries >= 10 ? '📚' : '⭕'}</div>
                  <div className="font-semibold text-slate-700 mb-1">Storyteller</div>
                  <div className="text-slate-500 text-sm">Write 10 total entries</div>
                </div>

                <div className={`p-6 rounded-xl border-2 text-center ${stats.activeDays >= 5 ? 'bg-gradient-to-br from-green-50 to-lime-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-4xl mb-3">{stats.activeDays >= 5 ? '💪' : '⭕'}</div>
                  <div className="font-semibold text-slate-700 mb-1">Fitness Fan</div>
                  <div className="text-slate-500 text-sm">Log exercise 5 times</div>
                </div>

                <div className={`p-6 rounded-xl border-2 text-center ${stats.currentStreak >= 30 ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="text-4xl mb-3">{stats.currentStreak >= 30 ? '👑' : '⭕'}</div>
                  <div className="font-semibold text-slate-700 mb-1">Wellness King/Queen</div>
                  <div className="text-slate-500 text-sm">Journal for 30 consecutive days</div>
                </div>
              </div>
            </div>

            {/* Goals Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                🎯 Wellness Goals
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-blue-900">Daily Journaling</span>
                    <span className="text-blue-600 text-sm">{stats.currentStreak}/∞ days</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (stats.currentStreak / 30) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-blue-700 text-sm mt-2">Build a consistent journaling habit</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-green-900">Active Lifestyle</span>
                    <span className="text-green-600 text-sm">{stats.activeDays}/{stats.totalEntries} days</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.totalEntries > 0 ? (stats.activeDays / stats.totalEntries) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <p className="text-green-700 text-sm mt-2">Stay active and exercise regularly</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-purple-900">Mood Stability</span>
                    <span className="text-purple-600 text-sm">{stats.avgMood}/10 avg</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.avgMood / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-purple-700 text-sm mt-2">Maintain a positive mood and emotional balance</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}