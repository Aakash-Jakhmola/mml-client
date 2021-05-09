import React from 'react';
import { useHistory } from 'react-router-dom'
import checkAuth from '../lib/checkAuth'


export default () => {
	const history = useHistory();
	
	const username = checkAuth("username");
	if (checkAuth("user_id")) {
		history.push(username);
	} else 
		history.push("/login");
	
	return <div>
		This should not be displayed.
	</div>;
}