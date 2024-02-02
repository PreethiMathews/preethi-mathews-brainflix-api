const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const FILE_PATH_IN_DETAIL_VIDEO = "./data/video-details.json";

// function to read our local videos.json file
const readvideos = () => {
  const videosData = fs.readFileSync(FILE_PATH_IN_DETAIL_VIDEO);
  const parsedvideos = JSON.parse(videosData);
  return parsedvideos;
};
// function to read our local videos.json file
const getVideoById = (id) => {
  const videosData = fs.readFileSync(FILE_PATH_IN_DETAIL_VIDEO);
  const parsedvideos = JSON.parse(videosData);
  const reqVideo = parsedvideos.find((video) => video.id === id);
  return reqVideo;
};
// GET videos
router.get("/", (req, res) => {
  const videosData = readvideos();
  res.status(200).json(videosData);
});
//GET /videos/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const videoData = getVideoById(id);
  res.status(200).json(videoData);
});
//POST a video
router.post("/", (req, res) => {
  const videoObj = req.body;
  const newvideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: req.body.channel,
    image: "https://project-2-api.herokuapp.com/images/image0.jpg",
  };

  const videosData = readvideos();
  videosData.push(newvideo);
  fs.writeFileSync(FILE_PATH_IN_DETAIL_VIDEO, JSON.stringify(videosData));

  res.status(201).json(newvideo);
});

module.exports = router;
