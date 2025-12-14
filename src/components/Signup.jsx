import React, { useState } from 'react';
import { Mail, Lock, User, ChevronLeft, Eye, EyeOff } from 'lucide-react';

const Signup = ({ onSignup, onBack, onGoToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.surname || !formData.email || !formData.password) {
            setError('Prosím vyplňte všetky polia');
            return;
        }

        // Create profile object
        // We'll add some defaults for profile setup like weight/height if they are missing, 
        // or we can redirect to onboarding later. 
        // For simplicity, we'll create a basic profile and assume Onboarding works on top of it or we merge it.
        // Actually, the App flow uses Onboarding to set physical stats. 
        // So here we should create the "Identity" and then maybe flag that stats need to be set?
        // Or we pass this identity to Onboarding.
        // Let's create a basic profile and 'onSignup' should probably trigger the next step (Onboarding or App).

        const newProfile = {
            ...formData,
            // Defaults (to be updated by Onboarding later if strictly needed, but for now we might skip physical stats or add them?)
            // The previous Onboarding asked for EVERYTHING. 
            // We should probably keep the Onboarding for stats. 
            // So we just save identity here.
            id: Date.now().toString(),
        };

        onSignup(newProfile);
    };

    return (
        <div className="animate-fade-in" style={{
            minHeight: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column',
            background: 'white'
        }}>
            <button onClick={onBack} style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontWeight: 600 }}>
                <ChevronLeft size={20} /> Späť
            </button>

            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0F172A' }}>
                Vytvoriť účet
            </h1>
            <p style={{ color: '#64748B', marginBottom: '2rem' }}>
                Začnite svoju fitness cestu s nami
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Meno</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ján"
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                width: '100%', padding: '1rem', borderRadius: '16px',
                                border: '1px solid #E2E8F0', fontSize: '1rem', outline: 'none',
                                background: '#F8FAFC'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Priezvisko</label>
                        <input
                            type="text"
                            name="surname"
                            placeholder="Novák"
                            value={formData.surname}
                            onChange={handleChange}
                            style={{
                                width: '100%', padding: '1rem', borderRadius: '16px',
                                border: '1px solid #E2E8F0', fontSize: '1rem', outline: 'none',
                                background: '#F8FAFC'
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Email</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={20} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="email"
                            name="email"
                            placeholder="jan.novak@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px',
                                border: '1px solid #E2E8F0', fontSize: '1rem', outline: 'none',
                                background: '#F8FAFC'
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Heslo</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={20} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Minimálne 6 znakov"
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                                width: '100%', padding: '1rem 3rem 1rem 3rem', borderRadius: '16px',
                                border: '1px solid #E2E8F0', fontSize: '1rem', outline: 'none',
                                background: '#F8FAFC'
                            }}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                            {showPassword ? <EyeOff size={20} color="#94A3B8" /> : <Eye size={20} color="#94A3B8" />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div style={{ color: '#EF4444', fontSize: '0.875rem', textAlign: 'center', fontWeight: 500 }}>
                        {error}
                    </div>
                )}

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                    Vytvoriť účet
                </button>
            </form>

            <div style={{ marginTop: 'auto', textAlign: 'center', color: '#64748B', paddingBottom: '2rem' }}>
                Už máte účet? <button onClick={onGoToLogin} style={{ color: '#3B82F6', fontWeight: 700 }}>Prihlásiť sa</button>
            </div>
        </div>
    );
};

export default Signup;
