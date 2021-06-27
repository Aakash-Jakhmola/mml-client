import React from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useFormFields } from "../lib/hooksLib";
import { ToastContainer, toast } from 'react-toastify';
import {useSelector} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import checkAuth from '../lib/checkAuth'
import base_url from '../keys'
import "../css/Card.css"
import Modal from './Modal'

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const RatingAndReview = (props) => {

	const [fields, setFields] = useFormFields({
		rating: 1,
		review: ""
	})

	const [isLoading, setLoading] = React.useState(false) ;
	const [added, setAdded] = React.useState(false)

	const sucessToast = () => toast.success('Movie Added ', {
		position: "bottom-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		});

		const warningToast = (warning) => toast.warn(warning, {
			position: "bottom-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});

	const errorToast = () => toast.error('Something bad happened\n try after sometime', {
			position: "bottom-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});


	const addMovie = () => {
		setLoading(true) ;
		const newMovie = {
			userid: checkAuth('user_id'),
			movieid: parseInt(props.movieId),
			rating: fields.rating,
			review: fields.review
		}
		axios.post(base_url + "users/addmovie", newMovie)
		.then( (res) => {
			console.log(res)
			setLoading(false) ;
			if(res.data.error) {
				warningToast(res.data.error)
			}
			else {
				setAdded(true)
				sucessToast()
			}
		 } , (err) => {
			setLoading(false) 
			errorToast(err);
			console.log(err)
		 })
		.catch((err) => console.log(err))
	}

	return (
		<div>
			<Form>
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
		</Form>
		<ToastContainer />		
		</div>
	)

}

export default (props) => {

	const user = checkAuth('username')
	const [isEditing, setIsEditing] = React.useState(false)
	
	async function update() {
		setIsEditing((prev)=>!prev)
	}

	async function deleteMovie() {
		const deleteUrl = `${base_url}users/${user}/movielist?movieid=${props.movie.id}`
		axios.delete(deleteUrl)
		.then((response)=>{
			console.log(response)
			props.getMovieList()
			setIsEditing(false)
		})
		.catch((err)=>{
			console.log(err)
		})
	}


	if(!props.movie) {
		return (<div>Nothing to Show</div>)
	}

	return (
		<div className='card'>
			<div className='main'>
				<div className='poster-container'>
					<img src={props.movie.poster_url}/>
				</div>
				<div className='movie-content'>
				{!props.fromSearch && user === props.user &&  
					<div className='icon'>
						<i className="far fa-edit" onClick={update}/>
						<i className="far fa-trash-alt" onClick={deleteMovie}/>
					</div>}

					<span className='movie-title'>{props.movie.title}</span>
					<div className='movie-info'>
						{props.movie.release_date && <span>{props.movie.release_date.substring(0,4)} </span>}
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
			{isEditing && <Modal update={update} rating={props.rating} review={props.review} user = {user} movie={props.movie}/>}
			{props.fromSearch && <div className='form-wrapper'><RatingAndReview movieId={props.movie.id} /></div>}
		</div>
	)
}