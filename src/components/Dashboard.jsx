import React from 'react';
import { Flame, Clock, Trophy, ChevronRight, Activity, Calendar, Utensils, Play, Plus, Dumbbell } from 'lucide-react';

const ExerciseCard = ({ exercise }) => {
    const isRest = exercise.name === 'Rest' || exercise.name === 'Recovery';

    return (
        <div className="card" style={{
            padding: '1rem', marginBottom: '1rem',
            background: 'white', borderRadius: '12px',
            border: '1px solid #F1F5F9', // More subtle border
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                    width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden',
                    background: isRest ? '#EFF6FF' : '#F8FAFC', // Restore subtle colors
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {isRest ? (
                        <Clock size={24} color="#3B82F6" /> // Blue for Rest
                    ) : (
                        <img src={exercise.image} alt={exercise.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> // Full color image
                    )}
                </div>
                <div>
                    <h3 style={{ fontWeight: 700, fontSize: '0.925rem', color: '#0F172A' }}>{exercise.name}</h3>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} /> {exercise.reps || '0'}
                        </span>
                        {exercise.weight && (
                            <span style={{ fontSize: '0.75rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', color: '#475569' }}>
                                {exercise.weight}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ color: '#CBD5E1' }}>
                <ChevronRight size={20} />
            </div>
        </div>
    );
};

const Dashboard = ({ userProfile, plan, selectedDate, onSelectDate, onStartWorkout, onNavigateToNutrition }) => {
    // 1. Weekly Strip Logic
    const getWeekDays = () => {
        const curr = new Date();
        const day = curr.getDay();
        const diff = curr.getDate() - day + (day == 0 ? -6 : 1);
        const monday = new Date(curr.setDate(diff));
        const week = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            week.push(d);
        }
        return week;
    };

    const weekDays = getWeekDays();
    const today = new Date();

    // 2. Stats Data (Mock)
    const weeklyData = [
        { day: 'Po', val: 40 }, { day: 'Ut', val: 65 }, { day: 'St', val: 30 },
        { day: 'Št', val: 80 }, { day: 'Pi', val: 50 }, { day: 'So', val: 20 }, { day: 'Ne', val: 45 },
    ];
    const maxVal = Math.max(...weeklyData.map(d => d.val));

    // 3. Today's Plan
    const dateKey = selectedDate.toISOString().split('T')[0];
    const todaysExercises = plan[dateKey] || [];
    const isRestDay = todaysExercises.length === 0;
    const isTodaySelected = selectedDate.getDate() === today.getDate() && selectedDate.getMonth() === today.getMonth();

    return (
        <div className="dashboard-wrapper" style={{ minHeight: '100vh', background: '#FAFAFA', color: '#0F172A' }}>
            <style>{`
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1.5rem;
                    padding-bottom: 7rem;
                }
                
                @media (min-width: 1024px) {
                    .dashboard-grid {
                        grid-template-columns: 350px 1fr;
                        padding: 3rem;
                        align-items: start;
                    }
                }

                .bw-card {
                    background: white;
                    border: 1px solid #F1F5F9;
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); /* Softer shadow */
                }

                .nav-week-item:hover {
                    background: #F8FAFC;
                    border-radius: 8px;
                }
            `}</style>

            <div className="dashboard-grid">
                {/* Left Column: Profile, Calendar, Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Header */}
                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Vitaj späť</h2>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em' }}>{userProfile?.name || 'User'}</h1>
                        </div>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '50%', background: '#F1F5F9', overflow: 'hidden',
                            border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.name}`} alt="avatar" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </header>

                    {/* Weekly Calendar Strip */}
                    <div className="bw-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {weekDays.map((d, i) => {
                                const isSelected = d.getDate() === selectedDate.getDate() && d.getMonth() === selectedDate.getMonth();
                                const isTodayVal = d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
                                const dayName = d.toLocaleDateString('sk-SK', { weekday: 'narrow' });

                                return (
                                    <div
                                        key={i}
                                        className="nav-week-item"
                                        onClick={() => onSelectDate(d)}
                                        style={{
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                                            cursor: 'pointer', padding: '4px', flex: 1
                                        }}
                                    >
                                        <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>{dayName}</span>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            background: isSelected ? 'var(--primary-color)' : (isTodayVal ? '#E2E8F0' : 'transparent'), // Restore Primary Color
                                            color: isSelected ? 'white' : '#0F172A',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: 700, fontSize: '0.875rem',
                                            border: isTodayVal ? 'none' : 'none'
                                        }}>
                                            {d.getDate()}
                                        </div>
                                        {/* Dot for workout - Green */}
                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: plan[d.toISOString().split('T')[0]]?.length ? '#10B981' : 'transparent', opacity: 1 }} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Monthly Activity Stats - Dark Theme with Color Accents */}
                    <div className="bw-card" style={{ background: '#1E293B', color: 'white', border: 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Týždenná aktivita</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>4h 30m</div>
                            </div>
                            <Activity color="#4ADE80" size={24} /> {/* Green Activity Icon */}
                        </div>
                        {/* Bar Chart */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '60px', gap: '8px' }}>
                            {weeklyData.map((d, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '100%', borderRadius: '4px', height: `${(d.val / maxVal) * 100}%`, background: i === 3 ? '#4ADE80' : 'rgba(255,255,255,0.2)' }} />
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Flame size={20} color="#FBBF24" /> {/* Yellow Flame */}
                                <div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>CALORIES</div>
                                    <div style={{ fontWeight: 600 }}>1,240</div>
                                </div>
                            </div>
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Trophy size={20} color="#60A5FA" /> {/* Blue Trophy */}
                                <div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>SCORE</div>
                                    <div style={{ fontWeight: 600 }}>85</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shortcuts - Colorful Again */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {[
                            { icon: <Play size={24} color="white" />, label: 'Štart', color: 'var(--primary-color)', action: onStartWorkout },
                            { icon: <Utensils size={24} color="white" />, label: 'Jedlo', color: '#F97316', action: onNavigateToNutrition },
                            { icon: <Calendar size={24} color="white" />, label: 'Plán', color: '#8B5CF6', action: () => { } },
                            { icon: <Plus size={24} color="#1E293B" />, label: 'Pridať', color: '#F1F5F9', action: () => { } },
                        ].map((item, i) => (
                            <button key={i} onClick={item.action} style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
                                background: 'transparent', border: 'none'
                            }}>
                                <div style={{
                                    width: '56px', height: '56px', borderRadius: '18px', background: item.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.1s'
                                }}>
                                    {item.icon}
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column: Workout Plan */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                            {isTodaySelected ? 'Dnešný tréning' : 'Prehľad dňa'}
                        </h3>
                        {todaysExercises.length > 0 && <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748B' }}>{todaysExercises.length} cvikov</span>}
                    </div>

                    {isRestDay ? (
                        <div className="bw-card" style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#F0FDFA', border: '1px solid #CCFBF1' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>😊</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Rest Day</h4>
                            <p style={{ color: '#64748B', lineHeight: 1.6, maxWidth: '280px' }}>
                                Dnes žiadny tréning. Odpočiň si a naber sily na zajtra.
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {/* Daily Summary Header Card - Colorful */}
                            <div className="bw-card" style={{ marginBottom: '1.5rem', background: '#E0F2FE', border: '1px dashed #7DD3FC', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Dumbbell size={24} color="#0284C7" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: '#0369A1', fontSize: '1rem' }}>Full Body Power</div>
                                    <div style={{ fontSize: '0.875rem', color: '#0284C7' }}>Silový tréning • 45 min</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {todaysExercises.map((ex, i) => (
                                    <ExerciseCard key={i} exercise={ex} />
                                ))}
                            </div>

                            <button
                                className="btn-primary"
                                onClick={onStartWorkout}
                                style={{
                                    marginTop: '1.5rem', width: '100%', padding: '1.25rem', fontSize: '1rem',
                                    borderRadius: '12px', fontWeight: 700,
                                    border: 'none', cursor: 'pointer',
                                    background: 'var(--primary-color)', color: 'white' // Restore component primary color class usage or explicit var
                                }}
                            >
                                Začať tréning
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
