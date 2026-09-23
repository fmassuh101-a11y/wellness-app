'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface MuscleGroup {
  name: string;
  exercises: string[];
  description: string;
}

interface MuscleHotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number; // percentage
  height: number; // percentage
  muscleKey: string;
}

type Gender = 'male' | 'female' | 'other';
type View = 'front' | 'back';

const muscleData: { [key: string]: MuscleGroup } = {
  chest: {
    name: "Pectoralis Major",
    exercises: ["Push-ups", "Bench Press", "Chest Fly", "Dips", "Incline Press"],
    description: "The primary chest muscle responsible for arm adduction and pushing movements."
  },
  deltoids: {
    name: "Deltoids",
    exercises: ["Shoulder Press", "Lateral Raises", "Front Raises", "Rear Delt Fly"],
    description: "Three-headed shoulder muscle controlling arm elevation and rotation."
  },
  biceps: {
    name: "Biceps Brachii",
    exercises: ["Bicep Curls", "Hammer Curls", "Chin-ups", "Preacher Curls"],
    description: "Primary elbow flexor located on the front of the upper arm."
  },
  triceps: {
    name: "Triceps Brachii",
    exercises: ["Tricep Dips", "Close-Grip Push-ups", "Overhead Extension", "Diamond Push-ups"],
    description: "Three-headed muscle on the back of the upper arm responsible for elbow extension."
  },
  abs: {
    name: "Rectus Abdominis",
    exercises: ["Crunches", "Planks", "Russian Twists", "Mountain Climbers", "Dead Bug"],
    description: "The 'six-pack' muscle running vertically along the front of the abdomen."
  },
  obliques: {
    name: "External Obliques",
    exercises: ["Side Planks", "Russian Twists", "Bicycle Crunches", "Wood Chops"],
    description: "Side abdominal muscles that help with trunk rotation and lateral flexion."
  },
  quads: {
    name: "Quadriceps Femoris",
    exercises: ["Squats", "Lunges", "Leg Press", "Wall Sits", "Step-ups"],
    description: "Four-headed muscle group on the front of the thigh responsible for knee extension."
  },
  hamstrings: {
    name: "Hamstring Group",
    exercises: ["Romanian Deadlifts", "Leg Curls", "Good Mornings", "Single-leg RDL"],
    description: "Three muscles on the back of the thigh responsible for knee flexion and hip extension."
  },
  calves: {
    name: "Gastrocnemius & Soleus",
    exercises: ["Calf Raises", "Jump Rope", "Box Jumps", "Single-leg Calf Raises"],
    description: "Primary calf muscles providing plantar flexion and propulsion."
  },
  lats: {
    name: "Latissimus Dorsi",
    exercises: ["Pull-ups", "Lat Pulldowns", "Rows", "Reverse Fly"],
    description: "Large back muscles responsible for arm adduction and pulling movements."
  },
  traps: {
    name: "Trapezius",
    exercises: ["Shrugs", "Upright Rows", "Face Pulls", "High Pulls"],
    description: "Diamond-shaped muscle supporting the neck and shoulders."
  },
  rhomboids: {
    name: "Rhomboids",
    exercises: ["Rows", "Reverse Fly", "Face Pulls", "Band Pull-Aparts"],
    description: "Muscles between the shoulder blades that help with posture and scapular retraction."
  },
  glutes: {
    name: "Gluteus Maximus",
    exercises: ["Squats", "Hip Thrusts", "Lunges", "Deadlifts"],
    description: "The largest muscle in the body, responsible for hip extension and stabilization."
  },
  forearms: {
    name: "Forearm Muscles",
    exercises: ["Wrist Curls", "Farmer's Walks", "Dead Hangs", "Grip Squeezes"],
    description: "Muscles controlling wrist and finger movement, crucial for grip strength."
  }
};

