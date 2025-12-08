import React from 'react';
import { ChevronLeft, ChevronRight, Dumbbell } from 'lucide-react';

const CalendarView = ({ plan, onSelectDay, userProfile }) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = [];
    // Fill empty slots for previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    // Fill days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const getWorkoutForDay = (day) => {
        if (!day) return null;
        const dateString = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
        return plan[dateString];
    };

    return (
        <div className="container" style={{ padding: '1.5rem' }}>
            <header className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <p className="text-sm">Welcome back 👋</p>
                    <h1 className="text-2xl">Fitness Planner</h1>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E5E7EB', overflow: 'hidden' }}>
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" width="100%" />
                </div>
            </header>

            {/* Progress Card */}
            <div className="card" style={{ background: 'var(--primary-color)', color: 'white', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                    <div>
                        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem' }}>
                            {userProfile.activityLevel}
                        </span>
                        <h2 className="text-xl" style={{ marginTop: '0.5rem' }}>Your Progress</h2>
                    </div>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>72%</span>
                    </div>
                </div>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>You're doing great! Keep it up.</p>
            </div>

            {/* Calendar */}
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h2 className="text-xl">{monthNames[currentMonth]} {currentYear}</h2>
                <div className="flex-center" style={{ gap: '0.5rem' }}>
                    <button className="icon-btn"><ChevronLeft size={20} /></button>
                    <button className="icon-btn"><ChevronRight size={20} /></button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', marginBottom: '1rem' }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="text-sm" style={{ fontWeight: 600 }}>{d}</div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                {days.map((day, index) => {
                    const workout = getWorkoutForDay(day);
                    const isToday = day === today.getDate();

                    return (
                        <div
                            key={index}
                            onClick={() => day && workout && onSelectDay(new Date(currentYear, currentMonth, day))}
                            style={{
                                aspectRatio: '1/1',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: isToday ? 'var(--primary-color)' : (workout ? 'white' : 'transparent'),
                                color: isToday ? 'white' : 'inherit',
                                cursor: workout ? 'pointer' : 'default',
                                boxShadow: workout ? 'var(--shadow-sm)' : 'none',
                                position: 'relative'
                            }}
                        >
                            {day && (
                                <>
                                    <span style={{ fontSize: '0.9rem', fontWeight: isToday ? 700 : 400 }}>{day}</span>
                                    {workout && !isToday && (
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', marginTop: '4px' }} />
                                    )}
                                    {workout && isToday && (
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', marginTop: '4px' }} />
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
