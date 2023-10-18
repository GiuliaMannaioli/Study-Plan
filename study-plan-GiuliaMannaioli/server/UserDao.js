'use strict';

const { db } = require('./db');
const crypto = require('crypto');

exports.getUser = (username, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Students WHERE username = ?';
      db.get(sql, [username], (err, row) => {
        if (err) { 
          reject(err); 
        }
        else if (row === undefined) { 
          resolve(false); 
        }
        else {
          const user = {id: row.id, username: row.username, name: row.name, career: row.career};
          
          crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
            if (err) reject(err);
            if(!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword))
              resolve(false);
            else
              resolve(user);
          });
        }
      });
    });
  };
  
  exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Students WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) { 
          reject(err); 
        }
        else if (row === undefined) { 
          resolve({error: 'User not found!'}); 
        }
        else {
          const user = {id: row.id, username: row.username, name: row.name};
          resolve(user);
        }
      });
    });
  };