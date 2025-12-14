import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import CalendarView from './components/CalendarView';
import WorkoutDay from './components/WorkoutDay';
import ActiveWorkout from './components/ActiveWorkout';
import LandingPage from './components/LandingPage';
import Nutrition from './components/Nutrition';
import { generatePlan } from './data/exercises';
import { Home, Utensils, Calendar as CalendarIcon } from 'lucide-react';

const App = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('workout'); // 'workout' | 'nutrition' | 'calendar'
  const [showLanding, setShowLanding] = useState(true);
  const [plan, setPlan] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isActiveWorkout, setIsActiveWorkout] = useState(false);

  // Load profile on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('fitness_user_profile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setUserProfile(parsedProfile);
      setShowLanding(false);

      // Generate plan on load if we have profile
      const generatedPlan = generatePlan(parsedProfile);
      setPlan(generatedPlan);
    }
  }, []);

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('fitness_user_profile', JSON.stringify(profile));

    const generatedPlan = generatePlan(profile);
    setPlan(generatedPlan);
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleStartWorkout = () => {
    setIsActiveWorkout(true);
  };

  const handleCloseWorkout = () => {
    setIsActiveWorkout(false);
  };

  // Logic to handle "Back" in WorkoutDay if it was triggered from Calendar
  // But if 'workout' is a main tab, maybe Back just does nothing or resets to Today?
  // Let's make Back reset to Today if we are not on Today, or just hide it.
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const handleBackToToday = () => {
    setSelectedDate(new Date());
  };

  const handleCalendarSelect = (date) => {
    setSelectedDate(date);
    setActiveTab('workout');
  };

  // --- RENDER FLOW ---

  // 1. Landing Page
  if (showLanding && !userProfile) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // 2. Onboarding
  if (!userProfile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // 3. Active Workout Overlay (Full Screen)
  if (isActiveWorkout) {
    const dateString = selectedDate.toISOString().split('T')[0];
    const exercises = plan[dateString] || [];
    return <ActiveWorkout exercises={exercises} onClose={handleCloseWorkout} />;
  }

  // 4. Main App Tabs
  return (
    <div className="app-wrapper" style={{ paddingBottom: '80px', minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Header - Simple User Profile */}
      <div style={{ padding: '2rem 1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E2E8F0', overflow: 'hidden' }}>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`} alt="avatar" />
          </div>
          <div>
            <div className="text-sm text-gray-500">Vitaj späť,</div>
            <div className="text-xl font-bold">{userProfile.name}</div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <main>
        {activeTab === 'workout' && (
          <WorkoutDay
            date={selectedDate}
            exercises={plan[selectedDate.toISOString().split('T')[0]] || []}
            onStart={handleStartWorkout}
            onBack={!isToday(selectedDate) ? handleBackToToday : undefined}
          />
        )}

        {activeTab === 'nutrition' && (
          <Nutrition />
        )}

        {activeTab === 'calendar' && (
          <div style={{ padding: '1.5rem' }}>
            <h2 className="text-2xl font-bold mb-4">Môj Plán</h2>
            <CalendarView
              plan={plan}
              userProfile={userProfile}
              onSelectDay={handleCalendarSelect}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid #E2E8F0',
        padding: '1rem', paddingBottom: '2rem',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        zIndex: 40, boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.05)'
      }}>
        <button onClick={() => setActiveTab('workout')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'workout' ? '#0F172A' : '#94A3B8' }}>
          <Home size={24} strokeWidth={activeTab === 'workout' ? 2.5 : 2} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Tréningy</span>
        </button>
        <button onClick={() => setActiveTab('nutrition')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'nutrition' ? '#0F172A' : '#94A3B8' }}>
          <Utensils size={24} strokeWidth={activeTab === 'nutrition' ? 2.5 : 2} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Jedlo</span>
        </button>
        <button onClick={() => setActiveTab('calendar')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'calendar' ? '#0F172A' : '#94A3B8' }}>
          <CalendarIcon size={24} strokeWidth={activeTab === 'calendar' ? 2.5 : 2} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Plán</span>
        </button>
      </div>
    </div>
  );
};

export default App;
