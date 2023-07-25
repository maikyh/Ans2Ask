import React from "react";
import "./Course.css";

const Course = ({video}) => {
  return (
    <div className="Course">
        <div className="card mt-4" style={{ width: '900px' }}>
            <div className="row no-gutters">
            <div className="col-md-6">
                <iframe
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
                    <h5 className="card-title">{video.title}</h5>
                    <p className="card-text">
                        {video.views} | {video.date} | Duration: {video.duration} | {video.likes} likes
                    </p>
                    <div className="d-flex flex-column align-items-center" style={{marginTop: "30px"}}>
                        <div style={{ maxWidth: '100px' }}>
                            <img src={video.channel.thumbnail} className="card-img-top" alt={video.channel.name} />
                        </div>
                        <a href={video.channel.link} className="btn btn-info mt-2">Visit Channel</a>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>

  );
}

export default Course;