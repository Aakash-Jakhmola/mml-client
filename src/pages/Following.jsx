import React from 'react';
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import base_url from '../keys'

export default () => {
  const { username } = useParams()
  const [list, setList] = React.useState([]);
  
  React.useEffect(() => {
    console.log(typeof (username))
    let url = base_url + "users/" + username + "/following"
    axios.get(url)
      .then((res) => {
        console.log(res)
        setList(res.data)
      }, (err) => console.log(err))
  }, [])

  const makeRow = (item, index) => {
    const redirectLink = "/" + item.username
    return <tr>
    <td>{index+1}</td>
    <td>{item.firstname}</td>
    <td>{item.lastname}</td>
    <td><Link to={redirectLink}>{item.username}</Link></td>
  </tr>;
  }

  return <div>
    Following
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {list && list.map(makeRow)}    
      </tbody>
    </Table>
  </div>;
}