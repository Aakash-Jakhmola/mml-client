import React from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import { useFormFields } from "../lib/hooksLib";
import checkAuth from '../lib/checkAuth'
import base_url from '../keys'
import axios from 'axios'
import "../css/Card.css"

const mess = ["Read More", "Show less"];

const limit = 70;
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


const RatingAndReview = (props) => {

	const [fields, setFields] = useFormFields({
		rating: 1,
		review: ""
	})

	const [isLoading, setLoading] = React.useState(false) ;

	// React.useEffect(()=>{
	// 	if(!isLoading){
	// 		setFields({rating:1,review:''})
	// 	}
	// },[isLoading])

	const addMovie = () => {
		// call the api 
		setLoading(true) ;
		const newMovie = {
			userid: checkAuth('user_id'),
			movieid: parseInt(props.movieId),
			rating: fields.rating,
			review: fields.review
		}
		console.log(newMovie)
		console.log(typeof(newMovie.movieid))
		console.log(typeof(newMovie.rating))
		console.log(typeof(newMovie.review))
		axios.post(base_url + "users/addmovie", newMovie)
		.then( (res) => {
			setLoading(false) ;
			if(res.data.error)
				alert(res.data.error) ;
			else 
				alert("Successfully added") ;
			
		 } , (err) => alert("Some error occured try after some time"))
		.catch((err) => console.log(err))


		console.log(fields.rating);
		console.log(fields.review);
	}

	return <Form>
		<Form.Group controlId="rating">
			<Form.Label>Your rating</Form.Label>
			<Form.Control size ="sm" as="select" onChange={setFields} value={fields.rating}>
				{array.map((i) =>
					<option>{i}</option>
				)}
			</Form.Control>
		</Form.Group>
		<Form.Group controlId="review">
			<Form.Label>Your Review</Form.Label>
			<Form.Control as="textarea" rows={2} onChange={setFields} value={fields.review} />
		</Form.Group>
		<Card.Link onClick={addMovie}>Add to list</Card.Link>
		{isLoading && <Spinner animation="border"/>}
	</Form>;

}

export default (props) => {

	if(!props.movie) {
		return (<div>Nothing to Show</div>)
	}

	const imgurl = props.movie.poster_url;
	let size = "" 
	let firsttext = ""
	let rempart = ""
	let genres = ""

	if(props.movie && props.movie.genres) {
		props.movie.genres.map((g,i) => {
			if(i)
				genres += ", " + g 
			else 
				genres += g
			}
		)
	}
	
	let overview =  props.movie?props.movie.overview:''
	size = overview.length
	firsttext = overview.substr(0, Math.min(limit, size));
	if (size > limit)
		rempart = overview.substr(limit, size - limit + 1);

	const [open, setOpen] = React.useState(1);
	// console.log(props)
	

	return (
		<div className='card'>
			<div className='main'>
				<div className='poster-container'>
					<img src={imgurl}/>
				</div>
				<div className='movie-content'>
					<span className='movie-title'>{props.movie.title}</span>
					<div className='movie-info'>
						<span>{props.movie.release_date.substring(0,4)} </span>
						{props.movie.runtime &&	<span>{parseInt(props.movie.runtime/60)}h {props.movie.runtime%60}m </span>}
					</div>
					<div className='genres'>
					{	props.movie.genres.map((g,id)=>id<=2&&(
						<span>{g}</span>
					))}
					</div>
					<div className='overview'>{props.movie.overview}</div>		
				</div>
			</div>
			<hr style={{borderTop:'2px solid', borderColor:'#f0f0f0', marginTop:'2px',marginBottom:'0px'}}></hr>
			{!props.fromSearch && <div className='rating-review'>
				<div className='review'>{props.review}</div>
				<div className='rating'><span style={{fontWeight:'400',fontSize:'15px'}}>Score: </span>{props.rating}</div>
			</div>}
			{props.fromSearch && <div className='form-wrapper'><RatingAndReview movieId={props.movie.id} /></div>}
		</div>
	)
}