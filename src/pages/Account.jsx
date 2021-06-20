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
  const [curPageNumber, setCurPageNumber] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [user, setUser] = React.useState(inituser)
  const [orderBy, setOrderBy] = React.useState('Time')

  const inituser = {
    username : username,
    firstname : "",
    lastname : "",
    movies_count : 0,
    followers_count: 0,
    following_count:0
  }

  React.useEffect(()=>{
    if(user) {
      if(user.movies_count === 0) {
        setTotalPages(0)
      } else {
        setTotalPages(parseInt(user.movies_count/10) + (user.movies_count%10!==0))
      }
    }
  },[user])

  React.useEffect(() => {
    let url1 = base_url + "users/" + username
		axios.get(url1). then((res) => {
			setUser(res.data[0]);
	 	}, (err) => console.log(err))
  }, [])
  
  React.useEffect(()=>{
    console.log('orderby ',orderBy)
    let url = base_url + "users/" + username + "/movielist"+'?offset='+(curPageNumber-1)*10 +'&orderby='+ orderBy.toLowerCase();
    axios.get(url).then((res) => {
      setMovieList(res.data);
    }, (err) => {
      console.log(err);
    })
  },[curPageNumber,orderBy])


  // function isNum(x) {
  //   return x!==NaN
  // }
  // function handlePageChange(e) {
  //   if(isNum(e.target.value)) {
  //     setCurPageNumber(parseInt(e.target.value));
  //   }
  // }

  function handleOrderByChange() {
    if(orderBy === 'Time') {
      setOrderBy('Rating')
    } else {
      setOrderBy('Time')
    }
  }

  function increment() {
    setCurPageNumber((prev) => prev + 1);

  }

  function decrement() {
    setCurPageNumber((prev) => prev - 1);
  }


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

    <div style={{margin:'1rem 0',width:'100%',overflow:'hidden'}}>
     <button className='orderby-btn' onClick={handleOrderByChange}
     style={{backgroundColor:`${orderBy==='Time'?'#00bfff':'#0186b3'}`}}>{orderBy}</button>
    </div>

    <Row >
      {movieList && movieList.length > 0 && movieList.map((movie) =>
        <Col xs={12} md={4}>
          <MyCard movie={movie.movie} show={false} review={movie.review} rating={movie.rating} />
        </Col>
      )}
    </Row>
    {totalPages > 0 && <div className="page-container">
      <button className="arrow-btn" disabled={curPageNumber === 1} onClick={decrement}><i class="fas fa-angle-left"></i></button>
      {" Page "}
      <input type="text" inputmode="numeric" value={curPageNumber}
      //  onChange={handlePageChange} 
       />
      {" of "} {totalPages} {" "}
      <button className="arrow-btn" disabled={curPageNumber === totalPages} onClick={increment}><i class="fas fa-angle-right"></i></button>
    </div> }
    
  </div>;
}
