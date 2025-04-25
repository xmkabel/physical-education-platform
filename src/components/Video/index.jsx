import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress, faPlay, faPause,faRedo } from '@fortawesome/free-solid-svg-icons';
import './video.css';
import videos from '../../videos'; // Import the videos array

const Video = ({path,title}) => {
    // const { id } = useParams();
    // const [video, setVideo] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isPlayed,setIsPlayed]=useState(false);
    const [progress, setProgress] = useState(0);

    const handleProgress = () => {
        const video = document.getElementById('vid');
        const progress = (video.currentTime / video.duration) * 100;
        setProgress(progress);
    };

    const handleSeek = (e) => {
        const video = document.getElementById('vid');
        const seekTime = (e.target.value / 100) * video.duration;
        video.currentTime = seekTime;
        setProgress(e.target.value);
    };

    const handleReplay = () => {
        const video = document.getElementById('vid');
        video.currentTime = 0;
        video.play();
        setIsPlayed(true);
    };

    // useEffect(() => {
    //     const currentVideo = videos.find(v => v.id === parseInt(id));
    //     setVideo(currentVideo);
    // }, [id, videos]);

    const toggleFullScreen = () => {
        const videoElement = document.querySelector('.video-container');
        if (!document.fullscreenElement) {
            videoElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    };

  

    return (
        
            <div className="video-container">
              <button     className={`play ${isPlayed ? 'hidden' : ''}`}  onClick={()=>{!isPlayed?document.getElementById('vid').play():document.getElementById('vid').pause(); setIsPlayed(!isPlayed)}}>

                {!isPlayed?<FontAwesomeIcon fontSize={'20px'} icon={faPlay} />:<FontAwesomeIcon fontSize={'20px'} icon={faPause} />}
              </button>
                <video 
                    id='vid'
                    onEnded={() => setIsPlayed(false)} 
                    onTimeUpdate={handleProgress}
                    className="main-video"
                >
                
                    <source src={path} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                <div className="video-controls">
                    <button 
                        className="fullscreen-btn"
                        onClick={toggleFullScreen}
                    >
                        <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
                    </button>
                </div>

                <div className="video-info">
                    <h2 className="video-title">{title}</h2>
                    <div className="video-controls-bar">
                        <div className="controls-left">
                            <button className="control-btn" 
                                onClick={() => {
                                    !isPlayed ? document.getElementById('vid').play() : document.getElementById('vid').pause();
                                    setIsPlayed(!isPlayed)
                                }}>
                                {!isPlayed ? 
                                    <FontAwesomeIcon icon={faPlay} /> : 
                                    <FontAwesomeIcon icon={faPause} />
                                }
                            </button>
                            <button className="control-btn" onClick={handleReplay}>
                                <FontAwesomeIcon icon={faRedo} />
                            </button>
                        </div>
                        <div className="progress-container">
                            <input 
                                type="range" 
                                className="progress-bar" 
                                value={progress} 
                                onChange={handleSeek}
                                min="0" 
                                max="100" 
                                step="0.1"
                            />
                        </div>
                    </div>
                </div>
            </div>
       
    );
};

export default Video;