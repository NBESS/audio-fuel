import React, { useState, useEffect, useReducer } from 'react';
import { authEndpoint, redirectUri, scopes, clientId } from '../config'
import axios from 'axios';
import hash from '../hash';
import Chill from './Chill';
import '../App.css';
import { Link } from 'react-router-dom';

export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const GET_PLAYLIST = 'GET_PLAYLIST';

// Custom Reducer Hook for managing state during data fetch
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case FETCH_INIT:
            return {
                ...state,
                token: hash.access_token,
                no_data: true,
                is_error: false,
                is_loading: true,
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                token: hash.access_token,
                item: action.payload.item,
                no_data: false,
                is_error: false,
                is_loading: false
            };
        case FETCH_FAILURE:
            return {
                ...state,
                no_data: true,
                is_error: true,
                is_loading: false,
            };
        case GET_PLAYLIST:
            return {
                ...state,
                playlistId: action.payload.playlistId,
            };
        default:
            throw new Error();
    }
}

// Custom Hook for data fetching 
const useSpotifyApi = (initialUrl, initialItem) => {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        token: hash.access_token,
        item: initialItem,
        no_data: false,
        is_error: false,
        is_loading: true,
    })

    const doFetch = (data)=> {
        setUrl(data)
        
    }
    // Effect Hookk to track url changes
    useEffect(() => {
        let didCancel = false;  // Sets condition for aborting fetch
        const fetchData = async () => {
            console.log('should dispatch')
            dispatch({ type: FETCH_INIT });

            try {
                // Make a call using the token
                const result = await axios.get(url, {
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

        return () => {  // call back to initiate abort
            didCancel = true;
        };
    }, [url, state.token]);
    return [state, doFetch]
}

export function Playlist() {
    const [playlistId, setPlaylistId] = useState('');
    const [{ item, is_loading, is_error, no_data, token }, doFetch] = useSpotifyApi(  // use of custom Hook
        'https://api.spotify.com/v1/playlists/37i9dQZF1DX7nn7vNFcZ3X', null);

    // Event handler that captures id of playlist on click
    const handlePlaylistChange = (e) => {
        let newPlaylistId = e.target.getAttribute('id');
        setPlaylistId(newPlaylistId)
        doFetch(`https://api.spotify.com/v1/playlists/${newPlaylistId}`)
    }

    return (
        <>
            <div className="App">
                <div style={{ margin: '10px' }}>
                    <h3>Display Playlist according to your mood</h3>
                    <p>Click on a link in the list above then select a playlist below to view its track list
            </p>
                    {!token && (
                        <a style={{alignSelf: 'center'}}
                            className="btn btn--loginApp-link col-6"
                            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                                "%20"
                            )}&response_type=token&show_dialog=true`}
                        >
                            Login to Spotify
                        </a>
                    )}
                    {is_loading && (
                        <div>Loading...</div>
                    )}

                    {token && !no_data && item && (
                        <>
                        <Chill handlePlaylistChange={handlePlaylistChange} />

                            <div className='playlist-wrapper'>
                                <div className='playlist-name'><h3>{item.name}</h3></div>
                                <div className='track-count'>Tracks: {item.tracks.total}</div>
                                <div className='playlist-window col-4'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.tracks.items.map((track, i) => {
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
                    {is_error && <div>Something went wrong during authorization</div>}
                </div>
            </div >
        </>
    );
}