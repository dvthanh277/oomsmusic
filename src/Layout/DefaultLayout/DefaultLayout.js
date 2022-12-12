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

    const handleClickSong = (songValue, list) => {
        localStorage.setItem('listPlay', JSON.stringify(list.filter(item => item.streamingStatus === 1)))
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
        <>
            <SongContext.Provider value={value}>
                <Header></Header>
                <div className="ooms-content" id="ooms-content">{children}</div>
                <Navbar></Navbar>
                <Player song={song}></Player>
            </SongContext.Provider>
        </>
    );
}
export default DefaultLayout;