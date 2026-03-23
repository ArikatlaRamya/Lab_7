import React from 'react';
import { getImageUrl } from '../api';

export default function MovieCard({ movie, onClick }) {
  const ratingColor = movie.vote_average >= 7 ? '#22c55e' : movie.vote_average >= 5 ? '#eab308' : '#ef4444';

  return (
    <div style={styles.card} className="glass" onClick={() => onClick(movie.id)}>
      <div style={styles.imageContainer}>
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title} 
          style={styles.image} 
          loading="lazy"
        />
        <div style={{...styles.rating, borderColor: ratingColor, color: ratingColor}}>
          {movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}
        </div>
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{movie.title}</h3>
        <p style={styles.date}>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'var(--transition)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imageContainer: {
    position: 'relative',
    paddingTop: '150%', // 2:3 aspect ratio
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  rating: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(4px)',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    border: '2px solid',
  },
  content: {
    padding: '1rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '600',
    margin: '0 0 0.25rem 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  date: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    margin: 0,
  }
};
