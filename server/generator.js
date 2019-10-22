const db = require('./database.js');
const request = require('request');
const passwordHash = require('password-hash'); 
const https = require('https');

async function randomTags(idUser) {
  const sql = 'INSERT INTO usertag VALUES(id_utag, ?, ?)';
  let rand = Math.floor(Math.random() * (+7 - +1) + +1);
  let userTags = [];
  for (let i = 0; i < rand; i++) {
    randTag = Math.floor(Math.random() * (+7 - +1) + +1);
    for (let index; index < userTags.length; index++) {
      if (randTag === userTags[i]) {
        randTag = Math.floor(Math.random() * (+7 - +1) + +1);
      }
    }
    userTags.push(randomTags);
    const query = await db.format(sql, [
      randTag,
      idUser
    ]);
    await db.query(query, (err) => {
      if (err) throw err;
    });
  }
}


exports.randomUser = async (req, res) => {
  if (!req.body) {
    res.sendStatus(500);
  } else {    
    await request('https://uinames.com/api/?ext&amount=500', { json: true }, async (err, response) => {
      if (err) {
        res.json({ success: false, message: 'Failed to retrieve randomuser' });
      } else {
        let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)';
        const randomUsers = response.body;
        for (let i = 0; i < randomUsers.length; i++) {
          const position = {
            latitude: Math.random() * (+50 - +48) + +48,
            longitude: Math.random() * (+4 - +1) + +1,
          }
          let query = await db.format(sql, [
            randomUsers[i].name,
            randomUsers[i].surname,
            randomUsers[i].email,
            passwordHash.generate('clemclem'),
            randomUsers[i].gender.charAt(0).toUpperCase() + randomUsers[i].gender.slice(1),
            new Date(randomUsers[i].birthday.mdy),
            (randomUsers[i].gender === 'male') ? 'Female' : 'Male',
            null, 10, 18, 100, null, 1,
            Math.random() * (+100 - +1) + +1,
            JSON.stringify(position),
            false, 100
          ]);
          await db.query(query, async (err, response) => {
            if (err) {
              res.json({ success: false, message: 'Failed to add randomuser' });
              throw err;
            } else {
              const idUser = response.insertId;
              await https.get(`https://source.unsplash.com/random/?$${ randomUsers[i].gender }`, { json: true }, async (response, err) => {
                if (err) {
                  res.json({ success: false, message: 'Failed to add randomuser' });
                  throw err;
                }
                sql = 'INSERT INTO photo VALUES(id_photo, ?, ?, 0, NOW())';
                const photoUrl = response.headers.location;
                query = await db.format(sql, [
                  idUser,
                  photoUrl
                ]);

                await db.query(query, async (err) => {
                  if (err) {
                    res.json({ success: false, message: 'Failed to add randomuser' });
                    throw err;
                  } else {
                    await randomTags(idUser);
                  }
                });
              });
            }
          });
        }
        res.json({done: true});
      }
    });
  }
};

// exports.randomUser = async (req, res) => {
//   if (!req.body) {
//     res.sendStatus(500);
//   } else {
//     // for (let index; index < 1000; index++) {
//       await request('https://randomuser.me/api/', { json: true }, async (err, response) => {
//         if (err) {
//           res.json({ success: false, message: 'Failed to retrieve randomuser' });
//         } else {
//           if (res) {
//             let sql = 'INSERT INTO user VALUES(id_user, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
//             let index = response.body.results[0];
//             const position = {
//               latitude: Math.random() * (+50 - +48) + +48,
//               longitude: Math.random() * (+4 - +1) + +1,
//             }
//             let query = db.format(sql, [
//               index.name.first,
//               index.name.last,
//               index.email,
//               passwordHash.generate('clemclem'),
//               index.gender.charAt(0).toUpperCase() + index.gender.slice(1),
//               new Date(index.dob.date),
//               (index.gender === 'male') ? 'Female' : 'Male',
//               null, 10, 18, 100, null, 1,
//               Math.random() * (+100 - +1) + +1,
//               JSON.stringify(position),
//               false, null, 100
//             ]);
//             await db.query(query, async (err, response) => {
//               if (err) {
//                 res.json({ success: false, message: 'Failed to add randomuser' });
//                 throw err;
//               } else {
//                 const idUser = response.insertId;
//                 request(`https://source.unsplash.com/random/?$${ index.gender }`, { json: true }, (response) => {
//                   sql = 'INSERT INTO photo VALUES(id_photo, ?, ?, 0, NOW())';
//                   const photoUrl = response.request.uri.href;
//                   query = db.format(sql, [
//                     idUser,
//                     photoUrl
//                   ]);
//                   db.query(query, (err) => {
//                     if (err) {
//                       console.log(err);
//                       res.json({ success: false, message: 'Failed to add randomuser' });
//                       throw err;
//                     } else {
//                       randomTags(idUser);
//                       res.json({ success: true, message: '', data: index, photoUrl: photoUrl });
//                     }
//                   });
//                 });
//               }
//             });
//           } else {
//             res.sendStatus(401);
//           }
//         }
//       });
//     // }
//   }

// };