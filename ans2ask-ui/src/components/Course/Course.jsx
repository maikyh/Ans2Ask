import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext.js';
import "./Course.css";

const Course = ({video}) => {
    const { darkMode } = useContext(UserContext);

    return (
        <div className="Course">
            {
                video && video.videoDetails && video.channel &&
                <div className="card border mt-4" style={{ backgroundColor: darkMode ? "#2D3748" : "rgba(248,249,250,1)", width: '900px' }}>
                    <div className="row no-gutters">
                    <div className="col-md-6">
                        <iframe
                        className='border'
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.videoDetails.id.videoId}`}
                        title="YouTube Video Player"
                        frameBorder="0"
                        allowFullScreen
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h5 className="card-title" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>{video.title}</h5>
                            <p className="card-text" style={{color: darkMode ? "rgba(255, 255, 255, 0.92)" : "rgba(0,0,0,1)"}}>
                                {video.views} | {video.date} | Duration: {video.duration} | {video.likes} likes
                            </p>
                            <div className="d-flex flex-column align-items-center" style={{marginTop: "30px"}}>
                                <div style={{ maxWidth: '100px' }}>
                                    <img src={video.channel.thumbnail} className="card-img-top" alt={video.channel.name} />
                                </div>
                                <a href={video.channel.link} className="btn btn-info mt-2 fw-bold">Visit Channel</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            }
        </div>
  );
}

export default Course;