import React, { useState } from "react";
import { Grid,Typography,palette } from "@material-ui/core";

import { SearchBar, VideoList, VideoDetail } from "./components";

import youtube from "./api/youtube";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({ id: {}, snippet: {} });

  return (
    <container >
      <palette bgcolor="secondary.main" >
      <Typography  variant="h4" align="center">PRASHANTH YOUTUBE CLONE</Typography>
    <Grid style={{ justifyContent: "center" }} container spacing={10}>
       
      <Grid item xs={11}>
        <Grid container spacing={10}>
        
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </palette>
    </container>
  );

  async function handleSubmit(searchTerm) {
    const { data: { items: videos } } = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        // TODO - add a new API key.
        key: 'AIzaSyCjxHjngB3IB9G52f6_U379oMIj3Nzjjho',
        q: searchTerm,
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  }
}

export default App;