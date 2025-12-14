import React, { useState } from 'react';
import { Mail, Lock, ChevronLeft, Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin, onBack, onGoToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simple validation
        if (!email || !password) {
            setError('Prosím vyplňte všetky polia');
            return;
        }

        // Locate user in localStorage (Simple mock auth)
        // ideally we would search through a list of users, but for now
        // we check if the stored profile matches.
        // Actually, since the prompt asked for "Simple login", 
        // we can just check if email matches the stored profile email if it exists,
        // OR we can just allow login and update the profile if needed?
        // Let's implement a "check against stored profile" logic.

        const storedProfileStr = localStorage.getItem('fitness_user_profile');
        if (storedProfileStr) {
            const storedProfile = JSON.parse(storedProfileStr);
            if (storedProfile.email === email && storedProfile.password === password) {
                onLogin(storedProfile);
                return;
            }
        }

        // If we want to allow "any" login for demo if no profile exists? 
        // No, user specifically asked for "login and signup".
        // So they must signup first.

        if (!storedProfileStr) {
            setError('Účet neexistuje. Prosím zaregistrujte sa.');
            return;
        }

        setError('Nesprávny email alebo heslo');
    };

    return (
        <div className="animate-fade-in" style={{
            height: '100vh', padding: '2rem', display: 'flex', flexDirection: 'column',
            background: 'white'
        }}>
            <button onClick={onBack} style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontWeight: 600 }}>
                <ChevronLeft size={20} /> Späť
            </button>

            <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0F172A' }}>
                Vitajte späť
            </h1>
            <p style={{ color: '#64748B', marginBottom: '3rem' }}>
                Prihláste sa do svojho účtu
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>Email</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={20} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="email"
                            name="email"
                            placeholder="vas@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="Vaše heslo"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    Prihlásiť sa
                </button>
            </form>

            <div style={{ marginTop: 'auto', textAlign: 'center', color: '#64748B', paddingBottom: '2rem' }}>
                Nemáte ešte účet? <button onClick={onGoToSignup} style={{ color: '#3B82F6', fontWeight: 700 }}>Registrovať sa</button>
            </div>
        </div>
    );
};

export default Login;
