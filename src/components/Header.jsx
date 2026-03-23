import React from 'react';

export default function Header({ searchQuery, setSearchQuery }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header style={styles.header} className="glass">
      <div style={styles.container}>
        <div style={styles.logo}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-color)" stroke="var(--accent-color)">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span style={styles.logoText}>CineVault</span>
        </div>
        <form onSubmit={handleSubmit} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </form>
      </div>
    </header>
  );
}

const styles = {
  header: {
    padding: '1rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(to right, #60a5fa, #3b82f6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  searchForm: {
    flex: '1 1 300px',
    maxWidth: '400px',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '9999px',
    border: '1px solid var(--glass-border)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'var(--transition)',
  }
};
