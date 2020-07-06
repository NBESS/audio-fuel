import React from 'react'



export default function Blue() {
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
                <div id="37i9dQZF1DXdmMcgFhLQ8u" className="playlist-cover" style={{display: 'inline-block'}} ><img style={coverStyles} src="https://i.scdn.co/image/ab67706f0000000287debe05df2a5723b4252b4f" height={200} alt="cover" /></div>
                <div id="37i9dQZF1DWVrtsSlLKzro" className="playlist-cover" style={{display: 'inline-block'}} ><img style={coverStyles} src="https://i.scdn.co/image/ab67706f000000023acc8ac34c3d813b39972ef1" height={200} alt="cover" /></div>
                <div id="37i9dQZF1DWSqBruwoIXkA" className="playlist-cover" style={{display: 'inline-block'}} ><img style={coverStyles} src="https://i.scdn.co/image/ab67706f00000002a25dc8af8a2938dbcd47114a" height={200} alt="cover" /></div>
                <div id="37i9dQZF1DX7gIoKXt0gmx" className="playlist-cover" style={{display: 'inline-block'}} ><img style={coverStyles} src="https://i.scdn.co/image/ab67706f0000000213601d4833623a4d6b328e38" height={200} alt="cover" /></div>
            </div>
        </>
    )
}
