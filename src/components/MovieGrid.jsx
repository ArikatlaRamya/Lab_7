import React from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, onMovieClick, title }) {
  if (!movies || movies.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>No movies found</h2>
        <p>Try adjusting your search</p>
      </div>
    );
  }

  return (
    <section style={styles.section}>
      {title && <h2 style={styles.title}>{title}</h2>}
      <div style={styles.grid}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '2rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '2rem',
    color: 'var(--text-primary)',
    display: 'inline-block',
    borderBottom: '3px solid var(--accent-color)',
    paddingBottom: '0.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '2rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 1rem',
    color: 'var(--text-secondary)',
  }
};
