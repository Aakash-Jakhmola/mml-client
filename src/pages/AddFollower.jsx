import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useFormFields } from "../lib/hooksLib";
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import checkAuth from '../lib/checkAuth';
import base_url from '../keys'
import Card from 'react-bootstrap/Card'



export default () => {

  React.useEffect( () => {
		let user_id  = checkAuth("user_id")
		if (user_id) {
			console.log("inside" ,user_id);
			
		} else {
			history.push("/login");
		}
	},[])

  const [fields, handleFieldChange] = useFormFields({
    userName: "",
  });
  const history = useHistory();


  const [show , setShow] = React.useState(false) ;
  const [user, setUser] = React.useState([]);


  const addFollow = () => {
    let uname = ""
    if(user) 
      uname = user.username 
    const userid = checkAuth("user_id")
    const url = base_url + "users/follow"
    axios.post(url,{userid : userid, username : uname}).then(
      (res) => {
        if(res.data.error)
          alert(res.data.error);
        else 
          alert("Added successfully !")
        console.log(res);
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
        if (res.data.length > 0) {
          setUser(res.data[0]);
          setShow(true)
        } else {
          alert("No users found") ;
        }
      }, (err) => {
        alert("Some error occured ! Try after some time")
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
    {show && <div>
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
    </div>}
  </div>
  );
}