import React, { useState, useContext, useRef } from 'react';
import ReactAvatarEditor from "react-avatar-editor";
import { UserContext } from '../../UserContext.js';
import Text from '../../utils/Text.jsx';
import Content from '../../utils/Content.jsx';
import './UploadImage.css';

const url = 'http://localhost:3001';

const UploadImage = ({handleSetIsUpdating}) => {
    const { user, darkMode } = useContext(UserContext);

    const [image, setImage] = useState("");
    const [allowZoomOut, setAllowZoomOut] = useState(false);
    const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [borderRadius, setBorderRadius] = useState(50);
    const [preview, setPreview] = useState(null);
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);

    const editorRef = useRef(null);

    const handleNewImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleScale = (e) => {
        const scale = parseFloat(e.target.value);
        setScale(scale);
    };

    const handlePositionChange = (position) => {
        setPosition(position);
    };

    const handleSubmit = async (e) => {
        if (editorRef.current) {
            const img = editorRef.current.getImageScaledToCanvas().toDataURL();
            const response = await fetch(url + `/upload` + `/${user.email}`, {
                method: 'POST',
                body: JSON.stringify({ data: img }),
                headers: { 'Content-type': 'application/json' },
            });

            setTimeout(() => {
                handleSetIsUpdating();
                window.location.reload();
            }, 0);
        }
    }

    const handleGoBack = async (e) => {
        handleSetIsUpdating();
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-4" style={{color: darkMode ? Text.darkMode : Text.lightMode}}>
                    <ReactAvatarEditor
                        style={{ backgroundColor: darkMode ? Content.darkMode : "rgba(248,249,250,1)" }}
                        ref={editorRef}
                        scale={parseFloat(scale)}
                        width={width}
                        height={height}
                        position={position}
                        onPositionChange={handlePositionChange}
                        rotate={parseFloat(rotate)}
                        borderRadius={width / (100 / borderRadius)}
                        image={image}
                        color={[255, 255, 255, 0.6]}
                        className="editor-canvas"
                    />
                </div>
                <div className="col-md-4">
                    <label className='mb-2'>
                        <input
                            name="upload-img-input"
                            type="file"
                            onChange={handleNewImage}
                        />
                    </label>
                    <br />
                    <div className="text-center mb-1">
                        <input
                            name="scale"
                            type="range"
                            onChange={handleScale}
                            min={allowZoomOut ? "0.1" : "1"}
                            max="2"
                            step="0.01"
                            defaultValue="1"
                        />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary p-1 px-2" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <button className="btn btn-danger p-1 px-2" onClick={handleGoBack}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadImage;