const db = require('./database.js');
const passwordHash = require('password-hash');

exports.checkKey = (req, res) => {
    if (!req.body) {
        res.sendStatus(500);
      } else {
        if (res) {
          const sql = 'SELECT validation_key FROM user WHERE email = ?';
          const query = db.format(sql, [req.params.email]);
          db.query(query, (err, response) => {
            if (err) {
              res.json({
                success: false,
                message: 'User not found',
              });
            } else {
              res.json({
                success: true,
                message: 'User exists',
                key: response[0].validation_key,
              });
            }
          });
        } else {
          res.sendStatus(401);
        }
      }
  };
  
  exports.saveNewPassword = (req, res) => {
    if (!req.body) {
      res.sendStatus(500);
    } else {
      if (res) {
        const sql = "UPDATE user SET hash = ? WHERE email = ?";
        const hash = passwordHash.generate(req.body.newPassword);
        const query = db.format(sql, [hash, req.body.email]);
        db.query(query, (err, response) => {
          if (err) {
            res.json({
              success: false,
              message: 'Failed to activate user account',
            });
          } else {
            res.json({
              success: true,
              message: 'Successfully reset user password',
            });
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
  };