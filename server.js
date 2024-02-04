//enable .env variables
require("dotenv").config();
const express = require("express");
const app = express();
const videoRoutes = require("./routes/videoRoutes.js");
const cors = require("cors");

const PORT = process.env.PORT || 8081;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors());
//This is middleware that allows use to send JSON requests
app.use(express.json());

app.use(express.static("public"));

app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
