import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExerciseModel = ({ exerciseType, images }) => {
    // Default to the first image key available or just index 0
    const [activeAngle, setActiveAngle] = useState(0);

    // If no specific images are provided, we might fallback
    if (!images || images.length === 0) {
        return (
            <div style={{
                width: '100%',
                height: '300px',
                background: '#F8FAFC',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9CA3AF'
            }}>
                No images available
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            height: '100%', // Full height
            background: 'white',
            overflow: 'hidden'
        }}>
            {/* Image Container */}
            <div style={{
                position: 'relative',
                height: '100%',
                width: '100%',
                background: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <AnimatePresence mode='wait'>
                    <motion.img
                        key={activeAngle}
                        src={images[activeAngle].url}
                        alt={`${exerciseType} ${images[activeAngle].label}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain', // Changed to contain to show full body
                            padding: '1rem' // Add padding so it doesn't touch edges
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    />
                </AnimatePresence>

                {/* Angle Toggles Overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '0.5rem',
                    padding: '4px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveAngle(index)}
                            style={{
                                padding: '6px 16px',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                transition: 'all 0.2s',
                                background: activeAngle === index ? '#111827' : 'transparent', // Using --primary-color (dark grey)
                                color: activeAngle === index ? 'white' : '#4B5563',
                                boxShadow: activeAngle === index ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none',
                                cursor: 'pointer',
                                border: 'none'
                            }}
                        >
                            {img.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExerciseModel;
