import React, { useState, useEffect } from 'react';
import Heartbeat from './heartbeat';

const lyricsData = [
  { text: "Secrets I have held in my heart", duration: 5000 },
  { text: "Are harder to hide than I thought", duration: 4000 },
  { text: "Maybe I just wanna be yours", duration: 4000 },
  { text: "I wanna be yours, I wanna be yours", duration: 5000 },
  { text: "If you like your coffee hot", duration: 1200 },
  { text: "Wanna be yours", duration: 2400 },
  { text: "let me be your coffee pot", duration: 1600 },
  { text: "Wanna be yours", duration: 2400 },
  { text: "You call the shots babe", duration: 2300 },
  { text: "Wanna be yours", duration: 1600 },
  { text: "Just wanna be yours", duration: 2000 },
  { text: "wanna be yours", duration: 2400 },
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
    if (audioPermissionGranted) {
      const changeLyric = () => {
        setCurrentLyricIndex(prevIndex => (prevIndex + 1) % lyricsData.length);
      };
  
      // Set initial interval
      let timeoutId = setTimeout(changeLyric, lyricsData[currentLyricIndex].duration);
  
      // Clear and reset interval on lyric change
      return () => clearTimeout(timeoutId);
    }
  }, [audioPermissionGranted, currentLyricIndex]);
  

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
          {lyric.text}
        </div>
      ))}

     
    </div>
  );
};

export default Frontpage;
