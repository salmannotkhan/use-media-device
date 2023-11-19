import React, { useEffect, useRef, useState } from "react";

/**
 * @typedef {object} MediaOpts
 * @prop {boolean} [audio]
 * @prop {boolean} [video]
 *
 * @typedef {object} MediaArgs
 * @prop {boolean} [autoStart] Start media permissions when component is loaded
 *
 * @typedef {object} PhotoOpts
 * @prop {boolean} [disableCamera=true] Disable camera after taking photo
 * @prop {"image/png" | "image/jpeg" | "image/webp"} [format] Image format
 * @prop {number} [quality] Image quality
 */

const DEFAULT_MEDIA_OPTS = {
  audio: true,
  video: true,
};

const DEFAULT_MEDIA_ARGS = {
  ...DEFAULT_MEDIA_OPTS,
  autoStart: true,
};

/** @param {MediaOpts & MediaArgs} */
export default function useMediaDevice({
  autoStart,
  ...mediaArgs
} = DEFAULT_MEDIA_ARGS) {
  /** @type [MediaStream, React.Dispatch<React.SetStateAction<MediaStream>>] */
  const [media, setMedia] = useState();

  /** @type React.MutableRefObject<React.ElementRef<"video">> */
  const videoRef = useRef(null);

  useEffect(() => {
    if (!media) {
      if (autoStart) {
        navigator.mediaDevices.getUserMedia(mediaArgs).then(setMedia);
      }
    } else {
      setupVideo(media);
      return () => {
        for (const track of media.getTracks()) {
          track.stop();
        }
      };
    }
  }, [media, autoStart, mediaArgs]);

  /** @param {MediaStream} media */
  function setupVideo(media) {
    if (!videoRef.current) {
      throw Error("Please setup the videoRef before using camera");
    }
    videoRef.current.muted = true;
    videoRef.current.srcObject = media;
    videoRef.current.oncanplay = () => videoRef.current?.play();
  }

  function startMedia() {
    navigator.mediaDevices.getUserMedia(mediaArgs).then(setMedia);
  }

  /**
   * @param {MediaOpts} [opts=DEFAULT_MEDIA_ARGS]
   */
  function stopMedia(opts = DEFAULT_MEDIA_OPTS) {
    if (opts.audio) {
      stopAudio();
    }
    if (opts.video) {
      stopVideo();
    }
  }

  /**
   * @param {string=} id
   * @returns {void}
   */
  function stopVideo(id) {
    if (id) {
      return media?.getTrackById(id)?.stop();
    }
    for (const video of media?.getVideoTracks() || []) {
      video.stop();
    }
  }

  /**
   * @param {string=} id
   * @returns {void}
   */
  function stopAudio(id) {
    if (id) {
      return media?.getTrackById(id)?.stop();
    }
    for (const audio of media?.getAudioTracks() || []) {
      audio.stop();
    }
  }

  /**
   * @param {PhotoOpts} [opts] Photo options
   * @returns {string} Data URL of the image
   */
  function takePhoto(opts = { disableCamera: true, format: "image/jpeg" }) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw Error("Cannot find canvas context");
    }
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    if (opts.disableCamera) {
      stopVideo();
    }
    return canvas.toDataURL(opts.format, opts.quality);
  }

  return {
    media,
    startMedia,
    stopMedia,
    stopAudio,
    stopVideo,
    takePhoto,
    videoRef,
  };
}
