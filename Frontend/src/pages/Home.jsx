import { useState } from "react";
import "../Styles/home.css";
import axios from "axios";
import { useRef } from "react";

const HOME = () => {
  let [songs, Setsongs] = useState([]);
  const audioRef = useRef(null);

  async function getthemall() {
    const result = await axios.get(
      "https://spotify-clone-mvo1.onrender.com/api/music/getallmusic",
    );
    Setsongs(result.data.musics);
  }

  function playsong(song) {
    audioRef.current.src = song.url;

    console.log(song);
    audioRef.current.play();
  }
  return (
    <div className="music-container">
      <h1
        style={{ textAlign: "center", color: "#FFC570", marginBottom: "30px" }}
      >
        My Spotify Pro
      </h1>

      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for songs, artists..."
          className="search-input"
        />
      </div>

      <div className="song-list">
        {songs.map((song) => (
          <div key={song._id} className="song-card">
            <div className="song-info">
              <div className="play-placeholder">
                <span
                  style={{
                    fontSize: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  🎵
                </span>
              </div>
              <div>
                <h3 className="song-title">{song.title}</h3>
                <p className="song-artist">{song.artist}</p>
              </div>
            </div>
            <button onClick={() => playsong(song)} className="play-button">
              ▶ Play
            </button>
          </div>
        ))}
      </div>

      {songs.length === 0 && (
        <button onClick={getthemall} className="play-button get-music-btn">
          ✨ Refresh Library
        </button>
      )}

      <div className="player-section">
        <audio ref={audioRef} controls />
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div className="music-container">
  //       {/* Search Bar Section */}
  //       <div className="search-wrapper">
  //         <input
  //           type="text"
  //           placeholder="Search for songs, artists..."
  //           className="search-input"
  //         />
  //         <span className="search-icon">🔍</span>
  //       </div>

  //       {/* Music List Section */}
  //       <div className="song-list">
  //         {songs.map((song) => (
  //           <div key={song._id} className="song-card">
  //             <div className="song-info">
  //               <div className="play-placeholder"></div>
  //               <div>
  //                 <h3 className="song-title">{song.title}</h3>
  //                 <p className="song-artist">{song.artist}</p>
  //               </div>
  //             </div>
  //             <button
  //               onClick={() => {
  //                 playsong(song);
  //               }}
  //               className="play-button actual-play"
  //             >
  //               <span className="play-icon">▶</span> Play Music
  //             </button>
  //           </div>
  //         ))}
  //       </div>
  //       <button onClick={getthemall} className="play-button">
  //         <span className="play-icon">▶</span> Get Music
  //       </button>

  //       <audio ref={audioRef} controls>
  //         click
  //       </audio>
  //     </div>
  //   </>
  // );
};

export default HOME;
