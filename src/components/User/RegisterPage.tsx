import * as React from 'react';
import { Button, Checkbox, Col, Form, FormControl, FormGroup } from 'react-bootstrap';

class RegisterPage extends React.Component {

   
      
    public render(){
        return(
            <>
            <h1>Sign up here</h1>
            <FormInstance/>
            </>
            );
    }
}
  const FormInstance = () => (
    <Form horizontal>
  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass="fieldset" sm={2}>
      Email
    </Col>
    <Col sm={10}>
      <FormControl type="email" placeholder="Email" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalPassword">
    <Col componentClass="fieldset" sm={2}>
      Password
    </Col>
    <Col sm={10}>
      <FormControl type="password" placeholder="Password" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalConfirmPassword">
    <Col componentClass="fieldset" sm={2}>
      Confirm Password
    </Col>
    <Col sm={10}>
      <FormControl type="password" placeholder="Password" />
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={2} sm={10}>
      <Checkbox>Remember me</Checkbox>
    </Col>
  </FormGroup>

  <FormGroup>
    <Col smOffset={2} sm={10}>
      <Button type="submit">Sign in</Button>
    </Col>
  </FormGroup>
</Form>
  );
export default RegisterPage;