import { createContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Player from "../../components/Player/Player";
import { apiPath } from "../../ultis/apiPath";
import request from "../../ultis/axios";
import './DefaultLayout.scss'

export const SongContext = createContext();

function DefaultLayout({ children }) {
    const [song, setSong] = useState([])
    const [isPlay, setIsPlay] = useState(false);

    const handleClickSong = async (songValue, list) => {
        if (list) {
            localStorage.setItem('listPlay', JSON.stringify(list.filter(item => item.streamingStatus === 1)))
        }
        let listPlay = JSON.parse(localStorage.getItem("listPlay"));
        let songIndex = listPlay.findIndex((item) => item.encodeId === songValue.encodeId);
        if (songIndex === listPlay.length - 1) {
            await request.get(apiPath.recommendSong + songValue.encodeId).then((resRecommend) => {
                if (resRecommend.data) {
                    let listPlayNew = [...listPlay, ...resRecommend.data.items]
                    let filterDuplicate = new Set(listPlayNew)
                    let listPlayFilter = [...filterDuplicate]
                    localStorage.setItem('listPlay', JSON.stringify(listPlayFilter.filter(item => item.streamingStatus === 1)))
                }
            })
        }
        setSong(songValue)
    }
    const handleIsPlay = (playValue) => {
        localStorage.setItem('isPlay', playValue)
        setIsPlay(playValue)
    }
    const value = {
        song,
        isPlay,
        handleClickSong,
        handleIsPlay
    }
    return (
        <SongContext.Provider value={value}>
            <div className="ooms-content" id="ooms-content">
                <Header></Header>
                <Navbar></Navbar>
                <div className="ooms-content-wrapper"> {children}</div>
                <Player song={song}></Player>
            </div>

        </SongContext.Provider>
    );
}
export default DefaultLayout;