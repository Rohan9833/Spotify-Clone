import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  ChevronRight, Disc3, Heart, Library, Pause, Play, RefreshCw, Search,
  SkipBack, SkipForward, Volume2, Waves,
} from "lucide-react";
import "../Styles/home.css";

const API_URL = "https://spotify-clone-mvo1.onrender.com";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [query, setQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  const getSongs = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${API_URL}/api/music/getallmusic`);
      setSongs(result.data.musics || []);
    } catch (error) {
      console.error("Unable to load music library:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getSongs(); }, []);

  const filteredSongs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return songs;
    return songs.filter((song) =>
      [song.title, song.artist].filter(Boolean).some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [songs, query]);

  const playSong = (song) => {
    if (!audioRef.current) return;
    if (currentSong?._id === song._id) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch((error) => console.error("Playback failed:", error));
      return;
    }
    setCurrentSong(song);
    audioRef.current.src = song.url;
    audioRef.current.play().catch((error) => console.error("Playback failed:", error));
    setIsPlaying(true);
  };

  const playAdjacent = (direction) => {
    if (!currentSong || filteredSongs.length === 0) return;
    const currentIndex = filteredSongs.findIndex((song) => song._id === currentSong._id);
    const nextIndex = (currentIndex + direction + filteredSongs.length) % filteredSongs.length;
    playSong(filteredSongs[nextIndex]);
  };

  const handleSeek = (event) => {
    const nextProgress = Number(event.target.value);
    if (!audioRef.current || !duration) return;
    audioRef.current.currentTime = (nextProgress / 100) * duration;
    setProgress(nextProgress);
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
  };

  return (
    <div className="music-page">
      <section className="hero-panel">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <span className="eyebrow"><Waves size={15} /> YOUR SOUND, YOUR SPACE</span>
          <h1>Music that feels <span>alive.</span></h1>
          <p>Discover your library, press play, and let the room disappear.</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => filteredSongs[0] && playSong(filteredSongs[0])} disabled={!filteredSongs.length}>
              <Play size={17} fill="currentColor" /> Start listening
            </button>
            <button className="secondary-action" onClick={getSongs} disabled={loading}>
              <RefreshCw size={17} className={loading ? "spin" : ""} /> Refresh
            </button>
          </div>
        </div>
        <div className="hero-disc"><div className="disc-ring disc-ring-one" /><div className="disc-ring disc-ring-two" /><div className="disc-center"><Disc3 size={54} /></div></div>
      </section>

      <section className="library-header">
        <div><span className="section-kicker">LIBRARY</span><h2>Your collection</h2></div>
        <div className="library-count"><Library size={16} /> {songs.length} tracks</div>
      </section>

      <div className="search-bar">
        <Search size={19} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search songs or artists..." aria-label="Search songs or artists" />
        {query && <button onClick={() => setQuery("")}>Clear</button>}
      </div>

      <section className="song-grid">
        {loading ? Array.from({ length: 6 }).map((_, index) => <div className="song-skeleton" key={index} />) :
          filteredSongs.length ? filteredSongs.map((song, index) => {
            const active = currentSong?._id === song._id;
            return (
              <article className={`song-card ${active ? "is-active" : ""}`} key={song._id}>
                <div className="artwork">
                  <div className="artwork-shine" /><span>{String(index + 1).padStart(2, "0")}</span>
                  <button className="artwork-play" onClick={() => playSong(song)} aria-label={active && isPlaying ? `Pause ${song.title}` : `Play ${song.title}`}>
                    {active && isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                  </button>
                </div>
                <div className="song-details">
                  <div className="song-title-row">
                    <div><h3>{song.title}</h3><p>{song.artist || "Unknown artist"}</p></div>
                    <button className="icon-button" aria-label="Like song"><Heart size={17} /></button>
                  </div>
                  <button className="play-text" onClick={() => playSong(song)}>
                    {active && isPlaying ? "Playing now" : "Play track"} <ChevronRight size={15} />
                  </button>
                </div>
              </article>
            );
          }) : (
            <div className="empty-state"><Disc3 size={42} /><h3>{query ? "No tracks found" : "Your library is empty"}</h3><p>{query ? "Try another title or artist." : "Refresh the library or upload your first track."}</p></div>
          )}
      </section>

      <audio ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => { const audio = event.currentTarget; setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0); }}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={() => playAdjacent(1)}
      />

      <div className="player-dock">
        <div className="player-track"><div className="mini-art"><Disc3 size={20} /></div><div><strong>{currentSong?.title || "Nothing playing"}</strong><span>{currentSong?.artist || "Choose a track to begin"}</span></div></div>
        <div className="player-controls">
          <div className="transport">
            <button onClick={() => playAdjacent(-1)} disabled={!currentSong}><SkipBack size={18} fill="currentColor" /></button>
            <button className="main-play" onClick={() => currentSong && playSong(currentSong)} disabled={!currentSong}>{isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button>
            <button onClick={() => playAdjacent(1)} disabled={!currentSong}><SkipForward size={18} fill="currentColor" /></button>
          </div>
          <div className="progress-row"><span>{formatTime((progress / 100) * duration)}</span><input type="range" min="0" max="100" value={progress} onChange={handleSeek} aria-label="Playback progress" /><span>{formatTime(duration)}</span></div>
        </div>
        <div className="player-volume"><Volume2 size={17} /><div className="volume-line" /></div>
      </div>
    </div>
  );
};

export default Home;
