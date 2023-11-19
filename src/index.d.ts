/** @param {MediaOpts & MediaArgs} */
export default function useMediaDevice({ autoStart, ...mediaArgs }?: MediaOpts & MediaArgs): {
    media: MediaStream;
    startMedia: () => void;
    stopMedia: (opts?: MediaOpts) => void;
    stopAudio: (id?: string | undefined) => void;
    stopVideo: (id?: string | undefined) => void;
    takePhoto: (opts?: PhotoOpts) => string;
    videoRef: React.MutableRefObject<React.ElementRef<"video">>;
};
export type MediaOpts = {
    audio?: boolean;
    video?: boolean;
};
export type MediaArgs = {
    /**
     * Start media permissions when component is loaded
     */
    autoStart?: boolean;
};
export type PhotoOpts = {
    /**
     * Disable camera after taking photo
     */
    disableCamera?: boolean;
    /**
     * Image format
     */
    format?: "image/png" | "image/jpeg" | "image/webp";
    /**
     * Image quality
     */
    quality?: number;
};
