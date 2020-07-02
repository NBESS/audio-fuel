import React from 'react'
import './Player.css'

export default function Player({ item, is_playing, progress_ms }) {
    const backgroundStyles = {
        backgroundImage: `url(${
            item.album.images[0].url
            })`,
    };

    const progressBarStyles = {
        width: (progress_ms * 100 / item.duration_ms) + '%'
    };

    return (
        <div className="App">
            <div className="main-wrapper">
                <div className="now-playing__img">
                    <img src={item.album.images[0].url} alt="currently playing album cover"/>
                </div>
                <div className="now-playing__side">
                    <div className="now-playing__name">{item.name}</div>
                    <div className="now-playing__artist">
                        {item.artists[0].name}
                    </div>
                    <div className="now-playing__status">
                        {is_playing ? "Playing" : "Paused"}
                    </div>
                    <div className="progress">
                        <div className="progress__bar" style={progressBarStyles} />
                    </div>
                </div>
                <div className="background" style={backgroundStyles} />{" "}
            </div>
        </div>
    );
}
