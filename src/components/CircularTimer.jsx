const CircularTimer = ({ duration, timeLeft, size = 280, strokeWidth = 12, color }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = timeLeft / duration;
    const dashoffset = circumference * (1 - progress);

    // Color transition from green to red as time runs out if no color prop provided
    const getColor = () => {
        if (color) return color;
        if (progress > 0.6) return '#4ADE80'; // Green
        if (progress > 0.3) return '#FBBF24'; // Orange
        return '#EF4444'; // Red
    };

    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: 'rotate(-90deg)' }}
            >
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color ? "rgba(0,0,0,0.1)" : "#E5E7EB"}
                    strokeWidth={strokeWidth}
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: dashoffset,
                        transition: 'all 1s linear'
                    }}
                />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center', color: color || 'inherit' }}>
                <div style={{ fontSize: '4rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                    {timeLeft}
                </div>
                {/* Removed 'seconds' label to match screenshot style more closely (just number) or keep it small */}
            </div>
        </div>
    );
};

export default CircularTimer;
