const db = require('./database.js');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const nodemailer = require('nodemailer');

exports.removeMatch = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'DELETE FROM swipe WHERE id_match = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
          throw err;
        } else {
          sql = 'DELETE FROM message WHERE id_match = ?';
          query = db.format(sql, [req.body.id_match]);
          db.query(query, (err) => {
            if (err) {
              res.json({ success: false, message: 'Network error' });
              throw err;
            } else {
              sql = 'DELETE FROM `match` WHERE id_match = ?';
              query = db.format(sql, [req.params.id]);
              db.query(query, (err) => {
                if (err) {
                  res.json({ success: false, message: 'Network error' });
                  throw err;
                } else {
                  // sql = 'DELETE FROM message WHERE id_match = ?';
                  // query = db.format(sql, [req.params.id]);
                  // if (err) {
                  //   res.json({ success: false, message: 'Network error' });
                  //   throw err;
                  // } else {
                  //   res.json({ success: true, message: '' });
                  // }
                  res.json({ success: true, message: '' });
                }
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

exports.reportUserNotMatched = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {  
      sql = 'INSERT INTO report VALUES(id_report, ?, ?)';
      query = db.format(sql, [ req.body.id_user_, req.body.id_user ]);
      db.query(query, (err) => {
        if (err) {
          console.log(err);
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '' });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.reportUser = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'DELETE FROM swipe WHERE id_match = ?';
      let query = db.format(sql, [ req.body.id_match ]);
      db.query(query, (err) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
          throw err;
        } else {
          sql = 'DELETE FROM message WHERE id_match = ?';
          query = db.format(sql, [req.body.id_match]);
          db.query(query, (err) => {
            if (err) {
              res.json({ success: false, message: 'Network error' });
              throw err;
            } else {
              sql = 'DELETE FROM `match` WHERE id_match = ?';
              query = db.format(sql, [req.body.id_match]);
              db.query(query, (err) => {
                if (err) {
                  res.json({ success: false, message: 'Network error' });
                  throw err;            
                } else {
                  sql = 'INSERT INTO report VALUES(id_report, ?, ?)';
                  query = db.format(sql, [ req.body.id_user_, req.body.id_user ]);
                  db.query(query, (err) => {
                    if (err) {
                      res.json({ success: false, message: 'Network error' });
                      throw err;
                    } else {
                      res.json({ success: true, message: '' });
                    }
                  });
                }
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

exports.removeUserTag = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'DELETE FROM userTag WHERE id_utag = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '' });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.removePrefTag = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'DELETE FROM tagpref WHERE id_tpref = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '' });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.addUserTag = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO usertag VALUES(id_utag, ?, ?)';
      const query = db.format(sql, [ req.body.id_tag, req.body.id_user ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Tag not found' });
        } else {
          res.json({ success: true, message: '', id_utag: response.insertId });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.addPrefTag = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'INSERT INTO tagpref VALUES(id_tpref, ?, ?)';
      const query = db.format(sql, [ req.body.id_tag, req.body.id_user ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Tag not found' });
        } else {
          res.json({ success: true, message: '', id_tpref: response.insertId });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getUserTags  = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT usertag.*, tag.label, tag.tag FROM usertag INNER JOIN tag ON usertag.id_tag = tag.id_tag WHERE id_user = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '', userTags: response });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getPreferenceTags  = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT tagpref.*, tag.label FROM tagpref INNER JOIN tag ON tagpref.id_tag = tag.id_tag WHERE id_user = ?';
      let query = db.format(sql, [ req.params.id ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '', prefTags: response });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.updateGeolocation = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'UPDATE user SET position = ? WHERE id_user = ?';
      const position = {
        latitude: req.body.latitude,
        longitude: req.body.longitude
      };
      let query = db.format(sql, [
        JSON.stringify(position),
        req.body.id_user
      ]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
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

exports.test = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT position FROM user WHERE id_user = ?';
      let query = db.format(sql, [req.params.id]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: '', response: response });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getProfilePhoto = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT photo FROM photo WHERE id_user = ? AND active = 1';
      let query = db.format(sql, [req.params.id]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'Network error',
          });
        } else {
          res.json({
            success: true,
            message: 'Upload photo',
            photo: response[0].photo,
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.getUserPhotos = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      const sql = 'SELECT * FROM photo WHERE id_user = ?';
      let query = db.format(sql, [req.params.id]);
      db.query(query, (err, response) => {
        if (err) {
          res.json({
            success: false,
            message: 'Network error',
          });
        } else {
          res.json({
            success: true,
            message: '',
            photos: response,
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

exports.login = (req, res) => {
  if (req.body) {
    const password = req.body.password;
    const sql = "SELECT hash, id_user, confirm FROM user WHERE email = ?";
    const query = db.format(sql, [req.body.email]);
    db.query(query, (err, response) => {
      if (err) {
        res.json({
          message: 'Cannot find user with this email address',
          success: false,
        });
      }
      if (response.length != 0) {
          const hash = response[0].hash;
          const confirm = response[0].confirm;
          if (passwordHash.verify(password, hash) && confirm === 1) {
            const myToken = jwt.sign({
              iss: 'https://qinder.com',
              user: 'Clément',
              scope: 'user'
            }, secret);
            res.json({
              user_id: response[0].id_user,
              token: myToken,
              message: 'Successfully logged user',
              success: true,
            });
          } else {
            res.json({
              message: 'Wrong password',
              success: false,
            });
          }
      } else {
        res.json({
          message: 'Cannot find user with this email address',
          success: false,
        });
      }
    });
  }
};

exports.register = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      // Hash the password
      const hash = passwordHash.generate(req.body.password);
      let query = db.format(sql, [
        req.body.firstname, req.body.lastname, req.body.email, hash, req.body.gender,
        req.body.birthdate, 'Both', null, 10, 18, 100, req.body.key, false, 100, null, 0, null, 100
      ]);
      db.query(query, (err, response) => {
        if (err) { 
          res.json({
            message: 'This email already exist',
            success: false,
          });
        } else {
          const userId = response.insertId;
          sql = 'INSERT INTO tagpref VALUES(id_tpref, 1, ?), (id_tpref, 2, ?),(id_tpref, 3, ?),(id_tpref, 4, ?),(id_tpref, 5, ?), (id_tpref, 6, ?)';
          query = db.format(sql, [ userId, userId, userId, userId, userId, userId ]);
          db.query(query, (err) => {
            if (err) { 
              res.json({ message: 'This email already exist', success: false });
              throw err;
            } else {
              res.json({ success: true, message: 'Check your mailbox to confirm your account', user_id: userId });
            }
          });
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

// MAIL
//----------------------------------------------
exports.sendMail = (req, res) => {
  if (res)
  {
    nodeMailerRegisterCall(req.body.firstname, req.body.email, req.body.key, info => {
      // res.send(info);
    });
    // res.json({
    //   message: 'Email sent!',
    //   success: true,
    // });
  }
}
exports.resetPassword = (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {
    if (res) {
      let sql = 'UPDATE user SET validation_key = ? WHERE email = ?';
      let query = db.format(sql,
        [
          req.body.key,
          req.body.email,
        ]);
      db.query(query, (err, response) => {
        console.log(err);
        if (err) {
          res.json({ success: false, message: 'Network error' });
        } else {
          res.json({ success: true, message: 'Successfully prepared to send password reset email' });
          if (req.body.function === 'sendMail') {
            nodeMailerResetPasswordCall(req.body.email, req.body.key, info => {
              // res.send(info);
            });
          }
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

async function nodeMailerRegisterCall(userName, email, key, callback) {

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'qindersurprise@gmail.com',
        pass: 'Qinder123456!'
    }
  });

  let info = await transporter.sendMail({ 
    from: '"Martin @ MATCHA" <martin@matcha.io>',
    to: email,
    subject: "Validate your MATCHA account :)",
    html: `<html><h1>Hello ${userName}! Please click the link below to activate your Matcha account: </h1><br> \
            <a href="https://qinder.cf/activate/${email}/${key}">Validate your account</a></html><br> \
            Or copy, paste this link : <u>https://qinder.cf/activate/${email}/${key}</u>`,
  });

  callback(info);
}

async function nodeMailerResetPasswordCall(email, key, callback) {

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'qindersurprise@gmail.com',
        pass: 'Qinder123456!'
    }
  });

  let info = await transporter.sendMail({ 
    from: '"Clément @ MATCHA" <martin@matcha.io>',
    to: email,
    subject: "Reset your MATCHA password",
    html: `<html><h1>Hello, I am Clément from the Qinder team. Martin has let me know you forgot your credentials? Please click this link to reset your password: </h1><br> \
            <a href="https://qinder.cf/resetPassword/${email}/${key}">Reset your password</a></html> <br> \
            Or copy, paste this link : <u>https://qinder.cf/resetPassword/${email}/${key}</u>`,
  });

  callback(info);
}
