'use strict';

const express = require('express');

 // logging middleware
const morgan = require('morgan');
const cors = require('cors');

// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

// init express
const app = new express();
const port = 3001;

// set up the middlewares
app.use(morgan('dev'));
app.use(express.json()); // for parsing json request body

const dao = require('./CourseDao');
const userDao = require('./UserDao');

// set up and enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //così da permettere l'invio del cookie
};
app.use(cors(corsOptions));

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDao.getUser(username, password)
  if(!user) 
    return cb(null, false, 'Incorrect username or password.'); //cb = CALLBACK
    
  return cb(null, user);
}));


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { // this user is id + username + name
  return cb(null, user);
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});


const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}


app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

/* If we aren't interested in sending error messages... 
// SE INVECE VUOI VAI SU week13 e vedi l'alternativa*/
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.status(201).json(req.user);
});


// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});


// GET /api/courses
app.all('/api/courses', async (req, res) => {
  
  try{
      const courses = await dao.listCourses();
      res.status(200).json(courses);
   
  }catch{
      res.status(500).end();
  }
});

// GET /api/courses/<id>
app.get('/api/courses/:id', async (req, res) => {
  
  try{
      const courses = await dao.getCourse();
      res.status(200).json(courses);
   
  }catch{
      res.status(500).end();
  }
});



// GET /api/studyplans
app.get('/api/:user/studyplans' ,async (req, res) => {
  const user = req.params.user;

  if(user === null || user === undefined || isNaN(user))
    return res.status(422).end();
  try{
      const codes = await dao.listCodesStudyPlan(user);
      let studyPlan = [];
      for (let i in codes){
       studyPlan[i] = await dao.getCourse(codes[i]);}

      const courses = studyPlan.map((c)=> ({
        code : c.code, 
        name : c.name,
        credits : c.credits,
        capacity : c.capacity, 
        currentStudentsNumber : c.currentStudentsNumber, 
        preparatory : c.preparatory, 
        incompatible : c.incompatible}
    ));

      res.status(200).json(courses);
  }catch{
      res.status(500).end();
  }
});


// POST /api/studyPlan
app.post('/api/:user/studyplans', async (req, res) => {
  const studyPlan= req.body;
  const user = req.params.user;
  if (user === null || user === undefined || isNaN(user)){ 
      return res.status(422).end();
  }
  try{
   for (let i in studyPlan){
      await dao.addStudentsEnrolled(studyPlan[i].code);
      await dao.createStudyPlan(studyPlan[i].code, user);
    }
      res.status(201).end();
  }catch{
      res.status(503).end();
  }
});



// DELETE /api/studyPlan
app.delete('/api/:user/studyPlan', async (req, res) => {
  const user = req.params.user;
  if(user === null || user === undefined || isNaN(user))
    return res.status(422).end();
  try {
      await dao.subStudentsEnrolled(studyPlan[i].code);
      await dao.deleteCourse(user);
      return res.status(200).end();
  } catch (err) {
      return res.status(500).end();
  }
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});