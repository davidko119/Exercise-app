import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import CalendarView from './components/CalendarView';
import WorkoutDay from './components/WorkoutDay';
import ActiveWorkout from './components/ActiveWorkout';
import LandingPage from './components/LandingPage';
import { generatePlan } from './data/exercises';

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [plan, setPlan] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isActiveWorkout, setIsActiveWorkout] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // Check local storage for existing profile
    const savedProfile = localStorage.getItem('fitness_user_profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      const generatedPlan = generatePlan(profile);
      setPlan(generatedPlan);
      setShowLanding(false); // Skip landing if user exists
    }
  }, []);

  const handleOnboardingComplete = (data) => {
    setUserProfile(data);
    localStorage.setItem('fitness_user_profile', JSON.stringify(data));
    const generatedPlan = generatePlan(data);
    setPlan(generatedPlan);
  };

  const handleDaySelect = (date) => {
    setSelectedDate(date);
  };

  const handleBackToCalendar = () => {
    setSelectedDate(null);
  };

  const handleStartWorkout = () => {
    setIsActiveWorkout(true);
  };

  const handleCloseWorkout = () => {
    setIsActiveWorkout(false);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (showLanding && !userProfile) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (!userProfile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (isActiveWorkout && selectedDate) {
    const dateString = selectedDate.toISOString().split('T')[0];
    const exercises = plan[dateString] || [];
    return (
      <ActiveWorkout
        exercises={exercises}
        onClose={handleCloseWorkout}
      />
    );
  }

  if (selectedDate) {
    const dateString = selectedDate.toISOString().split('T')[0];
    const exercises = plan[dateString] || [];
    return (
      <WorkoutDay
        date={selectedDate}
        exercises={exercises}
        onBack={handleBackToCalendar}
        onStart={handleStartWorkout}
      />
    );
  }

  return (
    <CalendarView
      plan={plan}
      onSelectDay={handleDaySelect}
      userProfile={userProfile}
    />
  );
}

export default App;
