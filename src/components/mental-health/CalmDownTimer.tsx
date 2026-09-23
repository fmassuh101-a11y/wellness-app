'use client';

import { useState, useEffect, useRef } from 'react';

interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  cycles: number;
  color: string;
}

const breathingExercises: BreathingExercise[] = [
  {
    id: 'box-breathing',
    name: '4-4-4-4 Box Breathing',
    description: 'Equal counts for inhale, hold, exhale, hold. Great for anxiety.',
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 8,
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'calming-breathing',
    name: '4-7-8 Calming Breath',
    description: 'Longer exhale for deep relaxation. Perfect before sleep.',
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 6,
    color: 'from-violet-400 to-purple-500'
  },
  {
    id: 'energizing-breathing',
    name: '4-4-6 Energizing Breath',
    description: 'Slightly longer exhale for gentle energy boost.',
    inhale: 4,
    hold: 4,
    exhale: 6,
    cycles: 10,
    color: 'from-emerald-400 to-green-500'
  }
];

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'pause';

export default function CalmDownTimer() {
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startExercise = (exercise: BreathingExercise) => {
    setSelectedExercise(exercise);
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeLeft(exercise.inhale);
    setCycleCount(0);
    setIsCompleted(false);
  };

  const stopExercise = () => {
    setIsActive(false);
    setSelectedExercise(null);
    setCurrentPhase('inhale');
    setTimeLeft(0);
    setCycleCount(0);
    setIsCompleted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const pauseExercise = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isActive && selectedExercise && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, selectedExercise]);

  useEffect(() => {
    if (timeLeft === 0 && isActive && selectedExercise) {
      // Move to next phase
      if (currentPhase === 'inhale') {
        setCurrentPhase('hold');
        setTimeLeft(selectedExercise.hold);
      } else if (currentPhase === 'hold') {
        setCurrentPhase('exhale');
        setTimeLeft(selectedExercise.exhale);
      } else if (currentPhase === 'exhale') {
        // Complete one cycle
        const newCycleCount = cycleCount + 1;
        setCycleCount(newCycleCount);

        if (newCycleCount >= selectedExercise.cycles) {
          // Exercise completed
          setIsActive(false);
          setIsCompleted(true);
        } else {
          // Start next cycle
          setCurrentPhase('pause');
          setTimeLeft(2); // 2 second pause between cycles
        }
      } else if (currentPhase === 'pause') {
        setCurrentPhase('inhale');
        setTimeLeft(selectedExercise.inhale);
      }
    }
  }, [timeLeft, isActive, selectedExercise, currentPhase, cycleCount]);

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Rest';
      default: return '';
    }
  };

  const getCircleScale = () => {
    if (!selectedExercise) return 'scale-100';

    const totalTime = currentPhase === 'inhale' ? selectedExercise.inhale :
                     currentPhase === 'hold' ? selectedExercise.hold :
                     currentPhase === 'exhale' ? selectedExercise.exhale : 2;

    const progress = (totalTime - timeLeft) / totalTime;

    if (currentPhase === 'inhale') {
      return `scale-${Math.round(100 + progress * 50)}`; // Scale from 100% to 150%
    } else if (currentPhase === 'exhale') {
      return `scale-${Math.round(150 - progress * 50)}`; // Scale from 150% to 100%
    } else {
      return 'scale-150'; // Hold or pause
    }
  };

  const getAnimationClass = () => {
    if (!isActive) return '';

    switch (currentPhase) {
      case 'inhale': return 'animate-pulse';
      case 'exhale': return 'animate-pulse';
      default: return '';
    }
  };

  if (!selectedExercise) {
    return (
      <div className="card-clean rounded-xl p-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold gradient-text-primary mb-2">
            🫁 Calm Down Timer
          </h3>
          <p className="text-secondary-custom">
            Choose a breathing exercise to help you relax and center yourself
          </p>
        </div>

        <div className="space-y-4">
          {breathingExercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => startExercise(exercise)}
              className="w-full text-left p-6 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold text-primary-custom">
                  {exercise.name}
                </h4>
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${exercise.color}`}></div>
              </div>
              <p className="text-secondary-custom mb-4">{exercise.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>⏱️ {Math.round((exercise.inhale + exercise.hold + exercise.exhale + 2) * exercise.cycles / 60)} min</span>
                <span>🔄 {exercise.cycles} cycles</span>
                <span>📐 {exercise.inhale}-{exercise.hold}-{exercise.exhale}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg">
          <div className="flex items-center space-x-2 text-sky-800 mb-2">
            <span>💡</span>
            <span className="font-semibold">How to use:</span>
          </div>
          <p className="text-sky-700 text-sm">
            Find a comfortable position, close your eyes if you'd like, and follow the breathing pattern.
            The circle will expand as you inhale and contract as you exhale. Don't worry if you can't match perfectly - just do your best!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-clean rounded-xl p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-primary-custom mb-2">
          {selectedExercise.name}
        </h3>
        <p className="text-secondary-custom text-sm">
          {selectedExercise.description}
        </p>
      </div>

      {isCompleted && (
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
          <div className="text-4xl mb-3">🎉</div>
          <h4 className="text-xl font-semibold text-emerald-800 mb-2">
            Exercise Complete!
          </h4>
          <p className="text-emerald-700 mb-4">
            Great job! You completed {selectedExercise.cycles} cycles of {selectedExercise.name}.
            How do you feel now?
          </p>
          <div className="space-x-3">
            <button
              onClick={() => startExercise(selectedExercise)}
              className="btn-primary px-4 py-2 rounded-lg"
            >
              Do it again
            </button>
            <button
              onClick={stopExercise}
              className="btn-outline px-4 py-2 rounded-lg"
            >
              Choose different exercise
            </button>
          </div>
        </div>
      )}

      {!isCompleted && (
        <>
          {/* Breathing Circle */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div
                className={`w-40 h-40 rounded-full bg-gradient-to-r ${selectedExercise.color} transition-transform duration-1000 ease-in-out ${getAnimationClass()}`}
                style={{
                  transform: currentPhase === 'inhale' ? 'scale(1.5)' :
                           currentPhase === 'exhale' ? 'scale(1)' :
                           'scale(1.3)'
                }}
              >
                <div className="absolute inset-0 rounded-full bg-white/20"></div>
              </div>
            </div>
          </div>

          {/* Phase and Timer */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-primary-custom mb-2">
              {getPhaseText()}
            </div>
            <div className="text-6xl font-mono text-secondary-custom mb-2">
              {timeLeft}
            </div>
            <div className="text-sm text-gray-500">
              Cycle {cycleCount + 1} of {selectedExercise.cycles}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-slate-200 rounded-full h-2 shadow-inner">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${selectedExercise.color} transition-all duration-300`}
                style={{
                  width: `${((cycleCount) / selectedExercise.cycles) * 100}%`
                }}
              ></div>
            </div>
            <div className="text-center text-sm text-slate-500 mt-2">
              {Math.round(((cycleCount) / selectedExercise.cycles) * 100)}% Complete
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={pauseExercise}
              className="btn-secondary px-6 py-2 rounded-lg"
            >
              {isActive ? '⏸️ Pause' : '▶️ Resume'}
            </button>
            <button
              onClick={stopExercise}
              className="btn-outline px-6 py-2 rounded-lg"
            >
              🏠 Back to exercises
            </button>
          </div>
        </>
      )}
    </div>
  );
}