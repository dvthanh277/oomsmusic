import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemSong1 from "../../components/ItemSong1/ItemSong1";
import Loading from "../../components/Loading/Loading";
import request from "../../ultis/axios";

function DetailList() {
    const location = useLocation();
    var id = location.state;
    const [loading, setLoading] = useState(true)
    const [listPlay, setListPlay] = useState([]);

    useEffect(() => {
        request.get(`/detailplaylist?id=${id}`).then((res) => {
            console.log(res);
            setLoading(false)
            setListPlay(res.data.song.items);
        })
    }, [id])
    if (loading) {
        return <Loading></Loading>
    }
    else {
        return (
            <div className="ooms-content-song">
                {listPlay.map((item, index) => {
                    return <ItemSong1 props={item} list={listPlay} key={index}></ItemSong1>
                })}
            </div>
        );
    }


}

export default DetailList;