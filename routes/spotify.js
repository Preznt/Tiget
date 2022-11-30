// spotify open api 사용

import express from "express";
import SpotifyWebApi from "spotify-web-api-node";

const router = express.Router();

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: "14b08fa25bf542ab95c7be189def9921",
  clientSecret: "a69c965e2b724adabd3fd74901dab7ec",
  redirectUri: "http://www.example.com/callback",
});

spotifyApi.setAccessToken("<your_access_token>");

spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
  function (data) {
    console.log("Artist albums", data.body);
  },
  function (err) {
    console.error(err);
  }
);

// router.get("/", (req, res) => {
//     const Elvis = spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE");
//     res.send("Artist albums", Elvis.body);
//   });

export default router;
