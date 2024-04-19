import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faBackward, faPlay, faForward, faExpand, faPause, faVolumeXmark, faCompress } from '@fortawesome/free-solid-svg-icons';

import './Video.css';

const Video = ({ src }) => {
  const mainVideoRef = useRef(null);
  const currentTimeRef = useRef(0);
  const durationTimeRef = useRef(0);
  const containerRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [selectedSpeed, setSelectedSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);

  useEffect(() => {
    // Acceder al elemento de video una vez que el componente esté montado
    const videoElement = mainVideoRef.current;

    videoElement.addEventListener("timeupdate", e => {handleTimeUpdate(e)});
    /* videoElement.addEventListener("loadeddata", e => {handleLoadedData(e)}); */

    videoElement.playbackRate = selectedSpeed;

    // Limpiar los event listeners al desmontar el componente
    return () => {
      videoElement.removeEventListener("timeupdate", e => {handleTimeUpdate(e)});
      /* videoElement.removeEventListener("loadeddata", e => {handleLoadedData(e)}); */
    };

  }, [selectedSpeed, src]);

  /* useEffect(() => {
    const mainVideo = mainVideoRef.current;
    // Restablecer todas las propiedades relacionadas con el video cuando cambie la fuente del video
    if (mainVideo) {
      mainVideo.currentTime = 0;
      mainVideo.playbackRate = 1;
      mainVideo.pause();
      setIsPlaying(false);
      setVolume(0.5);
    }
  }, [src]); */

  const toggleSpeedOptions = () => {
    setShowSpeedOptions(!showSpeedOptions);
  };

  const handleClickPipBtn = () => {
    const mainVideo = mainVideoRef.current;
    mainVideo.requestPictureInPicture();
  }

  const handleTimeUpdate = (e) => {
    
    const { currentTime, duration } = e.target;

    const time = currentTimeRef.current;
    const durationTime = durationTimeRef.current;

    setCurrentTime(currentTime);
    setProgressWidth((currentTime / duration) * 100);

    time.textContent = formatTime(currentTime);
    durationTime.textContent = formatTime(duration);
  };

  const handlePlayPause = () => {
    const mainVideo = mainVideoRef.current;
    if (isPlaying) {
      mainVideo.pause();
    } else {
      mainVideo.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = () => {
    const mainVideo = mainVideoRef.current;
    const newVolume = volume === 0 ? 0.5 : 0;
    setVolume(newVolume);
    mainVideo.volume = newVolume;
  };

  const handleValueBarInput = (e) => {
    const mainVideo = mainVideoRef.current;
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    mainVideo.volume = newVolume;
  }

  const handleForward = () => {
    const mainVideo = mainVideoRef.current;
    mainVideo.currentTime += 10;
  }

  const handleBackward = () => {
    const mainVideo = mainVideoRef.current;
    mainVideo.currentTime -= 10;
  }

  const handleFullScreen = () => {
    if (!fullscreen) {
      const container = containerRef.current;
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setFullscreen(!fullscreen);
  };

  const handleSpeedChange = (speed) => {
    const mainVideo = mainVideoRef.current;
    mainVideo.playbackRate = speed;
    setSelectedSpeed(speed);
  };

  return (
    <div className="container-video show-controls" ref={containerRef}>
        <div className="wrapper">
            <div className="video-timeline">
                <div className="progress-area">
                  <span>{formatTime(currentTime)}</span>
                  <div className="progress-bar" style={{ width: `${progressWidth}%` }}></div>
                </div>
            </div>
            <ul className="video-controls">
                <li className="options left">
                    <button className="volume" onClick={handleVolumeChange}>{ volume === 0 ? <FontAwesomeIcon icon={faVolumeXmark} /> : <FontAwesomeIcon icon={faVolumeHigh} />}</button>
                    <input type="range" min="0" max="1" step="any" value={volume} onInput={handleValueBarInput} />
                    <div className="video-timer">
                        <p className="current-time" ref={currentTimeRef}>00:00</p>
                        <p className="separator"> / </p>
                        <p className="video-duration" ref={durationTimeRef}>00:00</p>
                    </div>
                </li>
                <li className="options center">
                    <button className="skip-backward" onClick={handleBackward}><FontAwesomeIcon icon={faBackward} /></button>
                    <button className="play-pause" onClick={handlePlayPause}>{ isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} /> }</button>
                    <button className="skip-forward" onClick={handleForward}><FontAwesomeIcon icon={faForward} /></button>
                </li>
                <li className="options right">
                    <div className="playback-content">
                        <button className="playback-speed" onClick={toggleSpeedOptions}><span className="material-symbols-rounded">slow_motion_video</span></button>
                        <ul className={`speed-options ${showSpeedOptions ? 'show' : ''}`}>
                          <li onClick={() => handleSpeedChange(2)} data-speed="2" className={selectedSpeed === 2 ? "active" : ""}>2x</li>
                          <li onClick={() => handleSpeedChange(1.5)} data-speed="1.5" className={selectedSpeed === 1.5 ? "active" : ""}>1.5x</li>
                          <li onClick={() => handleSpeedChange(1)} data-speed="1" className={selectedSpeed === 1 ? "active" : ""}>Normal</li>
                          <li onClick={() => handleSpeedChange(0.75)} data-speed="0.75" className={selectedSpeed === .75 ? "active" : ""}>0.75x</li>
                          <li onClick={() => handleSpeedChange(0.5)} data-speed="0.5" className={selectedSpeed === .5 ? "active" : ""}>0.5x</li>
                        </ul>
                    </div>
                    <button className="pic-in-pic" onClick={handleClickPipBtn}><span className="material-icons">picture_in_picture_alt</span></button>
                    <button className="fullscreen" onClick={handleFullScreen}>{ fullscreen ? <FontAwesomeIcon icon={faCompress} /> : <FontAwesomeIcon icon={faExpand} />}</button>
                </li>
            </ul>
        </div>
        <video src={src} ref={mainVideoRef} onClick={handlePlayPause}></video>
    </div>
  );
};


const formatTime = time => {
  let seconds = Math.floor(time % 60),
      minutes = Math.floor(time / 60) % 60,
      hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if(hours === 0) {
      return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

export default Video;
