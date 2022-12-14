import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import BoxMusic from "../../components/BoxMusic/BoxMusic";
import ItemSong from "../../components/ItemSong/ItemSong";
import Loading from "../../components/Loading/Loading";
import { SongContext } from "../../Layout/DefaultLayout/DefaultLayout";
import { apiPath } from "../../ultis/apiPath";
import request from "../../ultis/axios";

import './DetailList.scss'
function DetailList() {
    const params = useParams();
    const location = useLocation();
    var id = location.state || params.id.replace(".html", "");
    const [loading, setLoading] = useState(true)
    const [listPlay, setListPlay] = useState([]);
    const [listBottom, setListBottom] = useState([]);
    const context = useContext(SongContext)
    useEffect(() => {
        setLoading(true)
        request.get(apiPath.detailPlaylistBottom + id).then((res) => {
            if (res.data) {
                request.get(apiPath.detailPlaylist + id).then((res2) => {
                    setLoading(false)
                    setListPlay(res2.data);
                    setListBottom(res.data);
                })
            }
        })


        // window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id])

    const handleClickPlayAll = () => {
        let listPlaySong = listPlay.song.items;
        if (listPlaySong.length <= 0) {
            alert("Nội dung này không tải được cho quốc gia của bạn!")
            return
        }
        context.handleClickSong(listPlaySong[0], listPlaySong)
    }
    if (loading) {
        return <Loading></Loading>
    }
    else {
        const listPlaySong = listPlay.song.items
        const listSinger = listBottom[0].items.filter((item, index) => index < 6)
        const listPlaySuggest1 = listBottom[1].items.filter((item, index) => index < 10)
        return (
            <>
                <div className="ooms-playlist">
                    <div className="ooms-playlist-player">
                        <h2 className="ooms-title-head">{listPlay.title}</h2>
                        <div className="vinyl-container">
                            <div className={context.isPlay ? `record` : `record record-paused`}>
                                <div className="label">
                                    <img src={context.song.thumbnailM} alt="" />
                                </div>
                            </div>
                            <div className={context.isPlay ? `dvd` : `dvd dvd-paused`}>
                                <div className="label">
                                    <img src={context.song.thumbnailM} alt="" />
                                </div>
                            </div>
                            <div className="box">
                                <img src={listPlay.thumbnailM} alt="" />
                            </div>
                            <div className="play">
                                <img src="../../images/vinyl.png" alt="vinyl"></img>
                            </div>
                        </div>
                        <div className="ooms-playlist-info">
                            <p className="playlist-subtitle">{listPlay.sortDescription}</p>
                            <p className="playlist-singer">{listPlay.artistsNames}</p>
                            <button className="playlist-playAll" onClick={handleClickPlayAll}>
                                <span className="ooms-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                                </span> Phát tất cả</button>
                        </div>
                    </div>
                    <div className="ooms-playlist-song">
                        {listPlaySong.map((item, index) => {
                            return <ItemSong props={item} list={listPlaySong} key={index}></ItemSong>;
                        })}
                    </div>

                </div>
                <div className="ooms-playlist-singer">
                    <h2 className="ooms-title-head">{listBottom[0].title}</h2>
                    <div className="ooms-singer-wrapper">
                        {
                            listSinger.map((item, index) => {
                                return <div className="ooms-boxSinger" key={index}>
                                    <div className="box-image">
                                        <Link to={'/artist/' + item.alias} state={item.alias}><img src={item.thumbnail} alt={item.name}></img>
                                        </Link>
                                    </div>
                                    <Link to={'/artist/' + item.alias} state={item.alias}><p className="box-title">{item.name}</p></Link>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="ooms-playlist-suggets1">
                    <h2 className="ooms-title-head">{listBottom[1].title}</h2>
                    <div className="ooms-home-top">
                        {
                            listPlaySuggest1.map((item, index) => {
                                return <BoxMusic props={item} key={index}></BoxMusic>
                            })
                        }
                    </div>
                </div>
            </>
        );
    }


}

export default DetailList;