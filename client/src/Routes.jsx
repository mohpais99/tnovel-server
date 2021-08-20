import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Adm from 'adm/layout/Adm';
import Auth from 'auth/layout/Auth';
import App from 'app/layout/App';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/admpanel" render={props => <Adm {...props} />}  />
                <Route path="/auth" render={props => <Auth {...props} />}  />
                <Route path="/" render={props => <App {...props}  />} exact />
            </Switch>
        </Router>
    )
}
