import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddMovie from './pages/AddMovie'
import NotFound from './pages/NotFound' 
import Home from './pages/Home' 
import Followers from './pages/Followers'
import Following from './pages/Following'
import Account from './pages/Account'
import AddFollower from './pages/AddFollower'


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path = "/:username/followers">
                <Followers />
            </Route>
            <Route path = "/:username/following">
                <Following />
            </Route>
            <Route path="/addmovie">
                <AddMovie />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/addfollower">
                <AddFollower />
            </Route>
            <Route path="/:username">
                <Account />
            </Route>
            
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}


