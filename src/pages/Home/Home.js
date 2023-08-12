import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import BoxMusic from '../../components/BoxMusic/BoxMusic';
import BoxMusic2 from '../../components/BoxMusic2/BoxMusic2';
import ItemSong from '../../components/ItemSong/ItemSong';
import Loading from '../../components/Loading/Loading';
import { apiPath } from '../../ultis/apiPath';
import request from '../../ultis/axios';

import 'swiper/css';

import './Home.scss';
import { SongContext } from '../../Layout/DefaultLayout/DefaultLayout';

function Home() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const context = useContext(SongContext);
    useEffect(() => {
        request.get(apiPath.home).then((res) => {
            setLoading(false);
            setData(res.data.items);
        });
    }, []);

    if (loading) {
        return <Loading></Loading>;
    } else {
        const dataSlide = data[0].items.filter((item, index) => item.type === 4);

        const dataTopTitle = data.filter((item) => item.sectionId === 'hAutoTheme1')[0]?.title || '';
        const dataTop = data.filter((item) => item.sectionId === 'hAutoTheme1')[0]?.items || [];

        const dataNew =
            data
                .filter((item) => item.sectionType === 'new-release')[0]
                .items.all.filter((item2, index2) => index2 < 5) || [];

        const dataTrending = data.filter((item) => item.sectionType === 'RTChart')[0]?.items || [];

        const dataSinger =
            data.filter((item) => item.sectionId === 'hArtistTheme')[0]?.items.filter((item2, index2) => index2 < 6) ||
            [];

        const dataTop100Title = data.filter((item) => item.sectionId === 'h100')[0].title || '';
        const dataTop100 =
            data.filter((item) => item.sectionId === 'h100')[0]?.items.filter((item2, index2) => index2 < 3) || [];

        const dataNewDayTitle = data.filter((item) => item.sectionId === 'hAutoTheme2')[0]?.title || '';
        const dataNewDay = data.filter((item) => item.sectionId === 'hAutoTheme2')[0]?.items || [];
        return (
            <>
                <div className='ooms-home-slider'>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {dataSlide.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    {item.type === 1 ? (
                                        <img
                                            src={item.banner}
                                            alt={item.description}
                                            onClick={() => context.handleClickSong(item)}
                                        />
                                    ) : (
                                        <Link to={item.link} state={item.encodeId}>
                                            <img src={item.banner} alt={item.description} />
                                        </Link>
                                    )}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <h2 className='ooms-title-head'>{dataTopTitle}</h2>
                <div className='ooms-home-top'>
                    {dataTop.map((item, index) => {
                        return <BoxMusic props={item} key={index}></BoxMusic>;
                    })}
                </div>

                <div className='ooms-home-new'>
                    <div className='ooms-container-left'>
                        <h2 className='ooms-title-head mt-60'>
                            Mới phát hành
                            <Link to='/newmusic' className='ooms-view-more'>
                                Xem thêm
                            </Link>
                        </h2>
                        <div className='ooms-content-song'>
                            {dataNew.map((item, index) => {
                                return <ItemSong props={item} list={dataNew} key={index}></ItemSong>;
                            })}
                        </div>
                    </div>
                    <div className='ooms-container-right'>
                        <h2 className='ooms-title-head mt-60'>
                            Trending
                            <Link to='/trending' className='ooms-view-more'>
                                Xem thêm
                            </Link>
                        </h2>
                        <div className='ooms-content-song'>
                            {dataTrending.map((item, index) => {
                                return <ItemSong props={item} list={dataTrending} key={index}></ItemSong>;
                            })}
                        </div>
                    </div>
                </div>

                <h2 className='ooms-title-head mt-60'>Ca sĩ nổi bật</h2>
                <div className='ooms-home-singer'>
                    {dataSinger.map((item, index) => {
                        return (
                            <div className='ooms-boxSinger' key={index}>
                                <div className='box-image'>
                                    <Link to={'artist/' + item.artists[0].alias} state={item.artists[0].alias}>
                                        <img src={item.thumbnail} alt={item.name}></img>
                                    </Link>
                                </div>
                                <Link to={'artist/' + item.artists[0].alias} state={item.artists[0].alias}>
                                    <p className='box-title'>{item.name}</p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <h2 className='ooms-title-head mt-60'>{dataTop100Title}</h2>
                <div className='ooms-home-top'>
                    {dataTop100.map((item, index) => {
                        return <BoxMusic2 props={item} key={index}></BoxMusic2>;
                    })}
                </div>

                <h2 className='ooms-title-head mt-60'>{dataNewDayTitle}</h2>
                <div className='ooms-home-top'>
                    {dataNewDay.map((item, index) => {
                        return <BoxMusic props={item} key={index}></BoxMusic>;
                    })}
                </div>
            </>
        );
    }
}

export default Home;
