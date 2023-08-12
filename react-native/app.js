import React, { useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video';

const App = () => {
  const videoRef = useRef(null);

  const startVideoStream = () => {
    // Replace 'YOUR_SERVER_URL' with the actual URL of your Express.js server
    const videoURL = 'YOUR_SERVER_URL/api/video-stream';

    // Make sure to replace 'http' with 'https' if your server supports HTTPS
    const streamURL = videoURL.replace('http', 'http'); 

    if (videoRef.current) {
      videoRef.current.seek(0); // Reset the video to the beginning
      videoRef.current.seek(0.1); // Adjust the seek value to prevent loading spinner
      videoRef.current.presentFullscreenPlayer(); // Open video in full screen
      videoRef.current.seek(0); // Seek again to ensure video starts
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Start Video Stream" onPress={startVideoStream} />
      <VideoPlayer
        ref={videoRef}
        source={{ uri: 'YOUR_SERVER_URL/api/video-stream' }} // Replace with your server URL
        style={styles.videoPlayer}
        controls={false} // You can toggle this to true if you want to show native controls
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: 300,
  },
});

export default App;
