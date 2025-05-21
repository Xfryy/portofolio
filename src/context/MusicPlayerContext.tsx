"use client";

import { createContext, useContext, useState, useEffect, useRef } from 'react';

interface Song {
  title: string;
  artist: string;
  cover: string;
  file: string;
  duration: number;
}

interface MusicPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  isExpanded: boolean;
  playlist: Song[];
  volume: number;
  progress: number;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
  toggleExpanded: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setProgress: (progress: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInitialLoad = useRef(true);

  // Function to move to next song - defined earlier so it can be referenced
  const nextSong = () => {
    if (!playlist.length || !currentSong) return;
    
    const currentIndex = playlist.findIndex(song => song.file === currentSong.file);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
    setIsPlaying(true);
  };

  // Handle song end
  const handleSongEnd = () => {
    nextSong();
  };

  // Handle audio errors
  const handleAudioError = (error: Event) => {
    console.error("Audio error:", error);
    setIsPlaying(false);
    nextSong();
  };

  // Update progress
  const updateProgress = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((currentTime / duration) * 100);
    }
  };

  // Initialize playlist with actual songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Try to fetch songs from the API first
        const response = await fetch('/api/music');
        const data = await response.json();
        
        if (data.songs && data.songs.length > 0) {
          setPlaylist(data.songs);
          setCurrentSong(data.songs[0]);
        } else {
          // Fallback to hardcoded songs if API fails
          const songs: Song[] = [
            {
              title: "did i tell u that i miss u",
              artist: "adore",
              cover: "/music/covers/miss-u.jpg",
              file: "/music/SpotiDownloader.com - did i tell u that i miss u - adore.mp3",
              duration: 180
            },
            {
              title: "Shut up My Moms Calling",
              artist: "Hotel Ugly",
              cover: "/music/covers/shut-up.jpg",
              file: "/music/SpotiDownloader.com - Shut up My Moms Calling - Hotel Ugly.mp3",
              duration: 200
            },
            {
              title: "The Less I Know The Better",
              artist: "Tame Impala",
              cover: "/music/covers/less-i-know.jpg",
              file: "/music/SpotiDownloader.com - The Less I Know The Better - Tame Impala.mp3",
              duration: 240
            }
          ];
          setPlaylist(songs);
          setCurrentSong(songs[0]);
        }
        
        // Initialize audio element
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.volume = volume;
          
          // Set up event listeners
          audioRef.current.addEventListener('ended', handleSongEnd);
          audioRef.current.addEventListener('timeupdate', updateProgress);
          audioRef.current.addEventListener('error', handleAudioError);
        }
      } catch (error) {
        console.error("Error loading songs:", error);
      }
    };
    
    fetchSongs();
    
    return () => {
      // Clean up event listeners
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleSongEnd);
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current.pause();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle song changes and auto-play
  useEffect(() => {
    if (audioRef.current && currentSong) {
      // Remove previous event listeners to avoid duplicates
      audioRef.current.removeEventListener('ended', handleSongEnd);
      
      audioRef.current.src = currentSong.file;
      audioRef.current.load();
      setProgress(0);
      
      // Re-add the event listener for this song
      audioRef.current.addEventListener('ended', handleSongEnd);
      
      // Auto-play on initial load (with user interaction requirement)
      const handleFirstInteraction = () => {
        if (isInitialLoad.current) {
          const playPromise = audioRef.current?.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              setIsPlaying(true);
            }).catch(error => {
              console.error("Auto-play was prevented:", error);
            });
          }
          
          isInitialLoad.current = false;
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
        }
      };
      
      // Add event listeners for first interaction
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('keydown', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);
      
      return () => {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Play/pause effect
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const prevSong = () => {
    if (!playlist.length || !currentSong) return;
    
    const currentIndex = playlist.findIndex(song => song.file === currentSong.file);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSong(playlist[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <MusicPlayerContext.Provider value={{
      currentSong,
      isPlaying,
      isExpanded,
      playlist,
      volume,
      progress,
      setVolume,
      togglePlay,
      toggleExpanded,
      nextSong,
      prevSong,
      setProgress,
    }}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};