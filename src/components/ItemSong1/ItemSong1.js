
import { useContext } from 'react';
import { SongContext } from '../../Layout/DefaultLayout/DefaultLayout';
import { secondsToHms } from '../../ultis/time'

import './ItemSong1.scss'
function ItemSong1({ props, list }) {
    const context = useContext(SongContext)
    return (
        <div className="ooms-item-song1">
            <div className="song-head">
                <img className="song-thumb" src={props.thumbnail} alt={props.title} onClick={() => context.handleClickSong(props, list)}></img>
                <p onClick={() => context.handleClickSong(props, list)} className={`song-title ${context.song.encodeId === props.encodeId ? `active` : ``}`} title={props.title}>{props.title}</p>
            </div>

            <p className="song-singer"> {props.artistsNames} </p>
            <p className="song-duration">{secondsToHms(props.duration)}</p>
            {context.song.encodeId === props.encodeId
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
                : <button onClick={() => context.handleClickSong(props, list)} className="song-play"><span className="ooms-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                </svg>
                </span></button>}

        </div>
    );
}

export default ItemSong1;