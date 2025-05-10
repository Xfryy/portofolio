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
  const isUserInteracted = useRef(false);

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
              file: "/music/SpotiDownloader.com - did i tell u that i miss u - slowed - adore.mp3",
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
  }, []);

  // Handle song changes without immediately playing
  useEffect(() => {
    if (audioRef.current && currentSong) {
      // Important: Load the song without playing it
      audioRef.current.src = currentSong.file;
      audioRef.current.load();
      
      // Reset progress
      setProgress(0);
      
      // Only play if it's not the initial load or if user has already interacted
      if (!isInitialLoad.current && isPlaying) {
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
        }
      }
      
      isInitialLoad.current = false;
    }
  }, [currentSong]);

  // Add volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Add play/pause effect
  useEffect(() => {
    if (audioRef.current) {
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
    }
  }, [isPlaying]);

  // Handle song end
  const handleSongEnd = () => {
    // Stop playing when song ends instead of going to next song
    setIsPlaying(false);
  };

  // Handle audio errors
  const handleAudioError = (error: Event) => {
    console.error("Audio error:", error);
    setIsPlaying(false);
    // Try to play next song if there's an error
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

  const togglePlay = () => {
    isUserInteracted.current = true;
    setIsPlaying(!isPlaying);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const nextSong = () => {
    if (!playlist.length || !currentSong) return;
    
    const currentIndex = playlist.findIndex(song => song.file === currentSong.file);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  };

  const prevSong = () => {
    if (!playlist.length || !currentSong) return;
    
    const currentIndex = playlist.findIndex(song => song.file === currentSong.file);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSong(playlist[prevIndex]);
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