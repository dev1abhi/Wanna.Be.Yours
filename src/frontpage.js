import React, { useState, useEffect } from 'react';
import Heartbeat from './heartbeat';

const lyricsData = [
  "Secrets I have held in my heart",
  "Are harder to hide than I thought",
  "Maybe I just wanna be yours",
  "I wanna be yours, I wanna be yours",
  // Add more lyrics as needed
];

const Frontpage = ({onStartVideoPlayback}) => {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [audioPermissionGranted, setAudioPermissionGranted] = useState(false);

  // Function to request audio permission
  const requestAudioPermission = () => {
    const audio = new Audio();
    audio.src = '/music/wannabeyours.mp3';
    audio.volume = 0; // Mute the audio
    console.log("c");
    audio.play().then(() => {
      setAudioPermissionGranted(true);
    }).catch((error) => {
      console.error('Error playing audio:', error);
    });
    console.log("d");
  };

  // useEffect to request audio permission when the component mounts
  useEffect(() => {

    // Event listener to play audio when the user clicks anywhere on the page
    const playAudioOnClick = () => {
      if (!audioPermissionGranted) {
        requestAudioPermission();
        onStartVideoPlayback();
      }
    };

    console.log("a");
    console.log(audioPermissionGranted);
    document.body.addEventListener('click', playAudioOnClick);

    return () => {
        console.log("b");
      document.body.removeEventListener('click', playAudioOnClick);
    };


  }, [audioPermissionGranted]);




  // useEffect for changing lyrics
  useEffect(() => {
    let intervalId;
    if (audioPermissionGranted) {
      intervalId = setInterval(() => {
        setCurrentLyricIndex((prevIndex) => (prevIndex + 1) % lyricsData.length);
      }, 6000); // Adjust timing as needed
    }
    return () => clearInterval(intervalId);
  }, [audioPermissionGranted]);

  return (
    <div className="lyrics-container">
      {audioPermissionGranted && (
        <audio controls loop autoPlay style={{ position: 'absolute', left: '-9999px', opacity: '0' }}>
          <source src="/music/wannabeyours1.mp4" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {lyricsData.map((lyric, index) => (
        <div
          key={index}
          className={`lyric ${index === currentLyricIndex ? 'active' : ''}`}
        >
          {lyric}
        </div>
      ))}

     
    </div>
  );
};

export default Frontpage;
