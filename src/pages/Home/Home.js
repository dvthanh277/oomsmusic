import { useEffect, useState } from "react";
import BoxMusic from "../../components/BoxMusic/BoxMusic";
import ItemSong1 from "../../components/ItemSong1/ItemSong1";
import ItemSong2 from "../../components/ItemSong2/ItemSong2";
import Loading from "../../components/Loading/Loading";
import { apiPath } from "../../ultis/apiPath";
import request from "../../ultis/axios";
import './Home.scss'

function Home() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    console.log(data);
    useEffect(() => {
        request.get(apiPath.home).then((res) => {
            setLoading(false)
            setData(res.data.items)
        })
    }, [])

    if (loading) {
        return <Loading></Loading>;
    }
    else {
        const dataTop = data[4].items;
        const dataNew = data[3].items.all.filter((item, index) => item.isWorldWide).filter((item2, index2) => index2 < 5);
        const dataTrending = data[6].items.filter((item) => item.isWorldWide)
        return (
            <>
                <h2 className="ooms-title-head">{data[4].title}</h2>
                <div className="ooms-home-top">
                    {
                        dataTop.map((item, index) => {
                            return <BoxMusic props={item} key={index}></BoxMusic>
                        })
                    }
                </div>

                <div className="ooms-home-new">
                    <div className="ooms-container-left">
                        <h2 className="ooms-title-head">Mới phát hành</h2>
                        <div className="ooms-content-song">
                            {dataNew.map((item, index) => {
                                return <ItemSong1 props={item} key={index}></ItemSong1>
                            })}
                        </div>
                    </div>
                    <div className="ooms-container-right">
                        <h2 className="ooms-title-head">Trending</h2>
                        <div className="ooms-content-song">
                            {dataTrending.map((item, index) => {
                                return <ItemSong2 props={item} key={index}></ItemSong2>
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home;