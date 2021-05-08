import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useFormFields } from "../lib/hooksLib";
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import checkAuth from '../lib/checkAuth';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MyCard from '../components/MyCard'
import base_url from '../keys'
import Card from 'react-bootstrap/Card'


export default () => {



  const [fields, handleFieldChange] = useFormFields({
    userName: "",
  });
  const history = useHistory();

  const [user, setUser] = React.useState([]);


  const addFollow = () => {
    const uname = ""
    if(user) 
      uname = user.username 
    const userid = checkAuth("user_id")
    const url = base_url + "users/follow"
    axios.post(url,{userid : userid, username : uname}).then(
      (res) => {
        
      }, (err) => console.log(err)
    )

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fields.userName)
    const fetchURL = base_url + "users/" + fields.userName;
    axios.get(fetchURL).then(
      (res) => {
        console.log(res.data);
        if (res.data.length > 0)
          setUser(res.data[0]);
      }, (err) => {
        console.log(err);
      }
    )

  }

  const validateForm = () => {
    return fields.userName.length > 0;
  }

  return (<div>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="userName" size="lg">
        <Form.Label>Enter the User Name</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          value={fields.userName}
          onChange={handleFieldChange}
        />
      </Form.Group>

      <Button type="submit" disabled={!validateForm()}>
        Search
		</Button>
    </Form>
    <div>
      <Card>
        <Card.Header>@{user.username}</Card.Header>
        <Card.Body>
          <Card.Title>{user.firstname} {user.lastname}</Card.Title>
          <Card.Text>
            Movies : {user.movies_count}  
          </Card.Text>
          <Card.Text>
            Followers : {user.followers_count}  
          </Card.Text>
          <Card.Text>
            Following : {user.following_count}  
          </Card.Text>
          <Button variant="primary" onClick={addFollow}>Follow</Button>
        </Card.Body>
      </Card>
    </div>
  </div>
  );
}