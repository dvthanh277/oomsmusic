import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';


import BoxMusic from "../../components/BoxMusic/BoxMusic";
import BoxMusic2 from "../../components/BoxMusic2/BoxMusic2";
import ItemSong1 from "../../components/ItemSong1/ItemSong1";
import ItemSong2 from "../../components/ItemSong2/ItemSong2";
import Loading from "../../components/Loading/Loading";
import { apiPath } from "../../ultis/apiPath";
import request from "../../ultis/axios";

import 'swiper/css';

import './Home.scss'

function Home() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
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
        const dataSlide = data[0].items.filter((item, index) => item.type !== 8)
        const dataTop = data[4].items;
        const dataNew = data[3].items.all.filter((item2, index2) => index2 < 5);
        const dataTrending = data[6].items
        const dataSinger = data[8].items;
        const dataTop100 = data[9].items.filter((item2, index2) => index2 < 4);
        const dataNewDay = data[5].items;
        return (
            <>
                <div className="ooms-home-slider">
                    <Swiper
                        spaceBetween={40}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}

                    >
                        {dataSlide.map((item, index) => {
                            return <SwiperSlide key={index}>
                                <Link to={item.link} state={item.encodeId}><img src={item.banner} alt={item.description} />
                                </Link>
                            </SwiperSlide>
                        })}
                    </Swiper>
                </div>
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
                        <h2 className="ooms-title-head mt-60">
                            Mới phát hành
                            <Link to='/newmusic' className="ooms-view-more">Xem thêm</Link>
                        </h2>
                        <div className="ooms-content-song">
                            {dataNew.map((item, index) => {
                                return <ItemSong1 props={item} list={dataNew} key={index}></ItemSong1>
                            })}
                        </div>
                    </div>
                    <div className="ooms-container-right">
                        <h2 className="ooms-title-head mt-60">
                            Trending
                            <Link to='/trending' className="ooms-view-more">Xem thêm</Link>
                        </h2>
                        <div className="ooms-content-song">
                            {dataTrending.map((item, index) => {
                                return <ItemSong2 props={item} list={dataTrending} key={index}></ItemSong2>
                            })}
                        </div>
                    </div>
                </div>

                <h2 className="ooms-title-head mt-60">Ca sĩ nổi bật</h2>
                <div className="ooms-home-singer">
                    {
                        dataSinger.map((item, index) => {
                            return <div className="ooms-boxSinger" key={index}>
                                <div className="box-image">
                                    <Link to={'artist/' + item.alias} state={item.alias}><img src={item.thumbnail} alt={item.name}></img>
                                    </Link>
                                </div>
                                <Link to={'artist/' + item.alias} state={item.alias}><p className="box-title">{item.name}</p></Link>
                            </div>
                        })
                    }

                </div>
                <h2 className="ooms-title-head mt-60">{data[9].title}</h2>
                <div className="ooms-home-top">
                    {
                        dataTop100.map((item, index) => {
                            return <BoxMusic2 props={item} key={index}></BoxMusic2>
                        })
                    }
                </div>

                <h2 className="ooms-title-head">{data[5].title}</h2>
                <div className="ooms-home-top">
                    {
                        dataNewDay.map((item, index) => {
                            return <BoxMusic props={item} key={index}></BoxMusic>
                        })
                    }
                </div>
            </>
        )
    }
}

export default Home;