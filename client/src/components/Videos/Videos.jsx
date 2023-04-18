import React from 'react'
import VideoCard from '../../utilities/VideoCard'

export default function Videos({videoList}) {
  return (
    <div>
        {
            videoList.map(video=>(
                <VideoCard video={video} />
            ))
        }
    </div>
  )
}

{/* <video key={video._id} src={video.URL} height="500px" controls autoPlay>
                </video> */}