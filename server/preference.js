const db = require('./database.js');

exports.getTags = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT * from tag';
      db.query(sql, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'User not found',
          });
        } else {
          res.json({
            success: true,
            message: '',
            tags: response
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.updatePreferences = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'UPDATE user SET bio = ?, gender = ?, interest = ?, distance = ?, minage = ?, maxage = ?, pop = ? WHERE id_user = ?';
      let query = db.format(sql, [
        req.body.bio,
        req.body.gender,
        req.body.interest,
        req.body.distance,
        req.body.minage,
        req.body.maxage,
        req.body.pop,
        req.body.id
      ]);
      db.query(query, (err) => {
        if (err) {
          res.json({
            success: false,
            message: 'Network error',
          });
          throw err;
        } else {
          res.json({
            success: true,
            message: '',
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.uploadPhoto = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO photo VALUES(id_photo, ?, ?, ?, NOW())';
      let query = db.format(sql, [
        req.body.id,
        req.body.photo,
        req.body.active,
      ]);
      db.query(query, (err) => {
        if (err) {
          res.json({
            success: false,
            message: err,
          });
          throw err;
        } else {
          res.json({
            success: true,
            message: 'Upload photo',
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.deletePhoto = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'DELETE FROM photo WHERE id_photo = ? AND id_user = ?';
      let query = db.format(sql, [
        req.body.id_photo,
        req.body.id_user,
      ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'Network error',
          });
        } else {
          res.json({
            success: true,
            message: 'Delete photo',
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};
