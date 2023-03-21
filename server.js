const mongoose = require('mongoose');
const dotenv = require('dotenv');

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
// const app = require('./app');
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");

const userRouter = require ("./routes/userRoutes");
const path = require('path');

dotenv.config({ path: './config/config.env' });
const server = http.createServer(app);

app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1", userRouter);

app.use(express.static(path.resolve("./frontend/build")))

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./frontend/build/index.html"))
})

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => {
    // console.log(con.connections);
    console.log('DB connection successful!')
  });

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection!  Shutting down');

  server.close(() => {
    process.exit(1);
  });
})