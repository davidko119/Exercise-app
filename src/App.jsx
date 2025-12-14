import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import CalendarView from './components/CalendarView';
import WorkoutDay from './components/WorkoutDay';
import ActiveWorkout from './components/ActiveWorkout';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Nutrition from './components/Nutrition';
import Login from './components/Login';
import Signup from './components/Signup';
import { generatePlan } from './data/exercises';
import { Home, Utensils, Calendar as CalendarIcon } from 'lucide-react';

const App = () => {
  const [userProfile, setUserProfile] = useState(null);

  // Views: 'landing' | 'login' | 'signup' | 'onboarding' | 'app'
  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [plan, setPlan] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isActiveWorkout, setIsActiveWorkout] = useState(false);

  // Load profile on mount but DO NOT automatically switch view if we want to show landing
  // User asked for "Landing page back". 
  // Maybe we check if profile exists, if so, we can let them login easily or just verify persistence.
  useEffect(() => {
    const savedProfile = localStorage.getItem('fitness_user_profile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setUserProfile(parsedProfile);
      const generatedPlan = generatePlan(parsedProfile);
      setPlan(generatedPlan);

      // If we want to auto-login, we would set view to 'app'. 
      // But user requested Landing Page to stay. 
      // So we do NOT set view to 'app' here.
      // setView('app'); 

      // Optionally, we could set it to 'login' if we wanted, but 'landing' is safer.
    }
    // If not, view remains 'landing'
  }, []);

  // --- Auth Handlers ---

  const handleLandingLogin = () => setView('login');
  const handleLandingSignup = () => setView('signup'); // "Get Started" triggers this

  const handleLoginSuccess = (profile) => {
    setUserProfile(profile);
    const generatedPlan = generatePlan(profile);
    setPlan(generatedPlan);
    setView('app');
    localStorage.setItem('fitness_user_profile', JSON.stringify(profile));
  };

  const handleSignupSuccess = (partialProfile) => {
    // User signed up with name/email/pass. 
    // Now they might need onboarding for stats?
    // Or we assume defaults? 
    // Let's go to Onboarding, pre-filling identity if possible, or just passing it.
    // We'll treat this partial profile as the current profile and save it, 
    // then let Onboarding logic handle the rest (stats).
    // If Onboarding expects a null profile to start, we might need to adjust.
    // Current Onboarding creates a fresh profile. 
    // Let's pass the signup data to Onboarding?
    // For simplicity: Save partial profile, set view to 'onboarding' (which checks if userProfile is full? No onBoarding creates it).
    // Let's modify Onboarding to take initial data? 
    // OR: Just go to 'onboarding' view, and pass the data.

    // We will perform a merge in handleOnboardingComplete
    setUserProfile(partialProfile);
    setView('onboarding');
  };

  const handleOnboardingComplete = (fullProfile) => {
    // Merge with existing identity if needed, currently Onboarding returns full object
    // We should ensure we keep the email/pass from signup if Onboarding doesn't ask for it.
    // (Original Onboarding didn't ask for Email/Pass, just Name/Gender/Stats).
    // So we need to merge.

    const finalProfile = { ...userProfile, ...fullProfile };

    setUserProfile(finalProfile);
    localStorage.setItem('fitness_user_profile', JSON.stringify(finalProfile));

    const generatedPlan = generatePlan(finalProfile);
    setPlan(generatedPlan);
    setView('app');
  };

  // --- App Logic ---

  const handleStartWorkout = () => setIsActiveWorkout(true);
  const handleCloseWorkout = () => setIsActiveWorkout(false);

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const handleBackToToday = () => setSelectedDate(new Date());

  const handleCalendarSelect = (date) => {
    setSelectedDate(date);
    // If we are on dashboard, staying on dashboard allows checking any day's plan there.
    // If we were on calendar view, maybe we want to go to dashboard to see detailed plan?
    if (activeTab === 'calendar') setActiveTab('dashboard');
  };

  // --- RENDER ---

  if (view === 'landing') {
    return (
      <LandingPage
        onGetStarted={handleLandingSignup}
        onLogin={handleLandingLogin}
      />
    );
  }

  if (view === 'login') {
    return (
      <Login
        onLogin={handleLoginSuccess}
        onBack={() => setView('landing')}
        onGoToSignup={() => setView('signup')}
      />
    );
  }

  if (view === 'signup') {
    return (
      <Signup
        onSignup={handleSignupSuccess}
        onBack={() => setView('landing')}
        onGoToLogin={() => setView('login')}
      />
    );
  }

  if (view === 'onboarding') {
    return (
      <Onboarding
        onComplete={handleOnboardingComplete}
        initialData={userProfile}
      />
    );
  }

  // Active Workout Overlay
  if (isActiveWorkout) {
    const dateString = selectedDate.toISOString().split('T')[0];
    const exercises = plan[dateString] || [];
    return <ActiveWorkout exercises={exercises} onClose={handleCloseWorkout} />;
  }

  // Main App
  return (
    <div className="app-wrapper" style={{ paddingBottom: '80px', minHeight: '100vh', background: '#F8FAFC' }}>

      {/* Content */}
      <main>
        {activeTab === 'dashboard' && (
          <Dashboard
            userProfile={userProfile}
            plan={plan}
            selectedDate={selectedDate}
            onSelectDate={handleCalendarSelect}
            onStartWorkout={handleStartWorkout}
            onNavigateToNutrition={() => setActiveTab('nutrition')}
          />
        )}

        {activeTab === 'workout' && (
          <WorkoutDay
            date={selectedDate}
            exercises={plan[selectedDate.toISOString().split('T')[0]] || []}
            onStart={handleStartWorkout}
            onBack={!isToday(selectedDate) ? handleBackToToday : undefined}
          />
        )}

        {activeTab === 'nutrition' && <Nutrition />}

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

      {/* Nav */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid #E2E8F0',
        padding: '1rem', paddingBottom: '2rem',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        zIndex: 40, boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.05)'
      }}>
        <button onClick={() => setActiveTab('dashboard')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: (activeTab === 'dashboard' || activeTab === 'workout') ? '#0F172A' : '#94A3B8' }}>
          <Home size={24} strokeWidth={(activeTab === 'dashboard' || activeTab === 'workout') ? 2.5 : 2} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Domov</span>
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
