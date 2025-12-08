export const EXERCISES = [
  {
    id: 'pushups',
    name: 'Push Up',
    type: 'strength',
    muscleGroup: 'Chest',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&h=150&fit=crop',
    images: [
      { label: 'Side View', url: '/exercises/pushups_side.png' },
      { label: 'Front View', url: '/exercises/pushups_front.png' }
    ],
    calories: 50
  },
  {
    id: 'squats',
    name: 'Squats',
    type: 'strength',
    muscleGroup: 'Legs',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?w=150&h=150&fit=crop',
    images: [
      { label: 'Side View', url: '/exercises/squats_side.png' },
      { label: 'Front View', url: '/exercises/squats_front.png' }
    ],
    calories: 60
  },
  {
    id: 'lunges',
    name: 'Lunges',
    type: 'strength',
    muscleGroup: 'Legs',
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1574680178051-55c129b2796d?w=150&h=150&fit=crop',
    images: [
      { label: 'Side View', url: '/exercises/lunges_side.png' },
      { label: 'Front View', url: '/exercises/lunges_front.png' }
    ],
    calories: 55
  },
  {
    id: 'plank',
    name: 'Plank',
    type: 'core',
    muscleGroup: 'Abs',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=150&h=150&fit=crop',
    images: [
      { label: 'Side View', url: '/exercises/plank_side.png' },
      { label: 'Front View', url: '/exercises/plank_front.png' }
    ],
    calories: 30
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    type: 'cardio',
    muscleGroup: 'Full Body',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=150&h=150&fit=crop',
    images: [
      { label: 'Side View', url: '/exercises/jumping_jacks_side.png' },
      { label: 'Front View', url: '/exercises/jumping_jacks_front.png' }
    ],
    calories: 80
  },
  {
    id: 'burpees',
    name: 'Burpees',
    type: 'cardio',
    muscleGroup: 'Full Body',
    difficulty: 'advanced',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=150&h=150&fit=crop',
    images: [
      { label: 'Side View', url: '/exercises/burpees_side.png' },
      { label: 'Front View', url: '/exercises/burpees_front.png' }
    ],
    calories: 100
  },
  {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    type: 'strength',
    muscleGroup: 'Arms',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=150&h=150&fit=crop',
    images: [
      { label: 'Side View', url: '/exercises/bicep_curl_side.png' },
      { label: 'Front View', url: '/exercises/bicep_curl_front.png' }
    ],
    calories: 40
  },
  {
    id: 'shoulder-press',
    name: 'Shoulder Press',
    type: 'strength',
    muscleGroup: 'Shoulders',
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=150&h=150&fit=crop',
    images: [
      { label: 'Side View', url: '/exercises/shoulder_press_side.png' },
      { label: 'Front View', url: '/exercises/shoulder_press_front.png' }
    ],
    calories: 50
  }
];

export const generatePlan = (profile) => {
  const { weight, height, activityLevel, workoutDays } = profile;
  // workoutDays is an array of day indices (0=Sunday, 1=Monday, etc.)

  const plan = {};
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();

    if (workoutDays.includes(dayOfWeek)) {
      // Generate workout for this day
      const dailyExercises = [];
      const numExercises = activityLevel === 'beginner' ? 3 : activityLevel === 'intermediate' ? 5 : 7;

      // Simple logic: Randomly select exercises for now, or rotate muscle groups
      // For a better planner, we'd rotate: Upper, Lower, Full Body
      const shuffled = [...EXERCISES].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, numExercises);

      selected.forEach(ex => {
        dailyExercises.push({
          ...ex,
          sets: activityLevel === 'beginner' ? 3 : 4,
          reps: ex.type === 'strength' ? (activityLevel === 'beginner' ? '10-12' : '8-10') : '30s',
          weight: ex.type === 'strength' ? (profile.gender === 'male' ? '10kg' : '5kg') : null // Placeholder logic
        });
      });

      const dateString = date.toISOString().split('T')[0];
      plan[dateString] = dailyExercises;
    }
  }

  return plan;
};
