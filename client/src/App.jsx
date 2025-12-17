import { useState, useContext } from 'react';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProductCard from './components/ProductCard';
import './App.css';

// Create a sub-component to use the AuthContext
const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Search State
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleAuthClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const closeModal = () => setShowAuthModal(false);
  const switchMode = () => setAuthMode(authMode === 'login' ? 'register' : 'login');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setSearched(true);
    try {
      const res = await fetch(`http://localhost:5000/api/products/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="app-container">
      {/* Modal Overlay */}
      {showAuthModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }} onClick={closeModal}>
          <div onClick={e => e.stopPropagation()}>
            {authMode === 'login'
              ? <Login onClose={closeModal} onSwitch={switchMode} />
              : <Register onClose={closeModal} onSwitch={switchMode} />}
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px', borderRadius: 'var(--radius-lg)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Price<span className="text-gradient">Compare</span>
        </h1>
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Hi, {user.username}</span>
              <button
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--secondary)',
                  color: 'var(--secondary)',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={handleAuthClick}>Sign In</button>
          )}
        </div>
      </nav>

      {/* Hero / Search Section */}
      <main className="container" style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          {!searched && (
            <>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Smart Shopping, <br />
                <span className="text-gradient">Maximum Savings</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '3rem' }}>
                Compare prices across Amazon, eBay, and Walmart instantly. Real-time tracking, price drop alerts, and personalized recommendations.
              </p>
            </>
          )}

          <form onSubmit={handleSearch} className="search-box glass-panel" style={{ padding: '10px', display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '3rem' }}>
            <input
              type="text"
              placeholder="Search for products (e.g., iPhone 15, Sony Headphones)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'white',
                padding: '12px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-primary" disabled={searching}>
              {searching ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {searched && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Showing results for "{query}"
            </h3>

            {searching ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading best prices...</div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {results.length > 0 ? (
                  results.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))
                ) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No results found.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;
