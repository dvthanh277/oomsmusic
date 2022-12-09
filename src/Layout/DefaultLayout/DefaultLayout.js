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
    // useEffect(() => {
    //     request.get(apiPath.newMusic).then((res) => {
    //         setListSong(res.data)
    //     })
    // }, [])
    const handleClickSong = (songValue) => {
        setSong(songValue)
    }
    const value = {
        song,
        handleClickSong
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