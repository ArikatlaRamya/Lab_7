import React, { useEffect, useState } from 'react';
import { fetchMovieDetails, getImageUrl } from '../api';

export default function MovieModal({ movieId, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setDetails(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (movieId) {
      getDetails();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [movieId]);

  if (!movieId) return null;

  const trailer = details?.videos?.results?.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} className="glass" onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>&times;</button>
        
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : !details ? (
          <div style={styles.error}>Movie not found.</div>
        ) : (
          <div style={styles.content}>
            <div style={styles.mediaSection}>
              {trailer ? (
                <div style={styles.videoContainer}>
                  <iframe 
                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={styles.iframe}
                  />
                </div>
              ) : (
                <img 
                  src={getImageUrl(details.backdrop_path || details.poster_path, 'w1280')} 
                  alt={details.title}
                  style={styles.backdrop}
                />
              )}
            </div>
            
            <div style={styles.infoSection}>
              <h2 style={styles.title}>{details.title} <span style={styles.year}>({new Date(details.release_date).getFullYear()})</span></h2>
              <div style={styles.meta}>
                <span style={styles.rating}>⭐ {details.vote_average.toFixed(1)}</span>
                <span>{details.runtime} min</span>
                <span>{details.genres?.map(g => g.name).join(', ')}</span>
              </div>
              <p style={styles.tagline}>{details.tagline}</p>
              <h3 style={styles.overviewTitle}>Overview</h3>
              <p style={styles.overview}>{details.overview}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    animation: 'fadeIn 0.3s ease',
  },
  modal: {
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    borderRadius: '16px',
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'rgba(0, 0, 0, 0.5)',
    border: 'none',
    color: 'white',
    fontSize: '2rem',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    transition: 'var(--transition)',
  },
  loading: {
    padding: '4rem',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  error: {
    padding: '4rem',
    textAlign: 'center',
    color: '#ef4444',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  mediaSection: {
    width: '100%',
    backgroundColor: '#000',
    position: 'relative',
  },
  videoContainer: {
    position: 'relative',
    paddingBottom: '56.25%', /* 16:9 */
    height: 0,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#000',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backdrop: {
    width: '100%',
    height: 'auto',
    maxHeight: '500px',
    objectFit: 'cover',
    display: 'block',
  },
  infoSection: {
    padding: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
    color: 'var(--text-primary)',
  },
  year: {
    fontWeight: '400',
    color: 'var(--text-secondary)',
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    color: 'var(--text-secondary)',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    flexWrap: 'wrap',
  },
  rating: {
    color: '#fbbf24',
    fontWeight: '600',
  },
  tagline: {
    fontStyle: 'italic',
    color: 'var(--text-secondary)',
    marginBottom: '1.5rem',
    fontSize: '1.1rem',
  },
  overviewTitle: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    color: 'var(--text-primary)',
  },
  overview: {
    lineHeight: '1.8',
    color: 'var(--text-secondary)',
  }
};
