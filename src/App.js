import React, {useState} from 'react';
import './App.css';






function Playlist() {
  const [tracks, setTracks] = useState([{name: '400 Degreez'}])
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
    <div className="Track">
      <span>{track.name}</span>
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}

function MoodSelector({moods}) {
  return (
    <div>
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

