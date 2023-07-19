import React from "react";
import "./Course.css";

export default function QuestionGrid({video}) {
  return (
    <div className="Course">
        <div className="card" style={{ width: '18rem' }}>
            <img src={video.channel.thumbnail} className="card-img-top" alt={video.channel.name} />
            <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <p className="card-text">
                    {video.views} | {video.date} | Duration: {video.duration}
                </p>
                <a href={video.channel.link} className="btn btn-primary">Visit Channel</a>
            </div>
        </div>
    </div>
  );
}