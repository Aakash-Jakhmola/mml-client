import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useFormFields } from "../lib/hooksLib";
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import checkAuth from '../lib/checkAuth';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MyCard from '../components/MyCard'
import base_url from '../keys'


export default () => {

	const [fields, handleFieldChange] = useFormFields({
		movieName: "",
	});
	const history = useHistory();

	const [movieList, setMovieList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false) ;
	useEffect( () => {
		let user_id  = checkAuth("user_id")
		if (user_id) {
			console.log("inside" ,user_id);
			
		} else {
			history.push("/login");
		}
	},[])


	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(fields.movieName)
		setIsLoading(true) ;
		const fetchURL = base_url + "movies/search/" + fields.movieName;
		axios.get(fetchURL).then(
			(res) => {
				console.log(res);
				setMovieList(res.data);
				setIsLoading(false) ;
			}, (err) => {
				console.log(err);
			}
		)

	}

	const validateForm = () => {
		return fields.movieName.length > 0;
	}

	return (<div>
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="movieName" size="lg">
				<Form.Label>Enter the Movie Name</Form.Label>
				<Form.Control
					autoFocus
					type="text"
					value={fields.movieName}
					onChange={handleFieldChange}
				/>
			</Form.Group>

			<Button type="submit" disabled={!validateForm()}>
				Search
		</Button>
		{isLoading && <Spinner animation="border" />}
		</Form>
		<div>
				{movieList && movieList.length> 0 && movieList.map((movie) => 
						<MyCard movie={movie} show ={true} fromSearch={true}/>
					
				)}
		</div>
	</div>
	);
}