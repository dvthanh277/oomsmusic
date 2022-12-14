import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BoxMusic from "../../components/BoxMusic/BoxMusic";
import ItemSong from "../../components/ItemSong/ItemSong";
import Loading from "../../components/Loading/Loading";
import { SongContext } from "../../Layout/DefaultLayout/DefaultLayout";
import { apiPath } from "../../ultis/apiPath";
import request from "../../ultis/axios";

import './Artist.scss'
function Artist() {
    const location = useLocation();
    var name = location.state;
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    // const [listPlay, setListPlay] = useState([]);
    // const context = useContext(SongContext)
    useEffect(() => {
        request.get(apiPath.artist + name).then((res) => {
            if (res.data) {
                setLoading(false)
                setData(res.data)
            }
        })
    }, [name])


    if (loading) {
        return <Loading></Loading>
    }
    else {
        const dataSong = data.sections[0];
        const dataPlaylist = data.sections.filter(item => item.sectionType === "playlist");
        return (
            <>
                <div className="ooms-artist">
                    <div className="artist-info">
                        <div className="artist-image">
                            <img src={data.thumbnailM} alt={data.realname}></img>
                        </div>
                        <div className="artist-text">
                            <p className="name">{data.realname}</p>
                            <p className="birtday">{data.birthday}</p>
                            <p className="info"><>{data.sortBiography.replaceAll("<br>", "\n")}</></p>
                        </div>
                    </div>
                    <div className="artist-section">
                        <div className="artist-song">
                            <h2 className="ooms-title-head">{dataSong.title}
                                <Link to={'/songs' + data.link} state={data.id} className="ooms-view-more">Xem tất cả</Link>
                            </h2>
                            <div className="artist-song-wrapper">
                                {dataSong.items.filter((item, index) => index < 20).map((item, index) => {
                                    return <ItemSong props={item} list={dataSong.items} key={index}></ItemSong>
                                })}
                            </div>
                        </div>
                        {dataPlaylist.map((item, index) =>
                            <div className="artist-album" key={index}>
                                <h2 className="ooms-title-head">{item.title}
                                </h2>
                                <div className="artist-album-wrapper">
                                    {
                                        item.items.filter((item, index) => index < 10).map((item2, index2) => {
                                            return <BoxMusic props={item2} key={index2}></BoxMusic>
                                        })
                                    }
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            </>
        );
    }


}

export default Artist;