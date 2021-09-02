import React from 'react';
import { useHistory, Redirect } from 'react-router-dom'
import checkAuth from '../lib/checkAuth'
import base_url from '../keys'
import axios from 'axios';

export default () => {
	const history = useHistory();
	const username = checkAuth("username");
	const url = "/" + username;

	React.useEffect(()=>{
		axios.get(base_url+'users/isAuthenticated')
		.then((res)=>{
			console.log(res)
			if(res.data.error) {
				history.push("/login");
			}else 
			location.href = url ;
		})
		.catch((err)=>{
			console.log(err)
			history.push("/login");
		})
	},[])
	
	return <div></div>;
}