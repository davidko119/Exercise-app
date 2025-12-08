import React from 'react';
import { ChevronLeft, Clock, Flame } from 'lucide-react';

const ExerciseCard = ({ exercise }) => (
    <div className="card flex-between" style={{ padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#F3F4F6'
            }}>
                <img src={exercise.image} alt={exercise.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
                <h3 style={{ fontWeight: 600, fontSize: '1rem' }}>{exercise.name}</h3>
                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginTop: '0.25rem' }}>
                    <span className="text-xs flex-center" style={{ gap: '4px' }}>
                        <Clock size={12} /> {exercise.reps}
                    </span>
                    {exercise.weight && (
                        <span className="text-xs flex-center" style={{ gap: '4px', background: '#F3F4F6', padding: '2px 6px', borderRadius: '4px' }}>
                            {exercise.weight}
                        </span>
                    )}
                </div>
            </div>
        </div>
        <div style={{ textAlign: 'right' }}>
            <span className="text-xs" style={{ display: 'block', marginBottom: '4px' }}>{exercise.sets} sets</span>
            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            </div>
        </div>
    </div>
);

const WorkoutDay = ({ date, exercises, onBack, onStart }) => {
    const dateString = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const totalCalories = exercises.reduce((acc, ex) => acc + (ex.calories || 0), 0);
    const duration = exercises.length * 5; // Approx 5 min per exercise

    return (
        <div className="container" style={{ padding: '1.5rem' }}>
            <header className="flex-between" style={{ marginBottom: '2rem' }}>
                <button className="icon-btn" onClick={onBack}>
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl">Workout Plan</h2>
                <div style={{ width: '40px' }} /> {/* Spacer */}
            </header>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 className="text-2xl" style={{ marginBottom: '0.5rem' }}>{dateString}</h1>
                <div className="flex-center" style={{ gap: '1.5rem' }}>
                    <div className="flex-center" style={{ gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
                        <Clock size={16} color="var(--accent-orange)" />
                        <span className="text-sm" style={{ fontWeight: 600 }}>{duration} min</span>
                    </div>
                    <div className="flex-center" style={{ gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
                        <Flame size={16} color="var(--accent-green)" />
                        <span className="text-sm" style={{ fontWeight: 600 }}>{totalCalories} kcal</span>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '6rem' }}>
                <h3 className="text-xl" style={{ marginBottom: '1rem' }}>Exercises ({exercises.length})</h3>
                {exercises.map((ex, i) => (
                    <ExerciseCard key={i} exercise={ex} />
                ))}
            </div>

            <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 3rem)', maxWidth: '440px' }}>
                <button className="btn-primary" onClick={onStart}>
                    Start Workout
                </button>
            </div>
        </div>
    );
};

export default WorkoutDay;
