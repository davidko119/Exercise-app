import React from 'react';
import { ArrowLeft, Clock, Flame, ChefHat, Heart, ChevronRight } from 'lucide-react';

const MealDetail = ({ meal, onBack }) => {
    console.log("Rendering MealDetail for:", meal.name); // Debug log
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: '#F8FAFC', zIndex: 9999, // Ensure max z-index
            overflowY: 'auto', paddingBottom: '4rem', display: 'block'
        }}>
            {/* Hero Image */}
            <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                <img src={meal.image} alt={meal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                {/* Header Actions */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, padding: '1.5rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
                }}>
                    <button onClick={onBack} style={{
                        width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <ArrowLeft size={20} color="#0F172A" />
                    </button>
                    <button style={{
                        width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <Heart size={20} color="#0F172A" />
                    </button>
                </div>
            </div>

            {/* Content Container */}
            <div style={{
                marginTop: '-2rem', borderTopLeftRadius: '32px', borderTopRightRadius: '32px',
                background: 'white', position: 'relative', padding: '2rem', minHeight: '50vh'
            }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
                    {meal.name}
                </h1>

                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', margin: '2rem 0', padding: '1rem', background: '#F8FAFC', borderRadius: '16px' }}>
                    <div className="flex-center flex-col">
                        <Clock size={24} color="#3B82F6" style={{ marginBottom: '0.5rem' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{meal.time} min.</span>
                    </div>
                    <div className="flex-center flex-col">
                        <Flame size={24} color="#F97316" style={{ marginBottom: '0.5rem' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{meal.calories} kcal</span>
                    </div>
                    <div className="flex-center flex-col">
                        <ChefHat size={24} color="#10B981" style={{ marginBottom: '0.5rem' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{meal.difficulty}</span>
                    </div>
                </div>

                {/* Tags */}
                {meal.tags && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
                        {meal.tags.map((tag, i) => (
                            <span key={i} style={{
                                padding: '6px 16px', borderRadius: '99px', border: '1px solid #E2E8F0',
                                fontSize: '0.75rem', fontWeight: 600, color: '#64748B'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Ingredients */}
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Prísady</h2>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {meal.ingredients.map((ing, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between', padding: '1rem 0',
                                borderBottom: '1px solid #F1F5F9'
                            }}>
                                <span style={{ fontWeight: 500, color: '#64748B' }}>{ing.name}</span>
                                <span style={{ fontWeight: 700, color: '#0F172A' }}>{ing.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preparation Steps */}
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Príprava</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {meal.steps.map((step, i) => (
                            <div key={i} style={{
                                background: 'white', padding: '1.5rem', borderRadius: '16px',
                                border: '1px solid #F1F5F9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#94A3B8', marginBottom: '0.5rem' }}>
                                    {i + 1}. krok
                                </div>
                                <div style={{ fontWeight: 500, color: '#334155', lineHeight: 1.6 }}>
                                    {step}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Floating Action Button */}
            <div style={{
                position: 'fixed', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 60
            }}>
                <button style={{
                    width: '100%', padding: '1.25rem', background: '#0F172A', color: 'white',
                    borderRadius: '20px', fontWeight: 700, fontSize: '1.125rem',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                }}>
                    Zjesť toto jedlo <Flame size={20} fill="#F97316" color="#F97316" />
                </button>
            </div>
        </div>
    );
};

export default MealDetail;
