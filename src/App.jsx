import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieGrid from './components/MovieGrid';
import MovieModal from './components/MovieModal';
import { fetchTrending, searchMovies } from './api';
import './index.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load trending movies initially or on empty search
  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      try {
        const data = await fetchTrending();
        setMovies(data);
      } catch (error) {
        console.error("Error loading trending movies", error);
      } finally {
        setLoading(false);
      }
    };

    if (!searchQuery.trim()) {
      loadTrending();
    }
  }, [searchQuery]);

  // Load search results when query changes
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim()) {
        setLoading(true);
        try {
          const data = await searchMovies(searchQuery);
          setMovies(data);
        } catch (error) {
          console.error("Error searching movies", error);
        } finally {
          setLoading(false);
        }
      }
    }, 500); // debounce search
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="app">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main>
        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Loading movies...</p>
          </div>
        ) : (
          <MovieGrid 
            title={searchQuery ? `Search Results for "${searchQuery}"` : "Trending Movies"} 
            movies={movies} 
            onMovieClick={setSelectedMovie} 
          />
        )}
      </main>

      {selectedMovie && (
        <MovieModal 
          movieId={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
}

const styles = {
  loading: {
    padding: '4rem',
    textAlign: 'center',
    color: 'var(--accent-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid var(--glass-border)',
    borderTopColor: 'var(--accent-color)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  }
};

export default App;