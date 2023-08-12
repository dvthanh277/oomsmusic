import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoxMusic from '../../components/BoxMusic/BoxMusic';
import ItemSong from '../../components/ItemSong/ItemSong';
import Loading from '../../components/Loading/Loading';
import { apiPath } from '../../ultis/apiPath';
import request from '../../ultis/axios';
import './Search.scss';

function Search() {
    const params = useParams();
    const searchValue = params.search;
    console.log(searchValue);
    const [dataSearch, setDataSearch] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request.get(apiPath.search + searchValue).then(async (res) => {
            console.log(res);
            if (res.data) {
                setLoading(false);
                setDataSearch(res.data);
            } else {
                alert('Không có kết quả tìm kiếm');
            }
        });
    }, [searchValue]);
    if (loading) {
        return <Loading></Loading>;
    } else {
        return (
            <>
                <h2 className='ooms-search-header'>
                    Kết quả tìm kiếm <span className='search-value'>{searchValue}</span>
                </h2>

                <div className='ooms-search-container'>
                    <h2 className='ooms-title-head'>Bài hát</h2>
                    <div className='ooms-search-song'>
                        {dataSearch.songs.map((item, index) => {
                            return <ItemSong props={item} list={dataSearch.songs} key={index}></ItemSong>;
                        })}
                    </div>

                    <h2 className='ooms-title-head'>Playlist</h2>
                    <div className='ooms-home-top'>
                        {dataSearch.playlists.map((item, index) => {
                            return <BoxMusic props={item} key={index}></BoxMusic>;
                        })}
                    </div>
                </div>
            </>
        );
    }
}

export default Search;
