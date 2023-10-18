
import "./ComponentsStyle.css";
import { useState } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
      event.preventDefault();
      const credentials = { username, password };
      props.login(credentials);
  };

  return (
    <div className="Login below-nav main-content text-center">
      <h1>Login</h1>
    <Form onSubmit={handleSubmit} className="formLogin">
      <Form.Group size="lg" controlId='username'>
          <Form.Label> E-mail</Form.Label>
          <Form.Control autoFocus type='username' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
      </Form.Group>

      <Form.Group size="lg" controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6}/>
      </Form.Group>
    <LoginButton login={props.login} ></LoginButton>
  </Form>
  </div>
  )
};

function LogoutButton(props) {
  const navigate = useNavigate();
  return(
    <Row>
       <Col>
          <Button className="log" variant="outline-primary" onClick={props.logout}>Logout</Button>
      </Col>
    </Row>
  )
}


function LoginButton(props) {
  const navigate = useNavigate();
  return(
    <Row>
      <Col>
          <Button className="loginform" type = "submit" >Login</Button>
         
      </Col>
    </Row>
  )
}



function OpenLoginButton(props) {
  
  const navigate = useNavigate();
  return(
    <Row>
      <Col >
        <Button className="log" onClick={()=>navigate('/login') }>Login</Button>
      </Col>
    </Row>
  )
}

export { LoginForm, LogoutButton, LoginButton, OpenLoginButton};