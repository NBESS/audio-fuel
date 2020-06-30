import React, {useState, useEffect} from 'react';
import './App.css';
import hash from './hash';
import * as $ from 'jquery';
import axios from 'axios';


function Playlist() {
  const [tracks, setTracks] = useState([{ name: '400 Degreez' }])
  const [newTrack, setNewTrack] = useState('')
  const [moods, setMoods] = useState([
    {
      chill: true
    },
    {
      energized: false
    },
    {
      blue: false
    },
  ])
  const [_token, set_Token] = useState([{ token: null }])
  

  const authEndpoint = 'https://accounts.spotify.com/authorize';
  
    // Replace with your app's client ID, redirect URI and desired scopes
    const clientId = "6b37770d3e274415b07071b4bc3c6253";
    const redirectUri = "http://localhost:3000";
    const scopes = [
      "user-read-currently-playing",
      "user-read-playback-state",
      "user-read-private",
      "playlist-modify-public",
  
    ];
    

  // Get the hash of the url
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

    window.location.hash;

  const addTrack = track => setTracks([...tracks, track])

  const removeTrack = i => {
    setTracks([...tracks.slice(0, i), ...tracks.slice(i + 1)])
  }

  // const selectMood = i => {
  //   setMoods(moods.reduce())
  // }

  // const  handleMoodChange = 

  const handleAddClick = () => {
    if (newTrack === '') {
      return;
    }

    addTrack({ name: newTrack });
    setNewTrack('')
  };

    return (
      <>
      <div className="App">
        <header className="App-header">
        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {this.state.token && (
          <p></p>// Spotify Player Will Go Here In the Next Step
        )}
        </header>
      </div>
      <div className="MoodSelector">
        <h2>What is your current mood?</h2>
        <MoodSelector moods={moods} />
      </div>
      <div className='Tracks'>
        {tracks.map((track, i) => {
          return (
            <Track key={i} track={track} onRemove={() => removeTrack(i)} />
          )
        })}
      </div>
      <div className='add-tracks'>
        <label htmlFor="name">Name</label>
          <input 
          type="text"
          id="name" 
          placeholder="Enter a track"
          value={newTrack}
          onChange={e => setNewTrack(e.target.value)}
        />
        <button onClick={handleAddClick}>Add a track</button>
      </div>
      </>
    );
}

function Track({track, onRemove}) {
  return (
    <div className="Track" style={{margin: '10px'}}>
      <span>{track.name}</span>
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

function MoodSelector({moods}) {
  return (
    <div style={ {margin: '10px'} }>
      <h3>Display tracks in your current mood</h3>
      <p>Select your mood from the list below</p>
      <select>
        type='radio'
        <option value="chill" selected={moods.chill}> Chill</option>
        type='radio'
        <option value="energized" selected={moods.energized}> Energized</option>
        type='radio'
        <option value="blue" selected={moods.blue}> Blue</option>
      </select>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Welcome to AudioFuel</h1>
      <Playlist />
    </div>
  );
}

export default App;

