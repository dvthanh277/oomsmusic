import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ItemSong1 from "../../components/ItemSong1/ItemSong1";
import ItemSong2 from "../../components/ItemSong2/ItemSong2";
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
            console.log(res.data);
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
                                    return <ItemSong2 props={item} list={dataSong.items} key={index}></ItemSong2>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }


}

export default Artist;