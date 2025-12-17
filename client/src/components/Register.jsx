import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Register = ({ onClose, onSwitch }) => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(formData.username, formData.email, formData.password);
        if (res.success) {
            onClose();
        } else {
            setError(res.msg);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', width: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem', textAlign: 'center' }}>
                Join <span className="text-gradient">Us</span>
            </h2>
            {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    style={{
                        padding: '12px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        outline: 'none'
                    }}
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                        padding: '12px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        outline: 'none'
                    }}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{
                        padding: '12px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        outline: 'none'
                    }}
                    required
                />
                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Sign Up</button>
            </form>
            <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Already have an account? <span onClick={onSwitch} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}>Sign In</span>
            </p>
        </div>
    );
};

export default Register;
