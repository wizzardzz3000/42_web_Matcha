const db = require('./database.js');

// ENTER VIEW ACTIVATE
// -----------------------------------------------------------------------------------------
exports.enterViewActivate = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = "SELECT id_user, firstname, email, confirm, validation_key FROM user WHERE email = ?";
      const query = db.format(sql, [req.params.email]);
      db.query(query, (err, response) => {
        if (err) {
          // console.error(err);
          res.json({
            success: false,
            message: 'User not found',
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully fetched user infos',
            userId: response[0].id_user,
            firstname: response[0].firstname,
            email: response[0].email,
            confirm: response[0].confirm,
            key: response[0].validation_key
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.activateAccount = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = "UPDATE user SET confirm = ? WHERE email = ?";
      const query = db.format(sql, [1, req.params.email]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'Failed to activate user account',
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully activated user account',
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};
