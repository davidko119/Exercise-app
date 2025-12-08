import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, Music, List } from 'lucide-react';
import VectorBody from './VectorBody';

const ActiveWorkout = ({ exercises, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30); // Default 30s per exercise
    const [isResting, setIsResting] = useState(false);

    const currentExercise = exercises[currentIndex];
    const totalExercises = exercises.length;

    useEffect(() => {
        let interval;
        if (!isPaused && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleNext();
        }
        return () => clearInterval(interval);
    }, [isPaused, timeLeft]);

    const handleNext = () => {
        if (currentIndex < totalExercises - 1) {
            if (!isResting) {
                setIsResting(true);
                setTimeLeft(10); // 10s rest
            } else {
                setIsResting(false);
                setCurrentIndex((prev) => prev + 1);
                setTimeLeft(30); // Reset timer for next exercise
            }
        } else {
            // Workout Complete
            onClose();
        }
    };

    const togglePause = () => setIsPaused(!isPaused);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="container" style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '100vh',
            zIndex: 50,
            background: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <header className="flex-between" style={{ padding: '1.5rem' }}>
                <button className="icon-btn" onClick={onClose}>
                    <X size={24} />
                </button>
                <div className="text-xl" style={{ color: '#6B7280' }}>
                    {formatTime(timeLeft)}
                </div>
                <div className="flex-center" style={{ gap: '0.5rem' }}>
                    <button className="icon-btn"><Music size={20} /></button>
                    <button className="icon-btn"><List size={20} /></button>
                </div>
            </header>

            {/* Progress Bar */}
            <div style={{ display: 'flex', gap: '4px', padding: '0 1.5rem', marginBottom: '1rem' }}>
                {exercises.map((_, idx) => (
                    <div
                        key={idx}
                        style={{
                            height: '4px',
                            flex: 1,
                            background: idx <= currentIndex ? 'var(--primary-color)' : '#E5E7EB',
                            borderRadius: '2px'
                        }}
                    />
                ))}
            </div>

            {/* 2D Model View */}
            <div style={{ padding: '0 1.5rem', marginBottom: '1rem', flex: 1, display: 'flex', justifyContent: 'center' }}>
                <VectorBody
                    exerciseType={isResting ? 'idle' : currentExercise.id}
                    muscleGroup={isResting ? null : currentExercise.muscleGroup}
                />
            </div>

            {/* Exercise Info */}
            <div style={{
                background: 'white',
                borderTopLeftRadius: '32px',
                borderTopRightRadius: '32px',
                padding: '2rem',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
                marginTop: 'auto'
            }}>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                    <h1 className="text-2xl" style={{ fontSize: '2rem' }}>
                        {isResting ? 'Rest' : timeLeft + 's'}
                    </h1>
                    {!isResting && (
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: '#F3F4F6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <button onClick={handleNext} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <SkipForward size={24} color="var(--text-primary)" />
                            </button>
                        </div>
                    )}
                </div>

                <h2 className="text-xl" style={{ marginBottom: '0.5rem' }}>
                    {isResting ? `Next: ${exercises[currentIndex + 1]?.name}` : currentExercise.name}
                </h2>

                {!isResting && (
                    <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '2rem' }}>
                        <span className="text-sm" style={{ background: '#F3F4F6', padding: '4px 12px', borderRadius: '12px' }}>
                            {currentExercise.muscleGroup}
                        </span>
                        <span className="text-sm" style={{ background: '#F3F4F6', padding: '4px 12px', borderRadius: '12px' }}>
                            {currentExercise.difficulty}
                        </span>
                    </div>
                )}

                <button
                    className="btn-primary"
                    onClick={togglePause}
                    style={{ height: '56px', fontSize: '1.1rem' }}
                >
                    {isPaused ? <Play size={24} /> : <Pause size={24} />}
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
            </div>
        </div>
    );
};

export default ActiveWorkout;
