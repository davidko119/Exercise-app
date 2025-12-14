import React, { useState } from 'react';
import { Search, SlidersHorizontal, Lock, Clock, Flame } from 'lucide-react';
import { MEALS } from '../data/meals';
import MealDetail from './MealDetail';

const Nutrition = () => {
    const [selectedMeal, setSelectedMeal] = useState(null);

    if (selectedMeal) {
        return <MealDetail meal={selectedMeal} onBack={() => setSelectedMeal(null)} />;
    }

    // Categories to display
    const categories = ['Raňajky', 'Obed', 'Večera'];

    return (
        <div style={{ padding: '0 0 6rem 0' }}>
            {/* Header */}
            <div style={{ padding: '1.5rem 1.5rem 0 1.5rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Jedlo</h1>

                {/* Search Bar */}
                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                        type="text"
                        placeholder="Hľadať recepty..."
                        style={{
                            width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px',
                            border: 'none', background: '#F1F5F9', fontSize: '1rem', fontWeight: 500
                        }}
                    />
                    <SlidersHorizontal size={20} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#0F172A' }} />
                </div>
            </div>

            {/* Content Lists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {categories.map((cat) => {
                    const filteredMeals = MEALS.filter(m => m.category === cat);

                    // Always render the section to verify layout, even if empty (optional, but good for debug)
                    // If empty, we can show "No items" or just hide it.
                    if (filteredMeals.length === 0) return null;

                    return (
                        <div key={cat}>
                            <div style={{ padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{cat}</h2>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#3B82F6' }}>Viac &gt;</span>
                            </div>

                            <div style={{
                                display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0 1.5rem',
                                paddingBottom: '1rem', scrollbarWidth: 'none'
                            }}>
                                {filteredMeals.map((meal) => (
                                    <div key={meal.id} onClick={() => setSelectedMeal(meal)} style={{
                                        minWidth: '220px', width: '220px', cursor: 'pointer', flexShrink: 0
                                    }}>
                                        <div style={{
                                            position: 'relative', borderRadius: '20px', overflow: 'hidden',
                                            height: '160px', marginBottom: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                        }}>
                                            <img src={meal.image} alt={meal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            {/* Pro label removed as per request */}
                                        </div>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {meal.name}
                                        </h3>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={14} /> {meal.time} min.
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Flame size={14} /> {meal.calories} kcal
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Nutrition;
