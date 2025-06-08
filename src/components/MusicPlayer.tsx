/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useRef, useEffect } from 'react';
import { Music } from '@/types/music';
import { FaPlay, FaPause, FaForward, FaBackward, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface MusicPlayerProps {
  playlist: Music[];
}

export default function MusicPlayer({ playlist }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Ensure component only renders after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const playPrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  // Handle time updates for progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const progressPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  // Handle when song ends
  const handleEnded = () => {
    playNext();
  };

  // Handle when audio loads and is ready to play
  const handleLoadedData = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    }
  };

  // Effect to handle track changes
  useEffect(() => {
    if (audioRef.current && isMounted) {
      audioRef.current.load(); // Reload the audio element with new source
      setProgress(0); // Reset progress
      
      if (isPlaying) {
        // If was playing, continue playing the new track
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack, isPlaying, isMounted]);

  // Effect to setup event listeners
  useEffect(() => {
    if (!isMounted) return;
    
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('loadeddata', handleLoadedData);
      
      // Cleanup function
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [isMounted]);

  // Don't render until after hydration
  if (!isMounted) {
    return null;
  }

  const currentSong = playlist[currentTrack];
  
  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
        isMinimized ? 'w-[60px] md:max-w-[300px]' : 'w-[300px]'
      }`}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="hover:text-blue-500 transition-colors p-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {isMinimized ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </button>
      </div>

      <audio ref={audioRef} src={currentSong.url} preload="metadata" />
      
      {isMinimized ? (
        <div className="flex items-center justify-center">
          <button onClick={togglePlay} className="hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-2">
            <h3 className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{currentSong.title}</h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{currentSong.artist}</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button onClick={playPrevious} className="hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
              <FaBackward size={14} />
            </button>
            <button onClick={togglePlay} className="hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
              {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
            </button>
            <button onClick={playNext} className="hover:text-blue-500 transition-colors" style={{ color: 'var(--text-primary)' }}>
              <FaForward size={14} />
            </button>
          </div>
          <div className="mt-2 h-1 rounded-full" style={{ backgroundColor: 'var(--card-border)' }}>
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}