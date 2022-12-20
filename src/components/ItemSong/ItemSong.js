
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SongContext } from '../../Layout/DefaultLayout/DefaultLayout';
import { secondsToHms } from '../../ultis/time'

import './ItemSong.scss'
function ItemSong({ props, list, style, no }) {
    const context = useContext(SongContext)
    return (
        <div className="ooms-item-song1">
            {/* {!props.isWorldWide ? <div className='isWorldWide'><p className='textNoti'>Nội dung này không tải được cho quốc gia của bạn!</p></div> : ``} */}
            {props.streamingStatus === 2 ? <div className='vip-song'><img src='../../images/vip.png' alt='vip-song'></img><span>VIP Song</span></div> : !props.isWorldWide ? <div className='isWorldWide'><img src='../../images/location.png' alt='location-song'></img><span>Nội dung này không tải được cho quốc gia của bạn!</span></div> : ``}
            <div className="song-head">
                {no ? <span className='song-no'>{no < 10 ? "0" + no : no}.</span> : ""}
                <img className={`song-thumb ${style}`} src={props.thumbnail} alt={props.title} onClick={() => context.handleClickSong(props, list)}></img>
                <div className='title-wrapper'>
                    <p onClick={() => context.handleClickSong(props, list)} className={`song-title ${context.song.encodeId === props.encodeId ? `active` : ``}`} title={props.title}>{props.title}</p>
                    <p className="song-singer">{props?.artists?.map((item, index) => <Link to={'/artist/' + item.alias} key={index} state={item.alias}>{item.name}{index + 1 === props.artists.length ? "" : " ,  "} </Link>)} </p>
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
                : <button onClick={() => context.handleClickSong(props, list)} className="song-play"><span className="ooms-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
                </svg>
                </span></button>}

        </div>
    );
}

export default ItemSong;