import React from 'react';

const VectorBody = ({ exerciseType, muscleGroup }) => {
    // Muscle mapping to SVG paths
    const muscles = {
        Chest: ['pecs'],
        Abs: ['abs'],
        Arms: ['biceps_left', 'biceps_right', 'shoulders_left', 'shoulders_right'],
        Legs: ['quads_left', 'quads_right', 'calves_left', 'calves_right'],
        Shoulders: ['shoulders_left', 'shoulders_right'],
        'Full Body': ['pecs', 'abs', 'biceps_left', 'biceps_right', 'quads_left', 'quads_right']
    };

    const activeMuscles = muscles[muscleGroup] || [];

    const getMuscleColor = (id) => {
        return activeMuscles.includes(id) ? '#EF4444' : '#9CA3AF'; // Red for active, Gray for inactive
    };

    const getAnimationClass = () => {
        switch (exerciseType) {
            case 'jumping-jacks': return 'animate-jump';
            case 'squats': return 'animate-squat';
            case 'pushups': return 'animate-pushup';
            case 'lunges': return 'animate-lunge';
            default: return 'animate-breathe';
        }
    };

    return (
        <div className={`vector-body-container ${getAnimationClass()}`} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg viewBox="0 0 200 400" style={{ height: '90%', overflow: 'visible' }}>
                <defs>
                    <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E5E7EB" />
                        <stop offset="100%" stopColor="#D1D5DB" />
                    </linearGradient>
                </defs>

                {/* Head */}
                <circle cx="100" cy="50" r="25" fill="#D1D5DB" />

                {/* Torso Group */}
                <g id="torso">
                    {/* Shoulders */}
                    <path
                        id="shoulders_left"
                        d="M75 80 Q60 85 55 110"
                        stroke={getMuscleColor('shoulders_left')}
                        strokeWidth="15"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        id="shoulders_right"
                        d="M125 80 Q140 85 145 110"
                        stroke={getMuscleColor('shoulders_right')}
                        strokeWidth="15"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Chest (Pecs) */}
                    <path
                        id="pecs"
                        d="M75 85 Q100 110 125 85 L125 110 Q100 130 75 110 Z"
                        fill={getMuscleColor('pecs')}
                        opacity="0.8"
                    />

                    {/* Abs */}
                    <rect
                        id="abs"
                        x="85" y="120" width="30" height="60" rx="5"
                        fill={getMuscleColor('abs')}
                        opacity="0.8"
                    />
                </g>

                {/* Arms */}
                <g id="arms">
                    <path
                        id="biceps_left"
                        d="M55 110 L45 160"
                        stroke={getMuscleColor('biceps_left')}
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    <path
                        id="biceps_right"
                        d="M145 110 L155 160"
                        stroke={getMuscleColor('biceps_right')}
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                </g>

                {/* Legs */}
                <g id="legs">
                    {/* Quads (Thighs) */}
                    <path
                        id="quads_left"
                        d="M85 180 L75 260"
                        stroke={getMuscleColor('quads_left')}
                        strokeWidth="18"
                        strokeLinecap="round"
                    />
                    <path
                        id="quads_right"
                        d="M115 180 L125 260"
                        stroke={getMuscleColor('quads_right')}
                        strokeWidth="18"
                        strokeLinecap="round"
                    />

                    {/* Calves */}
                    <path
                        id="calves_left"
                        d="M75 260 L70 340"
                        stroke={getMuscleColor('calves_left')}
                        strokeWidth="14"
                        strokeLinecap="round"
                    />
                    <path
                        id="calves_right"
                        d="M125 260 L130 340"
                        stroke={getMuscleColor('calves_right')}
                        strokeWidth="14"
                        strokeLinecap="round"
                    />
                </g>
            </svg>

            <style>{`
        .vector-body-container svg {
          filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.1));
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-breathe { animation: breathe 3s infinite ease-in-out; }

        @keyframes jump {
          0%, 100% { transform: translateY(0) scaleX(1); }
          50% { transform: translateY(-20px) scaleX(0.9); }
        }
        .animate-jump { animation: jump 0.8s infinite ease-in-out; }

        @keyframes squat {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(30px) scaleY(0.85); }
        }
        .animate-squat { animation: squat 2s infinite ease-in-out; }

        @keyframes pushup {
          0%, 100% { transform: rotate(90deg) translateX(0); }
          50% { transform: rotate(90deg) translateX(20px); }
        }
        .animate-pushup { 
          animation: pushup 1.5s infinite ease-in-out; 
          transform-origin: center;
        }
      `}</style>
        </div>
    );
};

export default VectorBody;
