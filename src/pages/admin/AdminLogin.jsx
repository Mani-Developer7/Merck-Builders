import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="" className="h-[120px] ml-[120px]"/>
          <p className="text-stone/50 text-xs uppercase tracking-widest mt-2">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ink-2 border border-brass/20 rounded-2xl p-8 space-y-4">
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-ink border border-brass/20 rounded-lg px-4 py-3 text-sm text-stone placeholder:text-stone/40 outline-none focus:border-brass"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-ink border border-brass/20 rounded-lg px-4 py-3 text-sm text-stone placeholder:text-stone/40 outline-none focus:border-brass"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brass text-ink px-5 py-3 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-brass-light transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="text-stone/30 text-xs text-center mt-6">
          Demo login: <code className="text-brass">admin@marjanclassic.com</code> /{' '}
          <code className="text-brass">admin123</code>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
