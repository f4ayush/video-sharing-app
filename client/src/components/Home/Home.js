import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux';
import { allVideos } from "../../actions/allVideos";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import Videos from '../Videos/Videos';
export default function Home() {
    const dispatch = useDispatch();
    const error = useSelector(state=> state.error)
    const videos = useSelector(state => state.allVideos)
    const [videoError, setvideoError] = useState(error)
    const [videoList, setvideoList] = useState(videos)
    const location = useLocation()
    useEffect(() => {
        dispatch(allVideos());
    }, [dispatch, location]);
    useEffect(() => {
        setvideoError(error)
        setvideoList(videos)

        return ()=>{
        setvideoError("")
        setvideoList([])
        }
    }, [error, videos, location]);
    return (
        <div>
            <Videos videoList={videoList}/>
        </div>
    )
}
