"use client";

import { useState, useRef, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Session } from '@supabase/supabase-js';
import { 
  ArrowLeft, 
  MoreVertical, 
  Plus, 
  Pencil, 
  Replace, 
  Download, 
  Trash2, 
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  ShoppingCart
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Track {
  id: string;
  name: string;
  url: string;
  created_at: string;
  price?: number;
  duration?: number;
}

interface Project {
  id: string;
  name: string;
  cover_url: string | null;
}

interface TrackMenuState {
  isOpen: boolean;
  trackId: string | null;
}

interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  progress: number;
  duration: number;
  isPlayingAll: boolean;
  currentIndex: number;
}

interface PaymentModalState {
  isOpen: boolean;
  track: Track | null;
}

export default function ProjectClient({ id }: { id: string }) {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [trackMenu, setTrackMenu] = useState<TrackMenuState>({ isOpen: false, trackId: null });
  const menuRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<PlayerState>({
    isPlaying: false,
    currentTrack: null,
    progress: 0,
    duration: 0,
    isPlayingAll: false,
    currentIndex: 0
  });
  const audioRef = useRef<HTMLAudioElement>(null);
  const [paymentModal, setPaymentModal] = useState<PaymentModalState>({
    isOpen: false,
    track: null
  });
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [trackDurations, setTrackDurations] = useState<{[key: string]: number}>({});
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  const [newTrackName, setNewTrackName] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();
  }, [supabase]);

  useEffect(() => {
    const getProject = async () => {
      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        return;
      }

      setProject(project);
      setNewTitle(project.name);
    };

    const getTracks = async () => {
      const { data: tracks, error } = await supabase
        .from('tracks')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching tracks:', error);
        return;
      }

      setTracks(tracks || []);

      const durations: {[key: string]: number} = {};
      for (const track of tracks || []) {
        const duration = await getAudioDuration(track.url);
        durations[track.id] = duration;
      }
      setTrackDurations(durations);
    };

    if (session) {
      getProject();
      getTracks();
    }
  }, [session, supabase, id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setTrackMenu({ isOpen: false, trackId: null });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || !event.target.files[0]) return;

      const file = event.target.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('File size must be less than 5MB');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${session?.user?.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('public')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from('public')
          .getPublicUrl(fileName);

        const { error: updateError } = await supabase
          .from('projects')
          .update({ cover_url: publicUrl })
          .eq('id', id);

        if (updateError) throw updateError;

        setProject(prev => prev ? { ...prev, cover_url: publicUrl } : null);
      }
    } catch (error) {
      console.error('Error uploading cover:', error);
    }
  };

  const handleTitleUpdate = async () => {
    if (!session || !project || newTitle === project.name) return;

    try {
      const { error } = await supabase
        .from('projects')
        .update({ name: newTitle })
        .eq('id', id);

      if (error) throw error;

      setProject(prev => prev ? { ...prev, name: newTitle } : null);
      setIsEditingTitle(false);
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleTrackMenuOpen = (trackId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setTrackMenu({ isOpen: true, trackId });
  };

  const handleDeleteTrack = async (trackId: string) => {
    try {
      const track = tracks.find(t => t.id === trackId);
      if (!track) return;

      // Eliminar el archivo de Supabase Storage
      const fileName = track.url.split('/').pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from('tracks')
          .remove([`${session?.user?.id}/${fileName}`]);

        if (storageError) throw storageError;
      }

      // Eliminar el registro de la base de datos
      const { error: dbError } = await supabase
        .from('tracks')
        .delete()
        .eq('id', trackId);

      if (dbError) throw dbError;

      // Actualizar el estado local
      setTracks(tracks.filter(t => t.id !== trackId));
      setTrackMenu({ isOpen: false, trackId: null });
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  const handlePlayPause = (track: Track) => {
    if (player.currentTrack?.id === track.id) {
      // Si es la misma pista, solo cambiamos el estado de reproducción
      setPlayer(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
      if (audioRef.current) {
        return player.isPlaying ? audioRef.current.pause() : audioRef.current.play();
      }
    } else {
      // Si es una pista diferente, la cargamos y reproducimos
      const trackIndex = tracks.findIndex(t => t.id === track.id);
      setPlayer({
        isPlaying: true,
        currentTrack: track,
        progress: 0,
        duration: 0,
        isPlayingAll: false,
        currentIndex: trackIndex
      });
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setPlayer(prev => ({
        ...prev,
        progress: audio.currentTime,
        duration: audio.duration
      }));
    };

    const handleEnded = () => {
      if (player.isPlayingAll && player.currentIndex < tracks.length - 1) {
        // Play next track
        const nextIndex = player.currentIndex + 1;
        setPlayer(prev => ({
          ...prev,
          currentTrack: tracks[nextIndex],
          currentIndex: nextIndex,
          progress: 0,
          isPlaying: true
        }));
      } else {
        // End of playlist or single track
        setPlayer(prev => ({ 
          ...prev, 
          isPlaying: false, 
          isPlayingAll: false,
          progress: 0 
        }));
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [tracks, player.isPlayingAll, player.currentIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (player.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [player.isPlaying]);

  const handlePurchaseClick = (track: Track) => {
    setPaymentModal({
      isOpen: true,
      track
    });
  };

  const handlePaymentSubmit = async () => {
    if (!paymentModal.track) return;
    
    try {
      // Aquí implementaremos la integración con Stripe
      console.log('Processing payment for track:', paymentModal.track);
      
      // Por ahora solo cerramos el modal
      setPaymentModal({
        isOpen: false,
        track: null
      });
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleFileSelect = () => {
    audioInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) return;

      const files = Array.from(event.target.files);
      const validFiles = files.filter(file => {
        if (!file.type.startsWith('audio/')) {
          alert(`File ${file.name} is not an audio file`);
          return false;
        }
        if (file.size > 50 * 1024 * 1024) { // 50MB limit
          alert(`File ${file.name} is too large (max 50MB)`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      for (const file of validFiles) {
        const fileName = `${session?.user?.id}/${Date.now()}-${file.name}`;

        // Upload file to Supabase Storage
        const { error: uploadError, data } = await supabase.storage
          .from('tracks')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        if (data) {
          const { data: { publicUrl } } = supabase.storage
            .from('tracks')
            .getPublicUrl(fileName);

          // Create track record in database
          const { error: dbError } = await supabase
            .from('tracks')
            .insert({
              name: file.name,
              url: publicUrl,
              project_id: id,
              user_id: session?.user?.id
            });

          if (dbError) throw dbError;

          // Refresh tracks list
          const { data: newTracks, error: fetchError } = await supabase
            .from('tracks')
            .select('*')
            .eq('project_id', id)
            .order('created_at', { ascending: true });

          if (fetchError) throw fetchError;
          setTracks(newTracks || []);
        }
      }

      // Clear input
      if (event.target) {
        event.target.value = '';
      }
    } catch (error) {
      console.error('Error uploading tracks:', error);
    }
  };

  const handlePlayAll = () => {
    if (tracks.length === 0) return;
    
    if (player.isPlayingAll) {
      // If already playing all, pause
      setPlayer(prev => ({ ...prev, isPlaying: false, isPlayingAll: false }));
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      // Start playing from the first track or continue from current
      const startIndex = player.currentTrack 
        ? tracks.findIndex(t => t.id === player.currentTrack?.id) // Add optional chaining
        : 0;
      
      setPlayer(prev => ({
        ...prev,
        isPlaying: true,
        isPlayingAll: true,
        currentTrack: tracks[startIndex],
        currentIndex: startIndex,
        progress: 0
      }));
    }
  };

  const formatDuration = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    if (minutes === 0) {
      return `${seconds} seconds`;
    }
    return minutes === 1 ? "1 minute" : `${minutes} minutes`;
  };

  const getAudioDuration = async (url: string): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        resolve(audio.duration);
      });
      audio.addEventListener('error', () => {
        resolve(0);
      });
    });
  };

  const totalDuration = formatDuration(
    Object.values(trackDurations).reduce((sum, duration) => sum + duration, 0)
  );

  const handleEditTrackName = async (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (!track) return;
    
    setEditingTrackId(trackId);
    setNewTrackName(track.name);
    setTrackMenu({ isOpen: false, trackId: null });
  };

  const handleSaveTrackName = async () => {
    if (!editingTrackId || !newTrackName.trim()) return;

    try {
      const { error } = await supabase
        .from('tracks')
        .update({ name: newTrackName.trim() })
        .eq('id', editingTrackId);

      if (error) throw error;

      setTracks(tracks.map(track => 
        track.id === editingTrackId 
          ? { ...track, name: newTrackName.trim() } 
          : track
      ));
      setEditingTrackId(null);
      setNewTrackName("");
    } catch (error) {
      console.error('Error updating track name:', error);
    }
  };

  const handleReplaceAudio = async (trackId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;

      const file = target.files[0];
      if (!file.type.startsWith('audio/')) {
        alert('Please upload an audio file');
        return;
      }

      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert('File size must be less than 50MB');
        return;
      }

      try {
        const track = tracks.find(t => t.id === trackId);
        if (!track) return;

        // Delete old file
        const oldFileName = track.url.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('tracks')
            .remove([`${session?.user?.id}/${oldFileName}`]);
        }

        // Upload new file
        const fileName = `${session?.user?.id}/${Date.now()}-${file.name}`;
        const { error: uploadError, data } = await supabase.storage
          .from('tracks')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        if (data) {
          const { data: { publicUrl } } = supabase.storage
            .from('tracks')
            .getPublicUrl(fileName);

          // Update track record
          const { error: updateError } = await supabase
            .from('tracks')
            .update({ 
              url: publicUrl,
              name: file.name 
            })
            .eq('id', trackId);

          if (updateError) throw updateError;

          // Update local state
          setTracks(tracks.map(t => 
            t.id === trackId 
              ? { ...t, url: publicUrl, name: file.name }
              : t
          ));
        }

        setTrackMenu({ isOpen: false, trackId: null });
      } catch (error) {
        console.error('Error replacing audio:', error);
      }
    };

    input.click();
  };

  const handleDownload = async (track: Track) => {
    try {
      const response = await fetch(track.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = track.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setTrackMenu({ isOpen: false, trackId: null });
    } catch (error) {
      console.error('Error downloading track:', error);
    }
  };

  if (!session || !project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="absolute top-4 left-4">
        <Link href="/dashboard/projects" className="inline-flex items-center text-sm text-white/75 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-[1000px] py-20">
          <div className="flex gap-12">
            <div className="w-[500px] flex-shrink-0">
              <div 
                className="relative aspect-square rounded-lg overflow-hidden bg-[#1A1A1A]"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {project.cover_url ? (
                  <Image
                    src={project.cover_url}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#7C96FF] to-[#4DBAFF]" />
                )}
                
                {isHovering && (
                  <div 
                    className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <p className="text-white text-sm">Change cover</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </div>

              <div className="mt-8 space-y-2">
                <div className="flex items-center gap-4">
                  {isEditingTitle ? (
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      onBlur={handleTitleUpdate}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleTitleUpdate();
                        if (e.key === 'Escape') setIsEditingTitle(false);
                      }}
                      className="flex-1 bg-transparent text-3xl font-medium text-white border-none focus:outline-none focus:ring-0"
                      autoFocus
                    />
                  ) : (
                    <h1 
                      className="flex-1 text-3xl font-medium text-white cursor-pointer"
                      onClick={() => setIsEditingTitle(true)}
                    >
                      {project.name}
                    </h1>
                  )}
                  <button
                    onClick={handlePlayAll}
                    className="p-3 text-white bg-[#1A1A1A] hover:bg-[#262626] rounded-full transition-colors"
                  >
                    {player.isPlayingAll ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-white/50">
                  {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'} • {totalDuration}
                </p>
              </div>
            </div>

            <div className="flex-1 pt-1">
              <button 
                onClick={handleFileSelect}
                className="w-full bg-[#1A1A1A] hover:bg-[#262626] text-white rounded-lg p-4 text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add tracks
              </button>
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="mt-6 space-y-1">
                {tracks.map((track, index) => (
                  <div 
                    key={track.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 group relative"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className="text-sm text-white/50 group-hover:hidden">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <button 
                        onClick={() => handlePlayPause(track)}
                        className="hidden group-hover:flex items-center justify-center text-white/50 hover:text-white transition-colors"
                      >
                        {player.currentTrack?.id === track.id && player.isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <div className="flex-1">
                      {editingTrackId === track.id ? (
                        <input
                          type="text"
                          value={newTrackName}
                          onChange={(e) => setNewTrackName(e.target.value)}
                          onBlur={handleSaveTrackName}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTrackName();
                            if (e.key === 'Escape') {
                              setEditingTrackId(null);
                              setNewTrackName("");
                            }
                          }}
                          className="flex-1 bg-transparent text-sm text-white border-none focus:outline-none focus:ring-0"
                          autoFocus
                        />
                      ) : (
                        <p className="text-sm text-white">{track.name}</p>
                      )}
                      <p className="text-xs text-white/50">12 hours ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePurchaseClick(track)}
                        className="p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                        title="Purchase track"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10"
                        onClick={(e) => handleTrackMenuOpen(track.id, e)}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    {trackMenu.isOpen && trackMenu.trackId === track.id && (
                      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div 
                          ref={menuRef}
                          className="w-[300px] bg-[#1A1A1A] rounded-lg shadow-xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                        >
                          <div className="p-4 border-b border-white/10">
                            <h3 className="text-lg font-medium text-white">Track options</h3>
                          </div>
                          <div className="p-2">
                            <button
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-white/10 rounded-lg"
                              onClick={() => handleEditTrackName(track.id)}
                            >
                              <Pencil className="h-4 w-4" />
                              Edit name
                            </button>
                            <button
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-white/10 rounded-lg"
                              onClick={() => handleReplaceAudio(track.id)}
                            >
                              <Replace className="h-4 w-4" />
                              Replace audio
                            </button>
                            <button
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-white/10 rounded-lg"
                              onClick={() => handleDownload(track)}
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </button>
                            <button
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-white/10 rounded-lg"
                              onClick={() => handleDeleteTrack(track.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {tracks.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-white/50">No tracks uploaded</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {player.currentTrack && (
        <>
          <audio
            ref={audioRef}
            src={player.currentTrack.url}
            className="hidden"
          />
          <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-white/10">
            <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-[#282828] rounded">
                  {project?.cover_url ? (
                    <Image
                      src={project.cover_url}
                      alt={project.name}
                      width={48}
                      height={48}
                      className="rounded object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#7C96FF] to-[#4DBAFF] rounded" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-white">{player.currentTrack.name}</p>
                  <p className="text-xs text-white/50">{project?.name}</p>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-4">
                  <button className="text-white/50 hover:text-white transition-colors">
                    <Shuffle className="h-4 w-4" />
                  </button>
                  <button className="text-white/50 hover:text-white transition-colors">
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handlePlayPause(player.currentTrack!)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {player.isPlaying ? (
                      <Pause className="h-4 w-4 text-black" />
                    ) : (
                      <Play className="h-4 w-4 text-black" />
                    )}
                  </button>
                  <button className="text-white/50 hover:text-white transition-colors">
                    <SkipForward className="h-4 w-4" />
                  </button>
                  <button className="text-white/50 hover:text-white transition-colors">
                    <Repeat className="h-4 w-4" />
                  </button>
                </div>
                <div className="w-full max-w-[500px] flex items-center gap-2">
                  <span className="text-xs text-white/50">
                    {Math.floor(player.progress / 60)}:{String(Math.floor(player.progress % 60)).padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full">
                    <div 
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(player.progress / player.duration) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/50">
                    {Math.floor(player.duration / 60)}:{String(Math.floor(player.duration % 60)).padStart(2, '0')}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 flex justify-end">
                <button 
                  onClick={() => setPlayer(prev => ({ ...prev, isPlaying: false, currentTrack: null }))}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Payment Modal */}
      {paymentModal.isOpen && paymentModal.track && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div 
            className="w-[400px] bg-[#1A1A1A] rounded-lg shadow-xl"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="p-4 border-b border-white/10">
              <h3 className="text-lg font-medium text-white">Purchase Track</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-white">{paymentModal.track.name}</p>
                <p className="text-2xl font-medium text-white mt-2">
                  ${paymentModal.track.price || '9.99'}
                </p>
              </div>
              
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/20"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/20"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-1/2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/20"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setPaymentModal({ isOpen: false, track: null })}
                  className="flex-1 px-4 py-2 text-sm text-white/75 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  className="flex-1 px-4 py-2 text-sm text-black bg-white hover:bg-white/90 rounded-lg transition-colors"
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 