import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ItemSong2 from "../../components/ItemSong2/ItemSong2";
import Loading from "../../components/Loading/Loading";
import { apiPath } from "../../ultis/apiPath";
import request from "../../ultis/axios";

import './Songs.scss'
function Songs() {
    const location = useLocation();
    var id = location.state;
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    useEffect(() => {
        request.get(apiPath.listSong + id).then((res) => {
            console.log(res.data);
            if (res.data) {
                setLoading(false)
                setData(res.data)
            }
        })
    }, [id])
    if (loading) {
        return <Loading></Loading>
    }
    else {
        return (<>
            <h1 className="ooms-title-head">Tất cả bài hát - <span className="color-text">{data.items[0]?.artistsNames}</span></h1>
            <div className="ooms-all-song">
                {data.items.map((item, index) => {
                    return <ItemSong2 props={item} list={data.items} key={index}></ItemSong2>
                })}
            </div>
        </>);
    }

}

export default Songs;