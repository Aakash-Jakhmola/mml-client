import React from 'react'
import axios from 'axios'
import MyCard from '../components/MyCard'
import { useParams, useHistory } from 'react-router-dom'
import base_url from '../keys'
import '../css/AccountStyles.css'
import '../css/Card.css'

axios.defaults.withCredentials = true

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
			setUser(res.data);
	 	}, (err) => console.log(err))
  }, [])
  
  async function getMovieList() {
    let url = base_url + "users/" + username + "/movielist"+'?offset='+(curPageNumber-1)*10 +'&orderby='+ orderBy.toLowerCase();
    axios.get(url).then((res) => {
      setMovieList(res.data);
    }, (err) => {
      console.log(err);
    })
  }

  React.useEffect(()=>{
    getMovieList()
  },[curPageNumber,orderBy])

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
    <div className='profile-wrapper'>
      <div>
        <h1 style={{fontSize:"200%"}}>{user ? user.firstname + " " + user.lastname : ""} </h1>
        <h5 style={{fontSize:"100%"}}>@{user ? user.username : ""}</h5>
      </div>
      <hr style={{height:'5px', margin:'0'}}/>
      <div className='stats'>
      <div className='info'>
        <i class="fas fa-film" style={{color:"rgb(50,120,250)", backgroundColor:'#D6E7FF'}}></i>
        <div className='info-text'>
          <span>{user ? user.movies_count : 0} </span>
          <span>Movies</span>
        </div>
      </div>
      <div className='info'>
        <i class="fas fa-users"  style={{color:"rgb(87,191,99)", backgroundColor:'#DAF9D4'}}></i>
        <div className='info-text'>
          <a href={(user ? user.username : "") + "/followers"}>
            <span>{user ? user.followers_count : 0}</span>
            <span>Followers</span>
          </a>
        </div>
      </div>
      <div className='info'>
        <i class="fas fa-user-friends" style={{color:"rgb(133,118,195)", backgroundColor:'#E4DFF1'}}></i>
        <div className='info-text'>
          <a href={(user ? user.username : "") + "/following"}>
            <span>{user ? user.following_count : 0}</span> 
            <span> Following</span>
          </a>
        </div>
      </div>
      </div>
    </div>
    <hr/>

    <div style={{margin:'1rem 0',width:'100%',overflow:'hidden'}}>
     <button className='orderby-btn' onClick={handleOrderByChange}
     style={{backgroundColor:`${orderBy==='Time'?'#00bfff':'#0186b3'}`}}>{orderBy}</button>
    </div>

    <div className='card-wrapper'>
      {movieList && movieList.length > 0 && movieList.map((movie) =>
        <MyCard movie={movie.movie} 
          show={false} 
          review={movie.review} 
          rating={movie.rating} 
          key={movie.id} 
          user={username} 
          getMovieList={getMovieList}/>
      )}
    </div>
   
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
