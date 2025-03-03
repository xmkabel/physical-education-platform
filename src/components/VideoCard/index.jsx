import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './video-card.css';

function VideoCard(video) {
    return (
        <Link to={`/video/${video.id}`}>
            <Card className="video-card">
                <div className="video-wrapper">
                    <video
                        src={video.src}
                        preload="metadata"
                        disablePictureInPicture
                        controlsList="nodownload"
                        disableRemotePlayback
                    ></video>
                    <div className="hover-overlay">
                        <span className="watch-now">شاهد الآن</span>
                    </div>
                </div>
                <Card.Body>
                    <Card.Title>{video.title}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default VideoCard;