// Hotspot definitions for each image (male/female front/back)
const hotspots: { [key in Gender]: { [key in View]: MuscleHotspot[] } } = {
  male: {
    front: [
      { id: 'chest-left', x: 35, y: 25, width: 12, height: 15, muscleKey: 'chest' },
      { id: 'chest-right', x: 53, y: 25, width: 12, height: 15, muscleKey: 'chest' },
      { id: 'deltoids-left', x: 20, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'deltoids-right', x: 70, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'biceps-left', x: 15, y: 30, width: 8, height: 12, muscleKey: 'biceps' },
      { id: 'biceps-right', x: 77, y: 30, width: 8, height: 12, muscleKey: 'biceps' },
      { id: 'forearms-left', x: 10, y: 45, width: 6, height: 15, muscleKey: 'forearms' },
      { id: 'forearms-right', x: 84, y: 45, width: 6, height: 15, muscleKey: 'forearms' },
      { id: 'abs', x: 42, y: 35, width: 16, height: 20, muscleKey: 'abs' },
      { id: 'obliques-left', x: 32, y: 40, width: 8, height: 15, muscleKey: 'obliques' },
      { id: 'obliques-right', x: 60, y: 40, width: 8, height: 15, muscleKey: 'obliques' },
      { id: 'quads-left', x: 35, y: 60, width: 10, height: 20, muscleKey: 'quads' },
      { id: 'quads-right', x: 55, y: 60, width: 10, height: 20, muscleKey: 'quads' },
      { id: 'calves-left', x: 36, y: 85, width: 8, height: 12, muscleKey: 'calves' },
      { id: 'calves-right', x: 56, y: 85, width: 8, height: 12, muscleKey: 'calves' }
    ],
    back: [
      { id: 'traps', x: 35, y: 15, width: 30, height: 12, muscleKey: 'traps' },
      { id: 'deltoids-left', x: 20, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'deltoids-right', x: 70, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'triceps-left', x: 15, y: 30, width: 8, height: 12, muscleKey: 'triceps' },
      { id: 'triceps-right', x: 77, y: 30, width: 8, height: 12, muscleKey: 'triceps' },
      { id: 'lats-left', x: 25, y: 30, width: 15, height: 18, muscleKey: 'lats' },
      { id: 'lats-right', x: 60, y: 30, width: 15, height: 18, muscleKey: 'lats' },
      { id: 'rhomboids', x: 40, y: 25, width: 20, height: 10, muscleKey: 'rhomboids' },
      { id: 'glutes-left', x: 35, y: 55, width: 10, height: 12, muscleKey: 'glutes' },
      { id: 'glutes-right', x: 55, y: 55, width: 10, height: 12, muscleKey: 'glutes' },
      { id: 'hamstrings-left', x: 35, y: 70, width: 10, height: 15, muscleKey: 'hamstrings' },
      { id: 'hamstrings-right', x: 55, y: 70, width: 10, height: 15, muscleKey: 'hamstrings' },
      { id: 'calves-left', x: 36, y: 85, width: 8, height: 12, muscleKey: 'calves' },
      { id: 'calves-right', x: 56, y: 85, width: 8, height: 12, muscleKey: 'calves' }
    ]
  },
  female: {
    front: [
      { id: 'chest-left', x: 35, y: 25, width: 12, height: 15, muscleKey: 'chest' },
      { id: 'chest-right', x: 53, y: 25, width: 12, height: 15, muscleKey: 'chest' },
      { id: 'deltoids-left', x: 20, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'deltoids-right', x: 70, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'biceps-left', x: 15, y: 30, width: 8, height: 12, muscleKey: 'biceps' },
      { id: 'biceps-right', x: 77, y: 30, width: 8, height: 12, muscleKey: 'biceps' },
      { id: 'forearms-left', x: 10, y: 45, width: 6, height: 15, muscleKey: 'forearms' },
      { id: 'forearms-right', x: 84, y: 45, width: 6, height: 15, muscleKey: 'forearms' },
      { id: 'abs', x: 42, y: 35, width: 16, height: 20, muscleKey: 'abs' },
      { id: 'obliques-left', x: 32, y: 40, width: 8, height: 15, muscleKey: 'obliques' },
      { id: 'obliques-right', x: 60, y: 40, width: 8, height: 15, muscleKey: 'obliques' },
      { id: 'quads-left', x: 35, y: 60, width: 10, height: 20, muscleKey: 'quads' },
      { id: 'quads-right', x: 55, y: 60, width: 10, height: 20, muscleKey: 'quads' },
      { id: 'calves-left', x: 36, y: 85, width: 8, height: 12, muscleKey: 'calves' },
      { id: 'calves-right', x: 56, y: 85, width: 8, height: 12, muscleKey: 'calves' }
    ],
    back: [
      { id: 'traps', x: 35, y: 15, width: 30, height: 12, muscleKey: 'traps' },
      { id: 'deltoids-left', x: 20, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'deltoids-right', x: 70, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'triceps-left', x: 15, y: 30, width: 8, height: 12, muscleKey: 'triceps' },
      { id: 'triceps-right', x: 77, y: 30, width: 8, height: 12, muscleKey: 'triceps' },
      { id: 'lats-left', x: 25, y: 30, width: 15, height: 18, muscleKey: 'lats' },
      { id: 'lats-right', x: 60, y: 30, width: 15, height: 18, muscleKey: 'lats' },
      { id: 'rhomboids', x: 40, y: 25, width: 20, height: 10, muscleKey: 'rhomboids' },
      { id: 'glutes-left', x: 35, y: 55, width: 10, height: 12, muscleKey: 'glutes' },
      { id: 'glutes-right', x: 55, y: 55, width: 10, height: 12, muscleKey: 'glutes' },
      { id: 'hamstrings-left', x: 35, y: 70, width: 10, height: 15, muscleKey: 'hamstrings' },
      { id: 'hamstrings-right', x: 55, y: 70, width: 10, height: 15, muscleKey: 'hamstrings' },
      { id: 'calves-left', x: 36, y: 85, width: 8, height: 12, muscleKey: 'calves' },
      { id: 'calves-right', x: 56, y: 85, width: 8, height: 12, muscleKey: 'calves' }
    ]
  },
  other: {
    front: [
      { id: 'chest-left', x: 35, y: 25, width: 12, height: 15, muscleKey: 'chest' },
      { id: 'chest-right', x: 53, y: 25, width: 12, height: 15, muscleKey: 'chest' },
      { id: 'deltoids-left', x: 20, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'deltoids-right', x: 70, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'biceps-left', x: 15, y: 30, width: 8, height: 12, muscleKey: 'biceps' },
      { id: 'biceps-right', x: 77, y: 30, width: 8, height: 12, muscleKey: 'biceps' },
      { id: 'forearms-left', x: 10, y: 45, width: 6, height: 15, muscleKey: 'forearms' },
      { id: 'forearms-right', x: 84, y: 45, width: 6, height: 15, muscleKey: 'forearms' },
      { id: 'abs', x: 42, y: 35, width: 16, height: 20, muscleKey: 'abs' },
      { id: 'obliques-left', x: 32, y: 40, width: 8, height: 15, muscleKey: 'obliques' },
      { id: 'obliques-right', x: 60, y: 40, width: 8, height: 15, muscleKey: 'obliques' },
      { id: 'quads-left', x: 35, y: 60, width: 10, height: 20, muscleKey: 'quads' },
      { id: 'quads-right', x: 55, y: 60, width: 10, height: 20, muscleKey: 'quads' },
      { id: 'calves-left', x: 36, y: 85, width: 8, height: 12, muscleKey: 'calves' },
      { id: 'calves-right', x: 56, y: 85, width: 8, height: 12, muscleKey: 'calves' }
    ],
    back: [
      { id: 'traps', x: 35, y: 15, width: 30, height: 12, muscleKey: 'traps' },
      { id: 'deltoids-left', x: 20, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'deltoids-right', x: 70, y: 20, width: 10, height: 12, muscleKey: 'deltoids' },
      { id: 'triceps-left', x: 15, y: 30, width: 8, height: 12, muscleKey: 'triceps' },
      { id: 'triceps-right', x: 77, y: 30, width: 8, height: 12, muscleKey: 'triceps' },
      { id: 'lats-left', x: 25, y: 30, width: 15, height: 18, muscleKey: 'lats' },
      { id: 'lats-right', x: 60, y: 30, width: 15, height: 18, muscleKey: 'lats' },
      { id: 'rhomboids', x: 40, y: 25, width: 20, height: 10, muscleKey: 'rhomboids' },
      { id: 'glutes-left', x: 35, y: 55, width: 10, height: 12, muscleKey: 'glutes' },
      { id: 'glutes-right', x: 55, y: 55, width: 10, height: 12, muscleKey: 'glutes' },
      { id: 'hamstrings-left', x: 35, y: 70, width: 10, height: 15, muscleKey: 'hamstrings' },
      { id: 'hamstrings-right', x: 55, y: 70, width: 10, height: 15, muscleKey: 'hamstrings' },
      { id: 'calves-left', x: 36, y: 85, width: 8, height: 12, muscleKey: 'calves' },
      { id: 'calves-right', x: 56, y: 85, width: 8, height: 12, muscleKey: 'calves' }
    ]
  }
};

