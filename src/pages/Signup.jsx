import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../lib/hooksLib";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import base_url from '../keys'
import { ToastContainer, toast } from 'react-toastify';

axios.defaults.withCredentials = true

const initialState = {
	username: "",
	password: "",
	confirmPassword: "",
	firstname: "",
	lastname: ""
}

export default function Signup() {
	const [fields, handleFieldChange] = useFormFields(initialState);
	const history = useHistory();

	function successToast() {
		return toast.success('Account Created ', {
			position: "bottom-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});
	}

	function validateForm() {
		return (
			fields.username.length > 0 &&
			fields.password.length > 0 &&
			fields.firstname.length > 0 &&
			fields.password === fields.confirmPassword
		);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const newUser = {
			username: fields.username,
			password: fields.password,
			firstname: fields.firstname,
			lastname: fields.lastname
		};
		axios.post(base_url + 'users/register', newUser).then((response) => {
			console.log(response);
			if (parseInt(response.status/100) === 2) {
				successToast()
				history.push("/login");
			} else {
				let message = "Some error occured. Try after some time!";
				if (response.status === 401)
					message = "User with the email already exists";
				alert(message);
				history.push("/signup");
			}
		}, (error) => console.log(error));


	}


	function renderForm() {
		return (
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="firstname" size="lg">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={fields.firstname}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="lastname" size="lg">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						value={fields.lastname}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="username" size="lg">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						value={fields.username}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="password" size="lg">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={fields.password}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="confirmPassword" size="lg">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						onChange={handleFieldChange}
						value={fields.confirmPassword}
					/>
				</Form.Group>
				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Signup
          </Button>
			</Form>
		);
	}

	return (
		<div className="Signup">
			{renderForm()}
		</div>
	);
}