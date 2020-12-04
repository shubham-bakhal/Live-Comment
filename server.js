const express = require('express');
const app = express();
require('dotenv').config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;
app.use(express.static('public'));
app.use(express.json());
const server = app.listen(PORT, () => console.log(`listing to port ${PORT}`));
const io = require('socket.io')(server);
const Comment = require('./models/comment');
// DB setting
const dbConnect = require('./db');
dbConnect();

// Routes
app.post('/api/comments', (req, res) => {
  const { username, comment } = req.body;
  tusername = username.trim();
  tcomment = comment.trim();
  const newcomment = new Comment({
    username: tusername,
    comment: tcomment,
  });
  console.log('#######NEW COMMENT BEEN SAVED#####');
  newcomment.save().then(response => {
    res.send(response);
  });
});

app.get('/api/comments', (req, res) => {
  Comment.find().then(comments => {
    res.send(comments);
  });
});

io.on('connection', socket => {
  console.log(`New Connection ${socket.id}`);
  // Recieve event
  socket.on('comment', data => {
    data.time = Date();
    socket.broadcast.emit('comment', data);
  });
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });
});
