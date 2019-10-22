const db = require('./database.js');
const jwt = require('jsonwebtoken');
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

exports.oauth = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let success = false;
      let sql = 'SELECT * FROM oauth WHERE id_facebook = ?';
      let query = db.format(sql, [ req.body.id_facebook ]);
      db.query(query, (err, response) => {
        if (err) throw err;
        if (response && response.length === 0) {
          let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
          let query = db.format(sql, [
            req.body.firstname, req.body.lastname, req.body.email, null, req.body.gender, new Date(req.body.birthdate),
            'Both', null, 10, 18, 100, req.body.key, false, 100, null, 0, null, 100
          ]);
          db.query(query, (err, response) => {
            if (err) throw err;
            else {
              const userId = response.insertId;
              sql = 'INSERT INTO oauth VALUES(id_oauth, ?, ?)'
              query = db.format(sql, [req.body.id_facebook, userId ]);
              db.query(query, (err) => {
                if (err) throw err;
                else {
                  success = true;
                }
              });
            }
          });
        } else {
          success = true;
        }
        if (success) {
          const myToken = jwt.sign({
            iss: 'https://qinder.com', user: response.id_user, scope: 'user'
          }, secret);
          res.json({
            success: true, token: myToken, id_user: response[0].id_user 
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};
