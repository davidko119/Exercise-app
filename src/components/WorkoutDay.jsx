import React from 'react';
import { ChevronLeft, Clock, Flame } from 'lucide-react';

const ExerciseCard = ({ exercise }) => {
    // Check if it's a rest or recovery item
    const isRest = exercise.name === 'Rest' || exercise.name === 'Recovery';

    return (
        <div className="card flex-between" style={{ padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: isRest ? '#DBEAFE' : '#F3F4F6', // Light blue for Rest
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {isRest ? (
                        <Clock size={24} color="#3B82F6" /> // Icon for Rest
                    ) : (
                        <img src={exercise.image} alt={exercise.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
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
};

const WorkoutDay = ({ date, exercises, onBack, onStart }) => {
    const dateString = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const totalCalories = exercises.reduce((acc, ex) => acc + (ex.calories || 0), 0);
    const duration = exercises.length * 5; // Approx 5 min per exercise

    // Rest Day UI
    if (!exercises || exercises.length === 0) {
        return (
            <div className="container" style={{ padding: '1.5rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <header className="flex-between" style={{ marginBottom: '2rem' }}>
                    <button className="icon-btn" onClick={onBack}>
                        <ChevronLeft size={24} />
                    </button>
                    <h2 className="text-xl">Váš Plán</h2>
                    <div style={{ width: '40px' }} />
                </header>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '-4rem' }}>
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '50%', background: '#F0FDFA',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem',
                        boxShadow: '0 4px 6px -1px rgba(13, 148, 136, 0.1)'
                    }}>
                        <div style={{ fontSize: '4rem' }}>😊</div>
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', textAlign: 'center', marginBottom: '1rem' }}>
                        Dnes oddychuješ!
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: '#64748B', textAlign: 'center', maxWidth: '300px', lineHeight: 1.6 }}>
                        Načerpaj sily na zajtra. Regenerácia je kľúčová pre rast svalov.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '1.5rem' }}>
            <header className="flex-between" style={{ marginBottom: '2rem' }}>
                <button className="icon-btn" onClick={onBack}>
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl">Váš Plán</h2>
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
                <h3 className="text-xl" style={{ marginBottom: '1rem' }}>Cviky ({exercises.length})</h3>
                {exercises.map((ex, i) => (
                    <ExerciseCard key={i} exercise={ex} />
                ))}
            </div>

            <div style={{ position: 'fixed', bottom: '6rem', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 3rem)', maxWidth: '440px', zIndex: 30 }}>
                <button className="btn-primary" onClick={onStart}>
                    Začať cvičiť
                </button>
            </div>
        </div>
    );
};

export default WorkoutDay;
