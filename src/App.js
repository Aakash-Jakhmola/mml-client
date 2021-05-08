import "./styles.css";
import React, { useEffect } from "react";
import Routes from "./routes";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {useHistory} from 'react-router-dom' ;
import {useSelector} from 'react-redux' ;
import {useDispatch} from 'react-redux' ;
import axios from 'axios' ;
import { FetchUser, LogoutUser } from "./redux/actions";
import checkAuth from "./lib/checkAuth";


export default function App() {

  const [isLogged, setLogged] = React.useState(false) ;
  

  const history = useHistory() ;
  const dispatch = useDispatch() ;
  const user = useSelector(state => state.userReducer.user) ;
  
  
  useEffect( () => {
    if(checkAuth("user_id")) {
      setLogged(true) ;
    }
    else {
      setLogged(false) ;
    }
    console.log("hojo")
  
  },[user])
 
  const handleLogout = () => {
    setLogged(false) ;
    
    document.cookie = "user_id="  
    document.cookie = "username=" 
    dispatch(LogoutUser())
    history.push("/login") ;
  }
  
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand href="/" className="font-weight-bold text-muted">
          My Movie List
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {!isLogged && <Nav.Link href="/signup">Signup</Nav.Link>}
            {!isLogged && <Nav.Link href="/login">Login</Nav.Link> }
            {isLogged && <Nav.Link href="/addmovie">Add Movie</Nav.Link>}
            {isLogged &&<Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

