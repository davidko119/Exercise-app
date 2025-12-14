import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, Music, List } from 'lucide-react';
import ExerciseModel from './ExerciseModel';
import CircularTimer from './CircularTimer';

const ActiveWorkout = ({ exercises, onClose }) => {
    // Determine the very first state. If first item is exercise, we start with PREP.
    // If first item is rest (unlikely), we start with REST.
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState('prep'); // 'prep' | 'active' | 'rest'
    const [timeLeft, setTimeLeft] = useState(10); // Start with 10s prep
    const [isPaused, setIsPaused] = useState(false);

    const currentItem = exercises[currentIndex];
    const totalExercises = exercises.length;
    const isRestItem = currentItem.type === 'rest';

    // Correction: If the current item in the list is a REST item, we refer to it as 'rest' phase.
    // If it is an EXERCISE item, we have two phases: 'prep' -> 'active'.

    // Sync phase with item type on index change is tricky because we have internal phases.
    // Better strategy:
    // We treat the "Rest" items in the array as the REST phase.
    // We treat the "Exercise" items as having an initial PREP phase, then ACTIVE.

    // Effect to handle timer
    useEffect(() => {
        let interval;
        if (!isPaused && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimerComplete();
        }
        return () => clearInterval(interval);
    }, [isPaused, timeLeft]);

    const handleTimerComplete = () => {
        if (isRestItem) {
            // Rest finished -> Go to next item (which should be an exercise)
            goToNextStep();
        } else {
            // It's an exercise
            if (phase === 'prep') {
                // Prep finished -> Start Active
                setPhase('active');
                setTimeLeft(currentItem.duration || 30);
                speak(`Start ${currentItem.name}`);
            } else {
                // Active finished -> Go to next step
                goToNextStep();
            }
        }
    };

    const goToNextStep = () => {
        if (currentIndex < totalExercises - 1) {
            const nextIndex = currentIndex + 1;
            const nextItem = exercises[nextIndex];
            setCurrentIndex(nextIndex);

            if (nextItem.type === 'rest') {
                setPhase('rest');
                setTimeLeft(nextItem.duration || 30);
                speak('Rest');
            } else {
                // Next is exercise, start with Prep
                setPhase('prep');
                setTimeLeft(10); // Standard 10s prep
                speak(`Get ready for ${nextItem.name}`);
            }
        } else {
            speak("Workout Complete");
            onClose();
        }
    };

    const manualSkip = () => {
        handleTimerComplete();
    };

    // --- Voice Coach ---
    const speak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    // --- Format helper ---
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // --- RENDER HELPERS ---

    // 1. REST VIEW
    if (isRestItem) {
        const nextExercise = exercises[currentIndex + 1];
        return (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 50,
                background: 'linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 100%)', // Light blue gradient
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
                {/* Header */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={onClose} className="icon-btn"><X size={24} color="#1E293B" /></button>
                    <div style={{ color: '#64748B', fontWeight: 600 }}>
                        {/* Optional total time or clock */}
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex-center" style={{ gap: '0.5rem' }}>
                        <button className="icon-btn"><Music size={20} color="#1E293B" /></button>
                    </div>
                </div>

                {/* Central Circle */}
                <div style={{ textAlign: 'center' }}>
                    <CircularTimer duration={currentItem.duration} timeLeft={timeLeft} size={280} strokeWidth={16} color="#1E293B" />
                    <h2 style={{ marginTop: '1rem', fontSize: '1.5rem', fontWeight: 700, color: '#1E293B' }}>Prestavka</h2>
                </div>

                {/* Next Exercise Preview (Bottom Right) */}
                {nextExercise && (
                    <div style={{
                        position: 'absolute', bottom: '2rem', right: '2rem',
                        background: 'white', padding: '1rem', borderRadius: '16px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                        display: 'flex', gap: '1rem', alignItems: 'center', maxWidth: '300px'
                    }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Nasleduje</div>
                            <div style={{ fontWeight: 700, color: '#0F172A' }}>{nextExercise.name}</div>
                        </div>
                        <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#F1F5F9' }}>
                            <img src={nextExercise.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                )}

                {/* Skip Rest button (Bottom Right - overlays card slightly or next to it?) 
                    Actually standard UI usually lets you tap screen or a specific button. 
                    Let's add a Skip button to the left or just rely on the card being clickable? 
                    Let's add a clear Skip button.
                */}
                <button onClick={manualSkip} style={{
                    position: 'absolute', bottom: '2rem', left: '2rem',
                    background: '#F1F5F9', color: '#0F172A', padding: '1rem 2rem', borderRadius: '9999px', fontWeight: 600
                }}>
                    Preskočiť
                </button>
            </div>
        );
    }

    // 2. PREP & ACTIVE VIEW (Both show the exercise image)
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'white' }}>

            {/* Top Progress Bar - Added as per request to show progress */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 60,
                padding: '8px 16px', display: 'flex', gap: '4px'
            }}>
                {exercises.map((ex, idx) => {
                    // Determine state of this segment
                    let bg = '#E2E8F0'; // Future: Grey
                    if (idx < currentIndex) bg = '#1E293B'; // Completed: Dark
                    if (idx === currentIndex) bg = '#3B82F6'; // Current: Blue

                    // If it's a rest step, maybe make it thinner or different color? 
                    // For now, keep uniform or maybe hidden if too many? User asked for bar.
                    // Let's stick to standard bars.

                    return (
                        <div key={idx} style={{
                            flex: 1,
                            height: '4px',
                            borderRadius: '2px',
                            background: bg,
                            transition: 'background 0.3s'
                        }} />
                    );
                })}
            </div>

            {/* Background Image */}
            <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, paddingBottom: '100px' }}>
                <ExerciseModel exerciseType={currentItem.name} images={currentItem.images} />
            </div>

            {/* PREP OVERLAY */}
            {phase === 'prep' && (
                <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(5px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Pripravte sa</h1>
                    {/* Simple Spinner / Countdown */}
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 700 }}>
                        {timeLeft}
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <span style={{ fontSize: '1.25rem', color: '#334155', fontWeight: 600 }}>{currentItem.name}</span>
                    </div>
                </div>
            )}

            {/* HUD (Only visible in ACTIVE phase mostly, or dim in Prep) */}
            {phase === 'active' && (
                <>
                    {/* Top Bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.1)', padding: '0.75rem', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                            <X size={24} color="#0F172A" />
                        </button>
                    </div>

                    {/* Bottom Left: Timer & Info */}
                    <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                        <div style={{ fontSize: '4rem', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>
                            {timeLeft}<span style={{ fontSize: '1.5rem', fontWeight: 600 }}>s</span>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>
                            {currentItem.name}
                        </div>
                        <button style={{ marginTop: '0.5rem', background: 'none', border: 'none', padding: 0 }}>
                            <span style={{ background: '#F1F5F9', padding: '4px 12px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, color: '#64748B' }}>
                                Info <i style={{ fontStyle: 'normal' }}>i</i>
                            </span>
                        </button>
                    </div>

                    {/* Bottom Right: Controls */}
                    <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem' }}>
                        <button onClick={manualSkip} style={{
                            width: '64px', height: '64px', borderRadius: '50%', background: '#F1F5F9',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                            <SkipForward size={28} fill="#0F172A" color="#0F172A" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ActiveWorkout;
