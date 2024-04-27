

import { useEffect } from 'react';
import React, { useRef } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({playVideo}) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playVideo && playerRef.current) {
      //starting the loop
      startLoop();
    }
  }, [playVideo]);

  const onReady = (event) => {
    // Accessing the YouTube player reference
    playerRef.current = event.target;
   
  };



  const startLoop = () => {
    // Set the start time of the loop in seconds
    const startTime = 10;
    // Set the end time of the loop in seconds
    const endTime = 180;

    // Check if the player reference is available
    if (playerRef.current) {
      // Play the video
      playerRef.current.playVideo();

      // Listen for the 'onStateChange' event to detect when the video ends
      const interval = setInterval(() => {
        // Get the current playback time of the video
        const currentTime = playerRef.current.getCurrentTime();

        // If the video playback time reaches the end time of the loop, seek to the start time
        if (currentTime >= endTime) {
          playerRef.current.seekTo(startTime);
        }
      }, 1000); // Check every second

      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }
  };

  // Video ID of the YouTube video you want to embed
  const videoId = '_JJAAhRR_88';

  return (
    <div className="video-container"> {/* Apply CSS class for styling */}
      <div className="rounded-video" >
        <YouTube videoId={videoId} opts={{ playerVars: {autoplay: 0, mute: 1,start:10,controls:0,modestbranding:0} }} onReady={onReady}/>
       

      </div>
    </div>
  );
};

export default VideoPlayer;
