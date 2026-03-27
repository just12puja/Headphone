"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

interface CanvasSequenceProps {
    progress: MotionValue<number>;
    frameCount: number;
}

export default function CanvasSequence({ progress, frameCount }: CanvasSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(1);

    // Preload images
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameStr = i.toString().padStart(4, "0");
            img.src = `/sequence/${frameStr}.jpg`;
            images.push(img);
        }
        imagesRef.current = images;

        // Draw first frame once it loads
        images[0].onload = () => {
            drawFrame(1);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frameCount]);

    const drawFrame = (frameIndex: number) => {
        if (!canvasRef.current || !imagesRef.current.length) return;

        // Ensure index is within bounds
        const safeIndex = Math.max(1, Math.min(frameIndex, frameCount));
        const img = imagesRef.current[safeIndex - 1];

        if (!img) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        
        // Scale the context to match the DPR so drawing logic remains in CSS pixels
        ctx.scale(dpr, dpr);

        // Calculate aspect ratio to cover the screen completely.
        // The images have a built-in vignette background so we must cover 
        // the entire monitor to hide the edge seams!
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;

        let drawWidth = width;
        let drawHeight = height;

        if (canvasRatio > imgRatio) {
            drawWidth = width;
            drawHeight = width / imgRatio;
        } else {
            drawHeight = height;
            drawWidth = height * imgRatio;
        }

        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        // Enhance rendering quality natively for HD sharpness
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Clear and draw
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        currentFrameRef.current = safeIndex;
    };

    useMotionValueEvent(progress, "change", (latest) => {
        const targetFrame = Math.max(1, Math.min(frameCount, Math.round(latest * frameCount)));
        if (targetFrame !== currentFrameRef.current) {
            // We use requestAnimationFrame for hyper-smooth drawing
            requestAnimationFrame(() => drawFrame(targetFrame));
        }
    });

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            drawFrame(currentFrameRef.current);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none filter contrast-[1.15] saturate-[1.1] brightness-[1.02]"
        />
    );
}
