import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@/components/common/Container";
import { LuPlay, LuX } from "react-icons/lu";
import styles from "./Videos.module.css";

const videos = [
    {
        id: 1,
        title: "Event Highlights 1",
        description: "Professional event management and hospitality showcase",
        thumbnail: "/videos/video1.mp4",
        videoUrl: "/videos/video1.mp4"
    },
    {
        id: 2,
        title: "Event Highlights 2",
        description: "Guest experience and service excellence in action",
        thumbnail: "/videos/video2.mp4",
        videoUrl: "/videos/video2.mp4"
    },
    {
        id: 3,
        title: "Event Highlights 3",
        description: "Corporate hospitality and event coordination",
        thumbnail: "/videos/video3.mp4",
        videoUrl: "/videos/video3.mp4"
    }
];

export default function Videos() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <>
            <Helmet>
                <title>Videos | Yvonne Hospitality & Management</title>
            </Helmet>
            
            <div className={styles.videosPage}>
                <Container>
                    {/* Page Header */}
                    <div className={styles.header}>
                        <p className={styles.subtitle}>VIDEO GALLERY</p>
                        <h1 className={styles.title}>Event Highlights</h1>
                        <p className={styles.description}>
                            Watch memorable moments from events, showcasing our dedication to creating exceptional hospitality experiences.
                        </p>
                    </div>

                    {/* Video Grid */}
                    <div className={styles.videoGrid}>
                        {videos.map((video) => (
                            <div 
                                key={video.id} 
                                className={styles.videoCard}
                                onClick={() => setSelectedVideo(video.videoUrl)}
                            >
                                <div className={styles.videoThumbnail}>
                                    <video 
                                        src={video.thumbnail}
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className={styles.thumbnailVideo}
                                    />
                                    <div className={styles.playOverlay}>
                                        <button 
                                            className={styles.playButton}
                                            aria-label={`Play ${video.title}`}
                                        >
                                            <LuPlay size={32} />
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.videoInfo}>
                                    <h3>{video.title}</h3>
                                    <p>{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>

                {/* Video Modal */}
                {selectedVideo && (
                    <div className={styles.modal} onClick={() => setSelectedVideo(null)}>
                        <button 
                            className={styles.closeBtn}
                            onClick={() => setSelectedVideo(null)}
                            aria-label="Close video"
                        >
                            <LuX size={24} />
                        </button>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <video 
                                src={selectedVideo}
                                controls
                                autoPlay
                                className={styles.modalVideo}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
