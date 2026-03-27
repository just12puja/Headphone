"use client";

import { useRef, useEffect, useState } from "react";

export default function VideoSequence() {
    const video1Ref = useRef<HTMLVideoElement>(null);
    const video2Ref = useRef<HTMLVideoElement>(null);

    const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

    useEffect(() => {
        const v1 = video1Ref.current;
        const v2 = video2Ref.current;

        if (!v1 || !v2) return;

        // When Video 1 completes, transition cleanly to Video 2
        const handleV1End = () => {
            setActiveVideo(2);
            v2.currentTime = 0;
            v2.play().catch(() => {});
        };

        // When Video 2 completes, transition cleanly back to Video 1 (continuous loop)
        const handleV2End = () => {
            setActiveVideo(1);
            v1.currentTime = 0;
            v1.play().catch(() => {});
        };

        v1.addEventListener("ended", handleV1End);
        v2.addEventListener("ended", handleV2End);

        // Kickstart the sequence natively on mount
        v1.play().catch(() => {});

        return () => {
            v1.removeEventListener("ended", handleV1End);
            v2.removeEventListener("ended", handleV2End);
        };
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <video
                ref={video1Ref}
                src="/videos/videoI.mp4"
                playsInline
                muted
                preload="auto"
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${activeVideo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            />
            <video
                ref={video2Ref}
                src="/videos/videoII.mp4"
                playsInline
                muted
                preload="auto"
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${activeVideo === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            />
        </div>
    );
}
