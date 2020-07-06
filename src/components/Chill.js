import React from 'react';
import { Link } from 'react-router-dom';




export default function Chill({playlistId, item, handlePlaylistChange}) {
    
    const coverStyles = {
        borderRadius: '10px',
        margin: '5px',
    }
    const playlistScroll = {
        height: '220px',
        overflow: 'auto',
        whiteSpace: 'nowrap',
    }

    return (
        <>
            <div style={{display: 'flex'}}><h2 style={{margin: '10px 10px 0'}}>Recommended Playlists</h2></div>
            <div className="playlist-links" style={playlistScroll}>
                <div className="playlist-cover" style={{display: 'inline-block'}} ><a href='#' onClick={handlePlaylistChange}><img id="37i9dQZF1DX7nn7vNFcZ3X" style={coverStyles} src="https://i.scdn.co/image/ab67706f00000002009cef72865de2ad416b785c" height={200} alt="cover" /></a></div>
                <div className="playlist-cover" style={{display: 'inline-block'}} ><a href='#' onClick={handlePlaylistChange}><img id="37i9dQZF1DWSSBwgXMlrMk" style={coverStyles} src="https://i.scdn.co/image/ab67706f0000000265f59d04664888d3a8bf7ba4" height={200} alt="cover" /></a></div>
                <div className="playlist-cover" style={{display: 'inline-block'}} ><a href='#' onClick={handlePlaylistChange}><img id="37i9dQZF1DX2UgsUIg75Vg" style={coverStyles} src="https://i.scdn.co/image/ab67706f000000022b29b4a26e620ccd2bd2d2f8" height={200} alt="cover" /></a></div>
                <div className="playlist-cover" style={{display: 'inline-block'}} ><a href='#' onClick={handlePlaylistChange}><img id="37i9dQZF1DX6ziVCJnEm59" style={coverStyles} src="https://i.scdn.co/image/ab67706f000000025ae7aa0454c9eafdd6505fda" height={200} alt="cover" /></a></div>
            </div>
            <div className='track-list'></div>
            <div><Link to='/'>Home</Link></div>
        </>
    )
}
