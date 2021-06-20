import React from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import { useFormFields } from "../lib/hooksLib";
import checkAuth from '../lib/checkAuth'
import base_url from '../keys'
import axios from 'axios'


const mess = ["Read More", "Show less"];

const limit = 70;
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


const RatingAndReview = (props) => {

	const [fields, setFields] = useFormFields({
		rating: 1,
		review: ""
	})

	const [isLoading, setLoading] = React.useState(false) ;

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
	

	return <Card style={{ width: '18rem', marginTop: '1rem' }}>
		<Card.Img variant="top" src={imgurl} style={{ height: "12rem", objectFit: "cover" }} />
		<Card.Body>
			<Card.Title>{props.movie.title} ({props.movie.release_date})</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">{genres}</Card.Subtitle>
			<Card.Subtitle className="mb-2 text-muted">{props.movie.language}</Card.Subtitle>
			<Card.Text>
				{firsttext + (open ? "" : rempart)}
				<Card.Link onClick={() => setOpen(1 - open)} >{mess[1 - open]}</Card.Link>

			</Card.Text>
			
			{props.show && <RatingAndReview movieId={props.movie.id} />}
			{!props.show && <Card.Text>Your Score : {props.rating}</Card.Text>}
			{!props.show && <Card.Text>Your Review : {props.review}</Card.Text>}
		</Card.Body>
	</Card>;
}