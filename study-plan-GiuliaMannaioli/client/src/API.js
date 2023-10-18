'use strict';

const SERVER_URL = 'http://localhost:3001';



const getAllCourses = async () => {
    const response = await fetch(SERVER_URL + '/api/courses');
    const courses = await response.json();
    if(response.ok) {
      return courses;
    }
    else
      throw courses;
  };
  const getStudyplan = async (user) => {
    const response = await fetch(`${SERVER_URL}/api/${user}/studyplans`);
    const studyplan = await response.json();

    if(response.ok) {
      return studyplan;
    }
    else
      throw studyplan;
  };

  const getCourse = async (id) => {
    const response = await fetch(`${SERVER_URL}/api/courses/${id}`);
    const course = await response.json();

    if(response.ok) {
      return course;
    }
    else
      throw course;
  };

  const saveStudyPlan = async (studyPlan, user) => {
    const response = await fetch(`${SERVER_URL}/api/${user}/studyplans`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(studyPlan)
    });
  console.log(response.body)
    if(!response.ok){
      const errMessage = await response.json();
      throw errMessage;
    }
    else return null;
  }

  const cancelStudyPlan = async (user) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/${user}/studyPlan`, {
        method: 'DELETE'
      });
      if(response.ok)
        return null;
      else {
        const errMessage = await response.json();
        throw errMessage;
      }
    } catch(err){
      throw new Error('Cannot communicate with the server');
    }
  }


const logIn = async (credentials) => {
    const response = await fetch(SERVER_URL + '/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),

    });
    if(response.ok) {
      const user = await response.json();
      return user;
    }
    else {
      console.log(response)
    const errDetails = await response.text();
    throw errDetails;
    }
  };
  
  const getUserInfo = async () => {
    const response = await fetch(SERVER_URL + '/api/sessions/current', {
      credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    }else{
      throw user;
    }
  };
  
  const logOut = async() => {
    const response = await fetch(SERVER_URL + '/api/sessions/current', {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok)
      return null;
  }
  
  const API = {logIn, logOut, getUserInfo, getAllCourses, getStudyplan, getCourse, saveStudyPlan, cancelStudyPlan};
  export default API;