export default function HumanAnatomy() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [selectedView, setSelectedView] = useState<View>('front');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMuscleClick = (muscle: string) => {
    setSelectedMuscle(muscle === selectedMuscle ? null : muscle);
  };

  const getImagePath = () => {
    if (selectedGender === 'other') {
      // Default to male images for 'other' gender
      return selectedView === 'front' ? '/Men.front.png' : '/Men.back.png';
    }

    if (selectedGender === 'female') {
      // Female: use male front image for front view, women back for back view
      return selectedView === 'front' ? '/Men.front.png' : '/Women.back.png';
    }

    // Male images
    return selectedView === 'front' ? '/Men.front.png' : '/Men.back.png';
  };

  const getCurrentHotspots = () => {
    const genderKey = selectedGender === 'other' ? 'male' : selectedGender;
    return hotspots[genderKey][selectedView];
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Selection Controls */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        {/* Gender Selection */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-primary-custom mb-3">Body Type</h3>
          <div className="flex gap-2">
            {(['male', 'female', 'other'] as Gender[]).map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedGender === gender
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Other'}
              </button>
            ))}
          </div>
        </div>

        {/* View Selection */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-primary-custom mb-3">View</h3>
          <div className="flex gap-2">
            {(['front', 'back'] as View[]).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedView === view
                    ? 'btn-secondary'
                    : 'btn-outline'
                }`}
              >
                {view === 'front' ? 'Front View' : 'Back View'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Anatomy Display */}
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Interactive Anatomy Image */}
        <div className="relative max-w-md mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold gradient-text-primary">
              {selectedGender === 'male' ? 'Male' : selectedGender === 'female' ? 'Female' : 'Anatomy'} - {selectedView === 'front' ? 'Front' : 'Back'} View
            </h3>
          </div>

          <div ref={containerRef} className="relative inline-block">
            <Image
              src={getImagePath()}
              alt={`${selectedGender} ${selectedView} anatomy`}
              width={400}
              height={600}
              className="w-full max-w-sm h-auto rounded-lg shadow-lg"
              priority
            />

            {/* Overlay hotspots */}
            <div className="absolute inset-0">
              {getCurrentHotspots().map((hotspot) => (
                <button
                  key={hotspot.id}
                  className="absolute transition-all duration-200 bg-transparent border-none hover:bg-transparent focus:outline-none cursor-pointer"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    width: `${hotspot.width}%`,
                    height: `${hotspot.height}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleMuscleClick(hotspot.muscleKey)}
                  onMouseEnter={() => setHoveredMuscle(hotspot.muscleKey)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  aria-label={`Select ${muscleData[hotspot.muscleKey]?.name}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Exercise Information Panel */}
        {selectedMuscle && (
          <div className="card-clean rounded-xl p-6 max-w-md animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold gradient-text-primary">
                {muscleData[selectedMuscle].name}
              </h3>
              <button
                onClick={() => setSelectedMuscle(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
              >
                ×
              </button>
            </div>

            <p className="text-secondary-custom mb-6 text-sm leading-relaxed">
              {muscleData[selectedMuscle].description}
            </p>

            <div className="mb-6">
              <h4 className="font-semibold text-primary-custom mb-3 section-border">Recommended Exercises</h4>
              <ul className="space-y-2">
                {muscleData[selectedMuscle].exercises.map((exercise, index) => (
                  <li key={index} className="text-sm text-secondary-custom flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                    {exercise}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full btn-primary rounded-lg">
              Start Workout Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}