import React from 'react';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import { useFormFields } from "../lib/hooksLib";
import checkAuth from '../lib/checkAuth'
import axios from 'axios'

// adult: false
// backdrop_path: null
// genre_ids: [27]
// id: 291545
// original_language: "en"
// original_title: "Parasite"
// review: "An abandoned oil rig in the middle of the North Sea. Dr. Christine Hansen is charged with the task of testing an experimental cleaning fluid which could revolutionize the oil industry. Hired to carry out the tests is Jacob Rasmussen and his rough and ready crew of deconstruction engineers. But within hours one of them is missing under suspicious circumstances. Things go from bad to worse when environmental activist Mickey Hennessey and his hard-bitten associates seize control of the rig, taking everybody on board hostage. But very soon oil workers and environmentalists will be compelled to join forces in an evolutionary battle for survival. For a savage new life-form has made its home on the rig. And it is hungry."
// popularity: 10.074
// poster_path: "/lDsUWvTHbSsI62u63S8B6Jjgztb.jpg"
// release_date: "2004-01-01"
// title: "Parasite"
// video: false
// vote_average: 5.6
// vote_count: 12

const mess = ["Read More", "Show less"];

const limit = 70;
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


const RatingAndReview = (props) => {

	const [fields, setFields] = useFormFields({
		rating: 1,
		review: ""
	})


	const addMovie = () => {
		// call the api 

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
		axios.post("http://localhost:8000/users/addmovie", newMovie)
		.then( (res) => {console.log("successfully added") } , (err) => alert("Some error occured"))
		.catch((err) => console.log(err))


		console.log(fields.rating);
		console.log(fields.review);
	}

	return <Form>
		<Form.Group controlId="rating">
			<Form.Label>Your rating</Form.Label>
			<Form.Control as="select" onChange={setFields} value={fields.rating}>
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
	</Form>;

}

export default (props) => {
	const imgurl =  props.movie.poster_url;
	let size = "" 
	let firsttext = ""
	let rempart = ""
	let genres = ""

	props.movie.genres.map((g,i) => {
		if(i)
			genres += ", " + g 
		else 
			genres += g
		}
	)
	
	size = props.movie.overview.length;
	firsttext = props.movie.overview.substr(0, Math.min(limit, size));
	if (size > limit)
		rempart = props.movie.overview.substr(limit, size - limit + 1);

	const [open, setOpen] = React.useState(1);
	

	return <Card bg="dark" text="light" style={{ width: '18rem', marginTop: '1rem' }}>
		<Card.Img variant="top" src={imgurl} style={{ height: "150px", objectFit: "cover" }} />
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