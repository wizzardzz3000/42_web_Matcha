const db = require('./database.js');
const notification = require('./notification.js');

exports.enterViewHome = async (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT * from user WHERE id_user = ?';
      const query = db.format(sql, [req.params.id]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'User not found' });
          throw err;
        } else {
          const user = response[0];
          const sql = 'SELECT * FROM tagpref WHERE id_user = ?';
          const query = db.format(sql, [req.params.id]);
          db.query(query, (err, response) => {
            if (err) {
              res.json({ success: false, message: 'User not found' });
              throw err;
            } else {
              res.json({
                success: true,
                message: '',
                id: user.id_user,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                bio: user.bio,
                hash: user.hash,
                distance: user.distance,
                minage: user.minage,
                maxage: user.maxage,
                interest: user.interest,
                gender: user.gender,
                position: JSON.parse(user.position),
                confirm: user.confirm,
                online: user.online,
                lastConnection: user.last_connected,
                pop: user.pop,
                tagsInCommon: user.tagsInCommon,
                prefTags: response
              });
            }
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getUserToSwipe = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      // To calculate birthdate of users
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const minAge = currentYear - req.body.minage;
      const maxAge = currentYear - req.body.maxage;
      let sql = '';
      let query;
      // Let configure user tags preference
      console.log(req.body.prefTags);
      let prefTags = '';
      for (let i = 0; i < req.body.prefTags.length; i++) {
        prefTags += 'id_tag = ' + req.body.prefTags[i].id_tag;
        if (i !== req.body.prefTags.length - 1) {
          prefTags += ' OR ';
        }
      }
      if (req.body.interest === 'Both') {
        // ADD DISTANCE CHECK
        sql = 'SELECT user.id_user, firstname, bio, online, last_connected, position, YEAR(birthdate) AS year, popularity FROM user \
        WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched AND swipe.id_user = ?) \
        AND NOT EXISTS(SELECT null FROM report WHERE user.id_user = report.id_user_blocked) \
        AND EXISTS(SELECT null FROM usertag WHERE ' + prefTags + ' AND usertag.id_user = user.id_user ) \
        AND EXISTS(SELECT null FROM photo WHERE user.id_user = photo.id_user) \
        AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? AND popularity BETWEEN 0 AND ? \
        ORDER BY RAND() LIMIT 1';
        query = db.format(sql, [
          req.body.id,
          req.body.id,
          maxAge,
          minAge,
          req.body.popularity,
        ]);
        console.log(query);
      } else {
        sql = 'SELECT user.id_user, firstname, bio, online, last_connected, position, YEAR(birthdate) AS year, popularity FROM user \
        WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched AND swipe.id_user = ?) \
        AND NOT EXISTS(SELECT null FROM report WHERE user.id_user = report.id_user_blocked) \
        AND EXISTS(SELECT null FROM usertag WHERE ' + prefTags + ' AND usertag.id_user = user.id_user ) \
        AND EXISTS(SELECT null FROM photo WHERE user.id_user = photo.id_user) \
        AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? \
        AND user.gender = ? AND popularity BETWEEN 0 AND ? ORDER BY RAND() LIMIT 1';
        query = db.format(sql, [
          req.body.id,
          req.body.id,
          maxAge,
          minAge,
          req.body.interest,
          req.body.popularity,
        ]);
      }
      db.query(query, (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: false, message: 'User not found' });
        } else {
          if (response[0]) {
            res.json({
              success: true,
              message: '',
              id: response[0].id_user,
              firstname: response[0].firstname,
              bio: response[0].bio,
              position: JSON.parse(response[0].position),
              year: response[0].year,
              popularity: response[0].popularity,
              online: response[0].online,
              lastConnected: response[0].last_connected
            });
          } else {
            res.json({ success: false, message: 'There are no more users to match with, try to change your parameters or come back later' });
          }
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getTheHeavens = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      // To calculate birthdate of users
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const minAge = currentYear - req.body.minage;
      const maxAge = currentYear - req.body.maxage;
      let sql = '';
      let query;
      if (req.body.interest === 'Both') {
        sql = 'SELECT user.id_user, firstname, photo FROM user INNER JOIN photo ON user.id_user = photo.id_user \
        WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched)  \
        AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? ORDER BY RAND() LIMIT 20';
        query = db.format(sql, [
          req.body.id,
          maxAge,
          minAge
        ]);
      } else {
        sql = 'SELECT user.id_user, firstname, photo FROM user INNER JOIN photo ON user.id_user = photo.id_user \
        WHERE NOT EXISTS(SELECT null FROM swipe WHERE user.id_user = swipe.id_user_matched)  \
        AND user.id_user != ? AND YEAR(birthdate) BETWEEN ? AND ? AND user.gender = ? ORDER BY RAND() LIMIT 20';
        query = db.format(sql, [
          req.body.id,
          maxAge,
          minAge,
          req.body.interest,
        ]);
      }
      db.query(query, (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: false, message: 'User not found' });
        } else {
          if (response[0]) {
            res.json({
              success: true,
              message: '',
              people_list: response,
            });
          } else {
            res.json({ success: false, message: 'There is no more Qinders, try to change your parameters' });
          }
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

function updateRatio(idUser) {
  let sql = 'SELECT COUNT(id_swipe) AS nswipe FROM swipe WHERE id_user = ? AND swipe.like = 1';
  let query = db.format(sql, [ idUser ]);
  db.query(query, (err, response) => {
    if (err) throw err;
    else {
      const nSwipePos = response[0].nswipe;
      sql = 'SELECT COUNT(`match`.id_match) AS nmatch FROM `match` INNER JOIN swipe ON `match`.id_match = swipe.id_match WHERE id_user = ?';
      let query = db.format(sql, [ idUser ]);
      db.query(query, (err, response) => {
        if (err) throw err
        else {
          const nMatch = response[0].nmatch;
          // Ratio calcul
          const ratio = (nMatch / nSwipePos) * 100;
          sql = 'UPDATE user SET popularity = ? WHERE id_user = ?';
          let query = db.format(sql, [ ratio, idUser ]);
          db.query(query, (err) => {
            if (err) throw err;
            else {
              console.log('New ratio : ' + ratio);
            }
          });
        }
      });
    }
  });
}

exports.swipe = async (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'INSERT INTO swipe VALUES(id_swipe, ?, ?, ?, NULL)';
      let query = db.format(sql, [ req.body.id_user, req.body.id_user_, req.body.like ]);
      await db.query(query, (err) => {
        if (err) {
          throw err
        } else if (req.body.like) {
          if (req.body.like === true) {
            updateRatio(req.body.id_user);
          }
          sql = 'SELECT id_user FROM swipe WHERE id_user = ? AND id_user_matched = ? AND swipe.like = 1';
          query = db.format(sql, [ req.body.id_user_, req.body.id_user ]);
          db.query(query, (err, response) => {
            if (err) throw err;
            else if (response[0]) {
              const insertMatch = 'INSERT INTO `match` VALUES(id_match, NOW())';
              query = db.format(insertMatch);
              db.query(query, (err, response) => {
                if (err) throw err
                else {
                  const updateSwipe = 'UPDATE swipe SET id_match = ? WHERE id_user = ? AND id_user_matched = ?; \
                                       UPDATE swipe SET id_match = ? WHERE id_user = ? AND id_user_matched = ?;';
                  query = db.format(updateSwipe, [ response.insertId, req.body.id_user, req.body.id_user_,
                                                   response.insertId, req.body.id_user_, req.body.id_user, ]);
                  db.query(query, (err) => {
                    if (err) throw err;
                    else
                      res.json({ success: true, message: '', match: true });
                  });
                }
              });
            } else {
              res.json({ success: true, message: '', match: false });
            }
          });
        } else {
          res.json({ success: true, message: '', match: false });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getUserOnline = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'UPDATE user SET online = ? WHERE id_user = ?';
      const query = db.format(sql, [req.body.online, req.body.userId]);
      db.query(query, (err) => {
        if (err) {
          res.json({
            success: false,
            message: 'Could not update "online"',
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully updated online'
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.saveUserLastConnection = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'UPDATE user SET last_connected = NOW() WHERE id_user = ?';
      const query = db.format(sql, [req.body.date, req.body.userId]);
      db.query(query, (err) => {
        if (err) {
          res.json({
            success: false,
            message: 'Could not not save last connection',
          });
        } else {
          res.json({
            success: true,
            message: 'Successfully saved last connection'
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};
