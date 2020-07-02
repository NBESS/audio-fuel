import React, { useState } from 'react';

export function Playlist() {

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

    // useEffect(async () => {
    //   const result = await axios(
    //     url: "https://api.spotify.com/v1/me/player",
    //     type: "GET",
    //     beforeSend: (xhr) => {
    //       xhr.setRequestHeader("Authorization", "Bearer " + token);
    //     },
    //     success: (data) => {
    //       this.setState({
    //         item: data.item,
    //         is_playing: data.is_playing,
    //         progress_ms: data.progress_ms,

    //   );

    //   setToken({ token: hash.access_token });
    // })

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

function Track({ track, onRemove }) {
    return (
        <div className="Track" style={{ margin: '10px' }}>
            <span>{track.name}</span>
            <button onClick={onRemove}>Remove</button>
        </div>
    )
}

function MoodSelector({ moods }) {
    return (
        <div style={{ margin: '10px' }}>
            <h3>Display tracks according to your mood</h3>
            <p>Select your current mood from the list below</p>
            <select>

                <option type='radio' value="chill" selected={moods.chill}> Chill</option>

                <option type='radio' value="energized" selected={moods.energized}> Energized</option>

                <option type='radio' value="blue" selected={moods.blue}> Blue</option>
            </select>
        </div>
    )
}