'use strict';

import "./ComponentsStyle.css";
import { LoginForm } from './Authentication';
import { Button, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import CoursesList from "./Courses";



function NotFoundRoute() {
    return(
        <>
          <h2>This is not the route you are looking for!</h2>
          <Link to="/">
            <Button variant="primary">Go Home!</Button>
          </Link>
        </>
    );
  }
  
  function CoursesRoute(props) {
    return(
      
        <Row>
          <Col>
            <CoursesList courses={props.courses} generalList={true} />
            
          </Col>
        </Row>
      
    );
  }

  function StudyPlanRoute(props) {
    return(
      
        <Row>
          <Col>
            <CoursesList courses={props.studyPlan} generalList={false} user={props.user} career={props.career} 
                                            cancelStudyPlan={props.cancelStudyPlan} saveStudyPlan={props.saveStudyPlan}  /> 
            <CoursesList courses={props.courses}  generalList={true} user={props.user} />
          </Col>
        </Row>
      
    );
  }
  
  function LoginRoute(props) {
    return(
      <>
        <Row>
          <Col>
            <LoginForm  login={props.login} />
          </Col>
        </Row>
      </>
    );
  }
  
  export {LoginRoute, NotFoundRoute, CoursesRoute, StudyPlanRoute};