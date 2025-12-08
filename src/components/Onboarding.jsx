import React, { useState } from 'react';
import { ChevronRight, Activity, Calendar } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        activityLevel: 'beginner',
        workoutDays: []
    });

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else onComplete(formData);
    };

    const toggleDay = (dayIndex) => {
        setFormData(prev => {
            const newDays = prev.workoutDays.includes(dayIndex)
                ? prev.workoutDays.filter(d => d !== dayIndex)
                : [...prev.workoutDays, dayIndex];
            return { ...prev, workoutDays: newDays };
        });
    };

    return (
        <div className="container flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="card animate-fade-in" style={{ width: '100%' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 className="text-2xl" style={{ marginBottom: '0.5rem' }}>Let's get to know you</h1>
                    <p className="text-sm">Step {step} of 3</p>
                    <div style={{ height: '4px', background: '#E5E7EB', borderRadius: '2px', marginTop: '1rem' }}>
                        <div style={{
                            height: '100%',
                            width: `${(step / 3) * 100}%`,
                            background: 'var(--accent-green)',
                            borderRadius: '2px',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>

                {step === 1 && (
                    <div className="animate-fade-in">
                        <h2 className="text-xl" style={{ marginBottom: '1.5rem' }}>Basic Info</h2>
                        <div style={{ marginBottom: '1rem' }}>
                            <label className="text-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>Weight (kg)</label>
                            <input
                                type="number"
                                placeholder="e.g. 70"
                                value={formData.weight}
                                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                autoFocus
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label className="text-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>Height (cm)</label>
                            <input
                                type="number"
                                placeholder="e.g. 175"
                                value={formData.height}
                                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in">
                        <h2 className="text-xl" style={{ marginBottom: '1.5rem' }}>Activity Level</h2>
                        {['beginner', 'intermediate', 'advanced'].map((level) => (
                            <div
                                key={level}
                                onClick={() => setFormData({ ...formData, activityLevel: level })}
                                style={{
                                    padding: '1rem',
                                    border: `2px solid ${formData.activityLevel === level ? 'var(--accent-green)' : '#E5E7EB'}`,
                                    borderRadius: 'var(--border-radius-md)',
                                    marginBottom: '1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{
                                    background: formData.activityLevel === level ? 'var(--accent-green)' : '#F3F4F6',
                                    padding: '0.5rem',
                                    borderRadius: '50%'
                                }}>
                                    <Activity size={20} color={formData.activityLevel === level ? 'white' : '#6B7280'} />
                                </div>
                                <div style={{ textTransform: 'capitalize', fontWeight: 600 }}>{level}</div>
                            </div>
                        ))}
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in">
                        <h2 className="text-xl" style={{ marginBottom: '1.5rem' }}>Weekly Schedule</h2>
                        <p className="text-sm" style={{ marginBottom: '1rem' }}>Select the days you want to workout</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                                <button
                                    key={day}
                                    onClick={() => toggleDay(index)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: 'var(--border-radius-sm)',
                                        background: formData.workoutDays.includes(index) ? 'var(--primary-color)' : '#F3F4F6',
                                        color: formData.workoutDays.includes(index) ? 'white' : 'var(--text-primary)',
                                        fontWeight: 600,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    className="btn-primary"
                    style={{ marginTop: '2rem' }}
                    onClick={handleNext}
                    disabled={step === 1 && (!formData.weight || !formData.height)}
                >
                    {step === 3 ? 'Create Plan' : 'Continue'} <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
