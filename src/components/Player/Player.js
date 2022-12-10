import { useState, useEffect, useContext } from 'react';
import './Player.scss'
import { secondsToHms, hmsToSeconds } from '../../ultis/time'
import request from '../../ultis/axios';
import { SongContext } from '../../Layout/DefaultLayout/DefaultLayout';

function Player({ song }) {
    const [play, setPlay] = useState(false)
    const [volume, setVolume] = useState(true)
    const [volumeValue, setVolumeValue] = useState(1)
    const [currentTime, setCurrentTime] = useState('00:00');
    const [srcAudio, setSrcAudio] = useState('');
    const listPlay = JSON.parse(localStorage.getItem("listPlay"))
    if (listPlay) {
        var currentPlay = listPlay.findIndex((item) => item.encodeId === song.encodeId);
    }
    const context = useContext(SongContext)
    useEffect(() => {
        resetPlay();
        if (song.encodeId !== null && song.encodeId !== '') {
            request.get(`/song?id=${song.encodeId}`).then(async (res) => {
                if (res.data) {
                    setPlay(true)
                    setSrcAudio(res.data[128])
                }
                else {
                    // if (!song.isWorldWide) {
                    //     request.get(res.url).then(async (res2) => {
                    //         if (res2.data) {
                    //             setPlay(true)
                    //             setSrcAudio(res.data[128])
                    //         }
                    //     })
                    // }
                    console.log(res.msg)
                }
            });
        }
    }, [song]);


    const handlePlay = () => {
        let track = document.querySelector('#track');
        if (!play) {
            track.play()
        }
        else {
            track.pause();
        }
        setPlay(!play)
    }
    const handleVolume = () => {
        let track = document.querySelector('#track');
        setVolume(!volume)
        if (volume) {
            track.volume = 0;
            setVolumeValue(0)

        }
        else {
            track.volume = 1
            setVolumeValue(1)
        }
    }
    const handleNextSong = () => {
        if (currentPlay + 1 < listPlay.length) {
            resetPlay();
            context.handleClickSong(listPlay[currentPlay + 1], listPlay)
        }
    }
    const handlePrevSong = () => {
        if (currentPlay - 1 >= 0) {
            resetPlay();
            context.handleClickSong(listPlay[currentPlay - 1], listPlay)
        }
    }
    const hanldeOnTimeUpdate = () => {
        let track = document.querySelector('#track');;
        if (Math.floor(track.currentTime + 1) >= song.duration) {
            handleNextSong();
        }
        setCurrentTime(secondsToHms(track.currentTime))
    }
    const handleChangeTime = (e) => {
        let track = document.querySelector('#track');
        let value = e.target.value;
        track.currentTime = value;
        setCurrentTime(value)
        // if (value === 0) {
        //     track.volume = 0
        //     setVolume(false)
        // }
        // else {
        //     track.volume = value;
        //     setVolume(true)
        // }
        // setVolumeValue(value)
    }
    const handleChangeVolume = (e) => {
        let track = document.querySelector('#track');
        let value = e.target.value / 100;
        if (value === 0) {
            track.volume = 0
            setVolume(false)
        }
        else {
            track.volume = value;
            setVolume(true)
        }
        setVolumeValue(value)
    }
    const resetPlay = () => {
        let track = document.querySelector('#track');
        track.currentTime = 0
        track.pause();
    }
    return (
        <div className='ooms-player' id='ooms-player'>
            <div className='ooms-player-wrapper'>

                <div className='player-left'>
                    <div className='player-thumb'>
                        <img src={song.thumbnailM || '../../images/music.jpg'} alt={song.title}></img>
                        {play ? <><div className='waveBg'></div><div className="wave">
                            <div className="obj"></div>
                            <div className="obj"></div>
                            <div className="obj"></div>
                            <div className="obj"></div>
                            <div className="obj"></div>
                            <div className="obj"></div>
                            <div className="obj"></div>
                            <div className="obj"></div>
                        </div></> : ``}

                    </div>
                    <div className='player-title'>
                        <p className='player-name'>{song.title}</p>
                        <p className='player-singer'>{song.artistsNames}</p>
                    </div>
                </div>
                <div className='player-center'>
                    <div className='player-controls'>
                        <ul>
                            <li>
                                <button onClick={handlePrevSong}>
                                    <span className='ooms-icon prev'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                                        </svg>
                                    </span>
                                </button>

                            </li>

                            {play ? <li>
                                <button onClick={handlePlay}>
                                    <span className='ooms-icon pause'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </button>
                            </li> : <li>
                                <button onClick={handlePlay}>
                                    <span className='ooms-icon play'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </button>
                            </li>}

                            <li>
                                <button onClick={handleNextSong}>
                                    <span className='ooms-icon next'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className='player-progress'>
                        <input className="slider" id='sliderTime' type="range" min="0" max={song.duration} value={hmsToSeconds(currentTime)} onChange={handleChangeTime} />
                        <p className='time'>{currentTime}</p>
                        <p className='duration'>{secondsToHms(song.duration)}</p>
                    </div>
                </div>
                <div className='player-right'>
                    <div className='player-volume'>
                        {!volume
                            ? <button onClick={handleVolume}>
                                <span className='ooms-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                                    </svg>
                                </span>
                            </button>
                            : <button onClick={handleVolume}>
                                <span className='ooms-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                                        <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                                    </svg>
                                </span>
                            </button>}
                        <input className="slider" id='sliderVolume' type="range" min="0" max="100" value={volumeValue * 100} onChange={handleChangeVolume} />
                    </div>
                    {/* <div className='player-download'>
                        <a href={srcAudio} download>
                            <span className='ooms-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            </svg>
                            </span>
                        </a>

                    </div> */}
                </div>
                <audio
                    id="track"
                    autoPlay
                    controls
                    controlsList='download'
                    src={srcAudio}
                    onTimeUpdate={hanldeOnTimeUpdate}
                >Your browser does not support HTML5 Audio! 😢
                </audio>
            </div>

        </div>
    );
}

export default Player;