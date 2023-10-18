
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import API from './API';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { CoursesRoute, LoginRoute, StudyPlanRoute, NotFoundRoute} from './components/Views';
import { Container, Row, Alert, Button } from 'react-bootstrap';
import { LogoutButton, OpenLoginButton } from './components/Authentication';


function App() {

const [courses, setCourse] = useState([]);
const [studyPlan, setStudyPlan] = useState([]);
const [loggedIn, setLoggedIn] = useState(false);
const [user, setUser] = useState();
const [career, setCareer] = useState();
const [message, setMessage] = useState('');

const getAllCourses = async () => {
  const allcourses = await API.getAllCourses();
  setCourse(allcourses);
} 

const getStudyPlan = async () => {
  const sp = await API.getStudyplan(user);
  setStudyPlan(sp);
}


const saveStudyPlan = async (studyPlan) => {
  await API.cancelStudyPlan(user);
  await API.saveStudyPlan(studyPlan, user);
}


const cancelStudyPlan = async () => {
 await API.cancelStudyPlan(user);
}



useEffect(() => {
  const checkAuth = async () => {
    const user_info = await API.getUserInfo(); // we have the user info here
    if(user_info !== undefined){
      setUser(user_info.id);
      setCareer(user_info.career)
      setLoggedIn(true);
    }
  };
  checkAuth();
}, []);

useEffect(() => {
  if (loggedIn === false) {
    getAllCourses();
  }
}, [loggedIn])

useEffect(() => {
  if(loggedIn) {
     getAllCourses();
     getStudyPlan();
  } 
}, [loggedIn]);




const handleLogin = async (credentials) => {
  try {
    const user = await API.logIn(credentials);
    if(user!== undefined) {
      setUser(user.id);
      setCareer(user.career);
    }

    setLoggedIn(true);
    setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
  }catch(err) {
    console.log(err);
    setMessage({msg: 'Incorrect username or password', type: 'danger'});
  }

 };

const handleLogout = async () => {
  await API.logOut();
  setLoggedIn(false);
  setStudyPlan([]);
  setMessage('');
};


  return (

      <Container fluid className='App'>
  
      {message && <Row>
        <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
      </Row>} 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ 
            loggedIn ? <Navigate replace to='/studyPlan'/>  : <Navigate replace to='/courses'/> 
        } />
        <Route path='/courses' element={ 
            loggedIn ? <Navigate replace to='/'/> :<> <OpenLoginButton> </OpenLoginButton> <CoursesRoute generalList={true} courses={courses}  /> </>
        } />
        <Route path='/studyPlan' element={ 
           loggedIn ? <> <LogoutButton logout={handleLogout}> </LogoutButton> <StudyPlanRoute  courses={courses} studyPlan={studyPlan} generalList={false} user={user} career={career}
                                                                                   cancelStudyPlan={cancelStudyPlan} saveStudyPlan={saveStudyPlan} > </StudyPlanRoute>  </> : <Navigate replace to='/'/> 
        } />
        <Route path='/login' element={ 
        loggedIn ? <Navigate replace to='/'/> : <LoginRoute login={handleLogin}/> 
        } />
        <Route path='*' element={ <NotFoundRoute/> 
        } />
      </Routes>
    </BrowserRouter> 
    </Container>
  );
}



export default App;
