import { useState, useEffect, useContext } from 'react';
import './Player.scss'
import { secondsToHms, hmsToSeconds } from '../../ultis/time'
import request from '../../ultis/axios';
import { SongContext } from '../../Layout/DefaultLayout/DefaultLayout';
import { Link } from 'react-router-dom';
import { apiPath } from '../../ultis/apiPath';

function Player({ song }) {
    const [play, setPlay] = useState(false)
    const [volume, setVolume] = useState(true)
    const [volumeValue, setVolumeValue] = useState(1)
    const [currentTime, setCurrentTime] = useState('00:00');
    const [srcAudio, setSrcAudio] = useState('');

    const context = useContext(SongContext)
    const listPlay = JSON.parse(localStorage.getItem("listPlay")) || [];
    var currentPlay = 0;
    if (listPlay) {
        currentPlay = listPlay.findIndex((item) => item.encodeId === song.encodeId);
    }

    useEffect(() => {
        resetPlay();
        if (song.encodeId) {
            let songActive = document.querySelectorAll('.playlist-song .song.active');
            document.querySelector('.playlist-song').scrollTo({
                top: songActive[songActive.length - 1].offsetTop - 78 * 2,
                behavior: "smooth"
            })
            request.get(`/song?id=${song.encodeId}`).then(async (res) => {
                if (res.data) {
                    setPlay(true)
                    context.handleIsPlay(true)
                    setSrcAudio(res.data[128])
                    // Scroll current song
                }
                else {
                    if (res.err === -1110 || res.err === -1150) {
                        alert(res.msg)
                    }
                }
            });
        }
    }, [song]);

    const handlePlay = () => {
        let track = document.querySelector('#track');
        console.log(listPlay);
        if (!play) {
            track.play()
            context.handleIsPlay(true)
        }
        else {
            track.pause();
            context.handleIsPlay(false)
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
        console.log(currentPlay);
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
    const handleGetRecommendSong = async (id) => {
        await request.get(apiPath.recommendSong + id).then(async (resRecommend) => {
            if (resRecommend.data) {
                let listRecommend = [...resRecommend.data.items]
                return listRecommend
            }
        })
    }
    const hanldeOnTimeUpdate = () => {
        let track = document.querySelector('#track');;
        if (Math.floor(track.currentTime + 1) >= song.duration) {
            handleNextSong();
            // context.handleClickSong(listPlay[currentPlay], listPlay)
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
                <div className='player-playlist'>
                    <p className='playlist-title'>Danh sách phát</p>
                    <div className='playlist-song'>
                        {
                            listPlay.map((props, index) =>

                                <div className={`song ${context.song.encodeId === props.encodeId ? `active` : ``}`} key={index}>
                                    {/* {!props.isWorldWide ? <div className='isWorldWide'><p className='textNoti'>Nội dung này không tải được cho quốc gia của bạn!</p></div> : ``} */}
                                    {props.streamingStatus === 2 ? <div className='vip-song'><img src='../../images/vip.png' alt='vip-song'></img><span>VIP Song</span></div> : !props.isWorldWide ? <div className='isWorldWide'><img src='../../images/location.png' alt='location-song'></img><span>Nội dung này không tải được cho quốc gia của bạn!</span></div> : ``}
                                    <div className="song-head">
                                        <p className='song-number'>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</p>
                                        <img className='song-thumb' src={props.thumbnail} alt={props.title} onClick={() => context.handleClickSong(props)}></img>
                                        <div className='title-wrapper'>
                                            <p onClick={() => context.handleClickSong(props)} className={`song-title ${context.song.encodeId === props.encodeId ? `active` : ``}`} title={props.title}>{props.title}</p>
                                            <p className="song-singer">{props.artists.map((item, index) => <Link to={'/artist/' + item.alias} key={index} state={item.alias}>{item.name}{index + 1 === props.artists.length ? "" : " ,  "} </Link>)} </p>
                                        </div>
                                    </div>


                                    <p className="song-duration">{secondsToHms(props.duration)}</p>
                                    {context.song.encodeId === props.encodeId && context.isPlay
                                        ? <div className="wave">
                                            <div className="obj"></div>
                                            <div className="obj"></div>
                                            <div className="obj"></div>
                                            <div className="obj"></div>
                                            <div className="obj"></div>
                                            <div className="obj"></div>
                                            <div className="obj"></div>
                                            <div className="obj"></div>
                                        </div>
                                        : <button onClick={() => context.handleClickSong(props)} className="song-play">
                                            <span className="ooms-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                                </svg>
                                            </span></button>}
                                </div>
                            )
                        }

                    </div>
                </div>
                <div className='player-playing'>
                    <div className='player-info'>
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
                            <p className="player-singer">{song.artists?.map((item, index) => <Link to={'/artist/' + item.alias} key={index} state={item.alias}>{item.name}{index + 1 === song.artists.length ? "" : " • "}</Link>)} </p>

                        </div>
                    </div>

                    <div className='player-progress'>
                        <input className="slider" id='sliderTime' type="range" min="0" max={song.duration} value={hmsToSeconds(currentTime)} onChange={handleChangeTime} />
                        <p className='time'>{currentTime}</p>
                        <p className='duration'>{secondsToHms(song.duration)}</p>
                    </div>
                    <div className='player-controls'>
                        <ul>
                            <li>
                                <button>
                                    <span className='ooms-icon random'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 013.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 00-4.392-4.392 49.422 49.422 0 00-7.436 0A4.756 4.756 0 003.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 101.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 013.01-3.01c1.19-.09 2.392-.135 3.605-.135zm-6.97 6.22a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 004.392 4.392 49.413 49.413 0 007.436 0 4.756 4.756 0 004.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 00-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 01-3.01 3.01 47.953 47.953 0 01-7.21 0 3.256 3.256 0 01-3.01-3.01 47.759 47.759 0 01-.1-1.759L6.97 15.53a.75.75 0 001.06-1.06l-3-3z" clipRule="evenodd" />
                                        </svg>

                                    </span>
                                </button>
                            </li>
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

                            <li>
                                <button>
                                    <span className='ooms-icon loop'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
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
                    {/* <div className='player-lyrics'>
                        <button>Lyrics</button>
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