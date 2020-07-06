import React from 'react'
import { Link } from 'react-router-dom';

export default function Energized() {
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
                <div id="37i9dQZF1DWYNSm3Z3MxiM" className="playlist-cover" style={{display: 'inline-block'}} ><img style={coverStyles} src="https://i.scdn.co/image/ab67706f0000000274e332932155604ae4e59d89" height={200} alt="cover" /></div>
                <div id="37i9dQZF1DXe6bgV3TmZOL" className="playlist-cover" style={{display: 'inline-block'}} ><img style={coverStyles} src="https://i.scdn.co/image/ab67706f00000002c1917a8a76396af1ec4abe83" height={200} alt="cover" /></div>
                <div id="37i9dQZF1DX4eRPd9frC1m" className="playlist-cover" style={{display: 'inline-block'}} ><img style={coverStyles} src="https://i.scdn.co/image/ab67706f00000002122921a072ad2ca9ce90a456" height={200} alt="cover" /></div>
                <div id="37i9dQZF1DX8CwbNGNKurt" className="playlist-cover" style={{display: 'inline-block'}} ><img style={coverStyles} src="https://i.scdn.co/image/ab67706f000000023457ebc8f98b67b6df4c4f10" height={200} alt="cover" /></div>
            </div>
            <div><Link to='/'>Home</Link></div>
        </>
    )
}
