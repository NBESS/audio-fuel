import React, { useEffect, useReducer } from 'react';
import hash from './hash'
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import './App.css';
// import { Playlist } from './components/Playlist';
import axios from 'axios';
// import Player from './components/Player'

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';



const initialState = {
  token: null,
  item: {},
  is_playing: 'Paused',
  progress_ms: 0,
  no_data: false,
  is_error: false,
}

// Data fetch reducer to manage state during API calls
function reducer(state, action) {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        token: hash.access_token,
        no_data: true,
        is_error: false,
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        token: hash.access_token,
        item: action.payload.item,
        is_playing: false, // action.payload.is_playing,
        progress_ms: 0,// action.payload.progress_ms,
        no_data: false,
        is_error: false,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        no_data: true,
        is_error: true,
      }
    default:
      throw new Error();
  }
}



// Set initial state
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Handles state during axios requests
  useEffect(() => {
    let didCancel = false;
    // const playlistEndpoint = 'playlists/37i9dQZF1DXbYM3nMM0oPk';
    const apiUrl = `https://api.spotify.com/v1/${playlistEndpoint}`;

    const fetchData = async () => {

      dispatch({ type: FETCH_INIT });

      try {
        // Make a call using the token
        const result = await axios.get(apiUrl, {
          headers: { "Authorization": "Bearer " + state.token },
          timeout: 5000
        });

        if (!didCancel) {
          dispatch({
            type: FETCH_SUCCESS, payload: {
              item: result.data, 
            }
          })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: FETCH_FAILURE });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [state.token]);



  return (
    <div >
      <div className="header"><h1>AudioFuel</h1></div>
      <div className="App">
        {/* <header className="App-header"> */}
        <p></p>
        {!state.token && (
          <a
            className="btn btn--loginApp-link col-6"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {state.token && !state.no_data && (
          //   <Player
          //     item={state.item}
          //     // is_playing={state.is_playing}
          //     // progress_ms={state.progress_ms}
          //   />
          // )}
          <>
            <div className='playlist-wrapper'>
              <div className='playlist-name'><h3>{state.item.name}</h3></div>
              <div className='track-count'>Tracks: {state.item.tracks.total}</div>
              <div className='playlist-window col-4'>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.item.tracks.items.map((track, i) => {
                      const { name, album, artists } = track.track;
                      return (

                        <tr key={i} className='playlist-border'>
                          <td><img className='cover-art' src={album.images[0].url} alt='cover art' /></td>
                          <td className='song-info'><div className='song-title'>{name}</div><div className='artist-name'>{artists[0].name}</div></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {state.no_data && (
          <p>
            You need to be playing a song on Spotify, for something to appear here.
          </p>
        )}
        {state.is_error && <div>Something went wrong during authorization</div>}
        {/* </header> */}
      </div>
      {/* <Playlist item={state.item} /> */}
    </div >
  );
}

export default App;

