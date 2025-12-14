export const EXERCISES = [
  {
    id: 'pushups',
    name: 'Push Up',
    type: 'strength',
    muscleGroup: 'Chest',
    difficulty: 'beginner',
    image: '/exercises/pushups_front.png',
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
    image: '/exercises/squats_front.png',
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
    image: '/exercises/lunges_front.png',
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
    image: '/exercises/plank_front.png',
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
    image: '/exercises/jumping_jacks_front.png',
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
    image: '/exercises/burpees_front.png',
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
    image: '/exercises/bicep_curl_front.png',
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
    image: '/exercises/shoulder_press_front.png',
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
      const numExercises = activityLevel === 'beginner' ? 3 : activityLevel === 'intermediate' ? 4 : 5;
      const setsPerExercise = activityLevel === 'beginner' ? 3 : 4;

      // Rotate focus based on day? simplified for now
      const shuffled = [...EXERCISES].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, numExercises);

      selected.forEach(ex => {
        // Add sets
        for (let s = 1; s <= setsPerExercise; s++) {
          dailyExercises.push({
            ...ex,
            set: s,
            totalSets: setsPerExercise,
            duration: ex.type === 'strength' ? 45 : 60, // Longer durations
            reps: ex.type === 'strength' ? '12-15' : '60s',
            weight: ex.type === 'strength' ? (profile.gender === 'male' ? '12kg' : '6kg') : null,
            isRest: false
          });

          // Add rest after set, unless it's the very last thing (handled in ActiveWorkout logic usually, but let's be explicit here or handle it there)
          // Let's handle inter-set rest in the runner to keep data array clean, OR add explicit rest steps. 
          // Explicit rest steps give us control for the "Rest Circle" UI.
          if (s < setsPerExercise) {
            dailyExercises.push({
              type: 'rest',
              name: 'Rest',
              duration: 30, // 30s rest between sets
              isRest: true,
              nextExercise: ex.name
            });
          }
        }

        // Rest between different exercises
        dailyExercises.push({
          type: 'rest',
          name: 'Recovery',
          duration: 60, // 60s rest between exercises
          isRest: true,
          nextExercise: 'Next Exercise'
        });
      });

      // Remove the very last rest
      if (dailyExercises.length > 0 && dailyExercises[dailyExercises.length - 1].isRest) {
        dailyExercises.pop();
      }

      const dateString = date.toISOString().split('T')[0];
      plan[dateString] = dailyExercises;
    }
  }

  return plan;
};
