import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom'
import checkAuth from '../lib/checkAuth'
import axios from 'axios'
import MyCard from '../components/MyCard'
import {useSelector} from 'react-redux'
import base_url from '../keys'
import { SettingsInputSvideoRounded } from '@material-ui/icons';

export default () => {

	const [movieList, setMovieList] = React.useState([]);
	const [user, setUser] = React.useState({}) ;
	const history = useHistory();
	
	const username = checkAuth("username");
	if (checkAuth("user_id")) {
		history.push(username);
	} else 
		history.push("/login");
	



	// React.useEffect(()=>{
	// 	let url = base_url + "users/" + checkAuth("username")
	// 	axios.get(url). then((res) => {
	// 		console.log(res) ;
	// 		setUser(res.data);
	// 	}, (err) => console.log(err))
	// },[])



	// React.useEffect(() => {
	// 	let url = base_url + "users/" + checkAuth("username") + "/movielist";
		
	// 	console.log(user)
	// 	axios.get(url).then((res) => {
	// 		setMovieList(res.data[0]);
	// 		console.log(res);
	// 	}, (err) => {
	// 		console.log(err);
	// 	})
	// }, [])



	return <div>
		<div style={{display:"flex", justifyContent:"space-evenly"}}>
			<div>
				<h1>{user ? user.firstname + user.lastname : ""} </h1>
				<h5>@{user ? user.username : ""}</h5>
			</div>
			<div  style={{marginLeft : "auto" ,display:"flex", flexDirection:"column" ,alignItems:"center"}}>
				<h2>{user ? user.movies_count : 0}</h2>
				<h4>Movies</h4>
			</div>
			<div style={{marginLeft:"20px",display:"flex", flexDirection:"column" ,alignItems:"center"}}>
			<a href={ (user ? user.username : "") + "/followers"}><h2>{user ? user.followers_count : 0}</h2></a>
				<h4>Followers</h4>
			</div>
			<div  style={{marginLeft : "10px" ,display:"flex", flexDirection:"column" ,alignItems:"center"}}>
				<a href={ (user ? user.username : "") + "/following"}><h2>{user ? user.following_count : 0}</h2> </a>
				<h4>Following</h4>
			</div>
			
		</div>
		<Row >
			{movieList && movieList.length > 0 && movieList.map((movie) =>
				<Col xs={6} md={4}>
					<MyCard movie={movie.movie} show={false} review={movie.review} rating={movie.rating} />
				</Col>
			)}
		</Row>
	</div>;
}