import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from '../../Pages/Home';
import Profil from '../../Pages/Profil';
import Trending from '../../Pages/Trending';


// création du composant index, qui va faire les routes pour home, profil, et trending
const index = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/profil" component={Profil} />
                <Route exact path="/trending" component={Trending} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
};

export default index;