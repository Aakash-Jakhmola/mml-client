import React from 'react';
import { useHistory, Redirect } from 'react-router-dom'
import checkAuth from '../lib/checkAuth'


export default () => {
	const history = useHistory();
	
	const username = checkAuth("username");
	const url = "/" + username;
	if (checkAuth("user_id")) {
		location.href = url ;
	} else 
		history.push("/login");
	
	return <div>Not to be displayed</div>;
}