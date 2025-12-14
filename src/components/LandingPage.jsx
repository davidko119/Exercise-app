import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Activity, Calendar, Zap, Shield, Users, Star, CheckCircle, ChevronRight, Dumbbell, TrendingUp } from 'lucide-react';

const useScrollReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return [ref, isVisible];
};

const RevealSection = ({ children, className = '', delay = 0 }) => {
    const [ref, isVisible] = useScrollReveal();
    return (
        <div
            ref={ref}
            className={`${className} ${isVisible ? 'is-visible' : ''}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`
            }}
        >
            {children}
        </div>
    );
};

const LandingPage = ({ onGetStarted, onLogin }) => {
    return (
        <div style={{ background: 'white', minHeight: '100vh', overflowX: 'hidden', fontFamily: 'var(--font-family)' }}>
            <style>{`
        .landing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          padding: 4rem 0;
        }
        
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            padding: 6rem 0;
            gap: 4rem;
          }
        }

        .feature-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .feature-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
        }

        .floating-image {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(-2deg); }
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-green) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          z-index: 0;
        }
      `}</style>

            {/* Navbar */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(12px)',
                zIndex: 50,
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <div className="landing-container flex-between" style={{ height: '80px' }}>
                    <div className="flex-center" style={{ gap: '0.75rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'var(--primary-color)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}>
                            <Zap size={24} color="var(--accent-green)" fill="var(--accent-green)" />
                        </div>
                        <span className="text-xl" style={{ fontSize: '1.5rem' }}>FitPlan</span>
                    </div>
                    <div className="flex-center" style={{ gap: '2rem' }}>
                        <div className="flex-center" style={{ gap: '2rem', display: 'none' }}>
                            {['Features', 'Testimonials', 'Pricing'].map(item => (
                                <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500 }}>
                                    {item}
                                </a>
                            ))}
                        </div>
                        <div className="flex-center" style={{ gap: '1rem' }}>
                            <button
                                onClick={onLogin}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'transparent',
                                    color: 'var(--text-primary)',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Prihlásiť sa
                            </button>
                            <button
                                onClick={onGetStarted}
                                className="btn-primary"
                                style={{ padding: '0.75rem 1.5rem', width: 'auto' }}
                            >
                                Registrovať sa
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>
                <div className="blob" style={{ width: '500px', height: '500px', background: '#4ADE80', top: '-100px', right: '-100px' }} />
                <div className="blob" style={{ width: '400px', height: '400px', background: '#C084FC', bottom: '0', left: '-100px' }} />

                <div className="landing-container hero-grid">
                    <RevealSection style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(74, 222, 128, 0.1)',
                            color: '#059669',
                            borderRadius: '99px',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(74, 222, 128, 0.2)'
                        }}>
                            <Star size={16} fill="#059669" /> #1 AI Fitness Planner
                        </div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 800, marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                            Transform Your Body with <span className="gradient-text">Smart AI</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '540px' }}>
                            Experience the future of fitness. Personalized workout plans, real-time anatomical visualization, and progress tracking tailored just for you.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button className="btn-primary" onClick={onGetStarted} style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', width: 'auto' }}>
                                Začať cvičiť <ArrowRight size={20} />
                            </button>
                            <button style={{
                                padding: '1rem 2.5rem',
                                borderRadius: '99px',
                                background: 'white',
                                border: '1px solid #E5E7EB',
                                fontWeight: 600,
                                fontSize: '1.125rem',
                                color: 'var(--text-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer'
                            }}>
                                <Play size={20} /> Watch Demo
                            </button>
                        </div>
                        <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex' }}>
                                {[1, 2, 3, 4].map(i => (
                                    <img
                                        key={i}
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                                        alt="User"
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid white', marginLeft: i > 1 ? '-12px' : 0 }}
                                    />
                                ))}
                            </div>
                            <div>
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#FBBF24" color="#FBBF24" />)}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>4.9/5</span> from 10k+ users
                                </div>
                            </div>
                        </div>
                    </RevealSection>

                    <RevealSection delay={0.2} style={{ position: 'relative', zIndex: 1 }}>
                        <div className="floating-image" style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                inset: '-20px',
                                background: 'linear-gradient(135deg, var(--accent-green), var(--accent-purple))',
                                borderRadius: '32px',
                                opacity: 0.2,
                                filter: 'blur(20px)',
                                transform: 'rotate(-5deg)'
                            }} />
                            <img
                                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
                                alt="App Preview"
                                style={{
                                    width: '100%',
                                    borderRadius: '24px',
                                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                    position: 'relative',
                                    border: '8px solid white'
                                }}
                            />
                            {/* Floating Cards */}
                            <div style={{
                                position: 'absolute',
                                top: '20%',
                                left: '-40px',
                                background: 'white',
                                padding: '1rem',
                                borderRadius: '16px',
                                boxShadow: 'var(--shadow-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                animation: 'float 5s ease-in-out infinite reverse'
                            }}>
                                <div style={{ background: '#ECFDF5', padding: '0.5rem', borderRadius: '10px' }}>
                                    <Activity size={24} color="#059669" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Calories Burned</div>
                                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>450 kcal</div>
                                </div>
                            </div>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* Social Proof */}
            <section style={{ padding: '3rem 0', background: '#F8FAFC', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
                <div className="landing-container">
                    <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#6B7280', fontWeight: 500 }}>TRUSTED BY TOP ATHLETES AND TEAMS</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)' }}>
                        {['Nike', 'Adidas', 'Under Armour', 'Reebok', 'Puma'].map(brand => (
                            <span key={brand} style={{ fontWeight: 900, fontSize: '1.5rem', color: '#111827' }}>{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" style={{ padding: '6rem 0' }}>
                <div className="landing-container">
                    <RevealSection style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Everything you need to reach your goals</h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
                            Our platform combines advanced technology with proven fitness methodologies to give you the best results.
                        </p>
                    </RevealSection>

                    <div className="feature-grid">
                        <FeatureCard
                            icon={<Activity size={32} color="white" />}
                            color="var(--accent-green)"
                            title="Smart Algorithms"
                            desc="Our AI analyzes your profile, goals, and progress to create the perfect workout schedule that adapts to you."
                            delay={0}
                        />
                        <FeatureCard
                            icon={<Shield size={32} color="white" />}
                            color="var(--accent-purple)"
                            title="Anatomical Visualization"
                            desc="See exactly which muscles you're working with our advanced 2D vector visualization technology."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<Calendar size={32} color="white" />}
                            color="var(--accent-orange)"
                            title="Flexible Scheduling"
                            desc="Life happens. Easily adjust your workout days and our planner adapts your entire schedule instantly."
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Interactive Demo Section */}
            <section style={{ padding: '6rem 0', background: '#111827', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div className="blob" style={{ width: '600px', height: '600px', background: '#4ADE80', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1 }} />

                <div className="landing-container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="hero-grid" style={{ padding: 0 }}>
                        <RevealSection>
                            <img
                                src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80"
                                alt="Workout"
                                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                            />
                        </RevealSection>
                        <RevealSection delay={0.2}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Train Smarter, Not Harder</h2>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {[
                                    'Real-time form guidance',
                                    'Progress tracking & analytics',
                                    'Customizable workout intensity',
                                    'Nutrition advice included'
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ background: 'rgba(74, 222, 128, 0.2)', padding: '0.25rem', borderRadius: '50%' }}>
                                            <CheckCircle size={20} color="#4ADE80" />
                                        </div>
                                        <span style={{ fontSize: '1.125rem' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn-primary" onClick={onGetStarted} style={{ marginTop: '3rem', background: 'white', color: 'var(--primary-color)' }}>
                                Start Training Now
                            </button>
                        </RevealSection>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section style={{ padding: '6rem 0', textAlign: 'center', background: 'linear-gradient(180deg, #F8FAFC 0%, white 100%)' }}>
                <div className="landing-container">
                    <RevealSection>
                        <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
                            Ready to transform your life?
                        </h2>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                            Join thousands of others achieving their dream body with FitPlan. No credit card required.
                        </p>
                        <button className="btn-primary" onClick={onGetStarted} style={{ fontSize: '1.25rem', padding: '1.25rem 3rem', width: 'auto', margin: '0 auto' }}>
                            Get Started for Free
                        </button>
                        <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#9CA3AF' }}>
                            © 2024 FitPlan Inc. All rights reserved.
                        </p>
                    </RevealSection>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, color, title, desc, delay }) => (
    <RevealSection delay={delay}>
        <div className="card hover-card" style={{ padding: '2.5rem', height: '100%', border: '1px solid #F3F4F6' }}>
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 10px 20px -5px rgba(0,0,0,0.2)'
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
        </div>
    </RevealSection>
);

// Helper for play icon
const Play = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

// End of file
export default LandingPage;
