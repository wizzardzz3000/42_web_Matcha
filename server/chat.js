const db = require('./database.js');
const app = require('express')();
let http2 = require('http').Server(app);
let io = require('socket.io')(http2);

http2.listen(3000, function() {
  console.log('listening on *:3000');
});

io.sockets.on('connection', function(socket) {
  var roomId;
  socket.on('leave room', function(room) {
    socket.leave(room);
  });
  socket.on('join room', function(room) {
    socket.join(room);
    console.log('a user connected to room', room);
    roomId = room;
  });
  socket.on('send message', (obj) => {
    io.to(roomId).emit('receive message', obj);
  });
});

exports.loadMatches = (req, res) => {
  if (!req.body) {
      res.sendStatus(500);
    } else {
      if (res) {
        const sql = 'SELECT s2.id_match, s1.id_user_matched FROM swipe s1 INNER JOIN swipe s2 ON s2.id_user = s1.id_user_matched AND s2.id_user_matched = ? WHERE s1.id_user = ?';
        const query = db.format(sql, [req.params.id, req.params.id]);
        db.query(query, (err, response) => {
          if (err) {
            res.json({
              success: false,
              message: 'User not found',
            });
          } else {
            res.json({
              success: true,
              message: 'Successfully loaded matches',
              matches_list: response,
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
}

exports.loadConversation = (req, res) => {
  if (!req.body) {
      res.sendStatus(500);
    } else {
      if (res) {
        const sql = 'SELECT * FROM `message` WHERE id_match = ?';
        let query = db.format(sql, req.params.id);
        db.query(query, (err, response) => {
          if (err) {
            res.json({
              success: false,
              message: 'User not found',
            });
          } else {
            res.json({
              success: true,
              message: 'Successfully loaded conversation messages',
              messageArray: response
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
}

exports.saveMessage = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO message VALUES(?, ?, ?, NOW(), ?)';
      let query = db.format(sql,
        [
          null,
          req.body.idUser,
          req.body.message,
          req.body.idMatch
        ]);
        db.query(query, (err, response) => {
          if (err) {
            console.log(err);
            res.json({
              success: false,
              message: 'Failed to save this message',
            });
          } else {
            res.json({
              success: true,
              message: 'Successfully saved this message',
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
  
}