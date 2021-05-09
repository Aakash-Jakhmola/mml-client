import React from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyCard from '../components/MyCard'
import { useParams, useHistory } from 'react-router-dom'
import base_url from '../keys'

export default () => {
  const { username } = useParams()
  const [movieList, setMovieList] = React.useState([]);

  const inituser = {
    username : username,
    firstname : "firstname",
    lastname : "lastname",
    movies_count : 0,
    followers_count: 0,
    following_count:0
  }

  const [user, setUser] = React.useState(inituser)

  React.useEffect(() => {
    let url1 = base_url + "users/" + username
		axios.get(url1). then((res) => {
			console.log(res) ;
			setUser(res.data[0]);
	 	}, (err) => console.log(err))

    let url = base_url + "users/" + username + "/movielist";
    
    axios.get(url).then((res) => {
      setMovieList(res.data);
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }, [])



  return <div>
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div>
        <h1 style={{fontSize:"200%"}}>{user ? user.firstname + " " + user.lastname : ""} </h1>
        <h5 style={{fontSize:"100%"}}>@{user ? user.username : ""}</h5>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{fontSize:"200%"}}>{user ? user.movies_count : 0}</h2>
        <h4 style={{fontSize:"100%"}}>Movies</h4>
      </div>
      <div style={{ marginLeft: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <a href={(user ? user.username : "") + "/followers"}><h2 style={{fontSize:"200%"}}>{user ? user.followers_count : 0}</h2></a>
        <h4 style={{fontSize:"100%"}}>Followers</h4>
      </div>
      <div style={{ marginLeft: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <a href={(user ? user.username : "") + "/following"}><h2 style={{fontSize:"200%"}}>{user ? user.following_count : 0}</h2> </a>
        <h4 style={{fontSize:"100%"}}>Following</h4>
      </div>

    </div>
    <Row >
      {movieList && movieList.length > 0 && movieList.map((movie) =>
        <Col xs={12} md={4}>
          <MyCard movie={movie.movie} show={false} review={movie.review} rating={movie.rating} />
        </Col>
      )}
    </Row>
  </div>;
}
