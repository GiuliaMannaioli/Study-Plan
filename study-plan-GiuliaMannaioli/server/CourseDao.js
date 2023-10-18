'use strict';

const sqlite = require('sqlite3');
const { db } = require('./db');

exports.listCourses = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Exams ORDER BY name ASC';
    db.all(sql, [], (err, rows) => {
      if(err)
        reject(err);
      else {
        const courses = rows.map((c)=> (
            {code : c.code, 
            name : c.name,
            credits : c.credits,
            capacity : c.capacity, 
            currentStudentsNumber : c.currentStudentsNumber, 
            preparatory : c.preparatory, 
            incompatible : c.incompatible}
        ));
        resolve(courses);
      }
    });
  });
};



exports.listCodesStudyPlan = (user) => {  
    return new Promise((resolve, reject) => {
      const sql = 'SELECT code FROM StudyPlans WHERE id = ?';
      db.all(sql, [user], (err, rows) => {
        if(err)
          reject(err);
        else {  
           const codes = rows.map((c)=> ( c.code)) 
      resolve(codes); 
        }
      });
    });
  };

  
exports.getCourse = (code) => {  // mi prendo tutto il corso nel suo insieme
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Exams WHERE code=?';
    db.get(sql, [code], (err, row) => {
      if(err){
          console.log(err);
          reject(err);
      }
      else {
        if(row !== undefined) {        
        resolve(row);}
        else{
          resolve(undefined)
        }
      }
    });
  });
};



  
exports.createStudyPlan = (code, user) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO StudyPlans(id, code) VALUES(?, ?)';
    db.run(sql, [user, code], (err, row) => {
      if(err){
          reject(err);
      }
      else {
        resolve(this.lastID);
      }
    });
  });
};


// delete all the studyplan
exports.deleteCourse = (user) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM StudyPlans WHERE user=?';
    db.run(sql, [user], (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      else resolve(null);
    });
  });
};
