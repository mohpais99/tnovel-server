import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Adm from 'adm/layout/Adm';
// import App from 'app/layout/App';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/admpanel" render={props => <Adm {...props} />}  />
                {/* <Route path="/" render={props => <App {...props} />} exact /> */}
                <Redirect from="/" to="/admpanel" />
            </Switch>
        </Router>
    )
}
