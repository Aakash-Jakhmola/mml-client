import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../lib/hooksLib";
import "../css/Login.css";
import axios from 'axios';
import checkauth from "../lib/checkAuth";
import base_url from '../keys'

axios.defaults.withCredentials = true

export default  function Login() {

	const history = useHistory();
	const [loginError, setLoginError] = useState('')
	const [fields, handleFieldChange] = useFormFields({
		username: "",
		password: ""
	});
	
	function validateForm() {
		return fields.username.length > 0 && fields.password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		const newUser = {
			username: fields.username,
			password: fields.password,
		};

		axios.post(base_url + 'users/login', newUser)
			.then((response) => {
				if (!response.data.error) {
					console.log('OK',response.data)
					document.cookie = "user_id=" + response.data._id 
					document.cookie = "username=" + response.data.username ;
					history.push("/");	
				} else {
					//alert(response.data);
					setLoginError(response.data.error)
					console.log('error',response.data);	
					//history.push("/login");
				}
			}, (error) => alert("Some error occured. " + error))
		console.log('what is happening')
	}

	return (
		<div className="Login">
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={fields.username}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={fields.password}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Login
				</Button>
			</Form>
			<span>{loginError}</span>
		</div>
	);


}



