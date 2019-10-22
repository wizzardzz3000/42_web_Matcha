const db = require('./database.js');
const app = require('express')();
let http3 = require('http').Server(app);
let io = require('socket.io')(http3);

http3.listen(5000, function() {
  console.log('listening on *:5000');
});

io.sockets.on('connection', function(socket) {
    socket.on('notification', (obj) => {
        socket.broadcast.emit('receive notifications', obj);
    });
});

exports.addNotification = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO notification VALUES(id_notif, ?, ?, NOW(), ?)';
      let query = db.format(sql, [
        req.body.id_user_,
        req.body.notif,
        req.body.id_user
      ]);
      db.query(query, (err) => {
        if (err) {
          res.json({ success: false, message: err });
          throw err;
        } else {
          res.json({ success: true, message: 'Add notification' });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getNotifications = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT notification.*, firstname, lastname FROM notification INNER JOIN user \
                   ON notification.id_user_ = user.id_user WHERE notification.id_user = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: err });
          throw err;
        } else {
          res.json({ success: true, message: '', notifications: response });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.deleteNotification = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'DELETE FROM notification WHERE id_notif = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err) => {
        if (err) {
          res.json({ success: false, message: err });
          throw err;
        } else {
          res.json({ success: true, message: '' });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};