import "./styles.css";
import React from "react";
import Routes from "./routes";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {useHistory} from 'react-router-dom' ;
import checkAuth from "./lib/checkAuth";
import base_url from './keys'
import axios from 'axios';

axios.defaults.withCredentials = true

export default function App() {

  const [isLogged, setLogged] = React.useState(false) ;
  
  const history = useHistory() ;

  React.useEffect(()=>{
		axios.get(base_url+'users/isAuthenticated')
		.then((res)=>{
			console.log(res)
			if(res.data.error) {
        setLogged(false) ;
				history.push("/login");
			}else 
        setLogged(true) ;
		})
		.catch((err)=>{
			console.log(err)
			history.push("/login");
		})
	},[])

  // React.useEffect( () => {
  //   if(checkAuth("user_id")) {
  //     setLogged(true) ;
  //   }
  //   else {
  //     setLogged(false) ;
  //   }
  
  // },[])
 
  const handleLogout = () => {
    setLogged(false) ;
    axios.post(base_url + 'users/logout',{},{withCredentials:true})
    history.push("/login") ;
  }
  
  return (
    <div className="App container-fluid">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3" sticky='top' >
        <Navbar.Brand href="/" className="font-weight-bold text-muted">
          My Movie List
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {!isLogged && <Nav.Link href="/signup">Signup</Nav.Link>}
            {!isLogged && <Nav.Link href="/login">Login</Nav.Link> }
            {isLogged && <Nav.Link href="/addfollower">Find Friend</Nav.Link>}
            {isLogged && <Nav.Link href="/addmovie">Add Movie</Nav.Link>}
            {isLogged &&<Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

