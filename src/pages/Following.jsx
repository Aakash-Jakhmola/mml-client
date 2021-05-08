import React from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table'

export default () => {
  const { username } = useParams()
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    console.log(typeof (username))
    let url = "http://localhost:8000/users/" + username + "/following"
    axios.get(url)
      .then((res) => {
        console.log(res)
        setList(res.data)
      }, (err) => console.log(err))
  }, [])

  const makeRow = (item, index) => {
    return <tr>
    <td>{index+1}</td>
    <td>{item.firstname}</td>
    <td>{item.lastname}</td>
    <td>{item.username}</td>
  </tr>;
  }

  return <div>
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