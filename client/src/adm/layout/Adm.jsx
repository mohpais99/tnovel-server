import React, { Component } from 'react';
import {Header, Sidebar} from '../components';
import routes from 'adm/admRoutes';
import '../adm.css';
import 'assets/css/table.css'
import { Redirect, Route, Switch } from 'react-router-dom';

export class Adm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: true,
        }
        this.handleSidebar = this.handleSidebar.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        let device;
        if (window.innerWidth > 993 ) {
            device = 'desktop'
        } else if (window.innerWidth >= 599 && window.innerWidth < 990) {
            device = 'tablet'
        } else if (window.innerWidth < 589) {
            device = 'mobile'
        }
        return this.setState({ device });
    }

    getRoutes(routes) {
        return routes.map((prop, key) => {
            return (
                <Route 
                    key={key}
                    path={`/${prop.layout}/${prop.path}`}
                    render={props => 
                        <prop.component {...props} />
                    }
                    exact />
            );
        });
    }
    
    handleSidebar() {
        return this.setState({sidebar: !this.state.sidebar})
    }
    render() {
        return (
            <div className="wrapper--adm">
                <Sidebar show={this.state.sidebar} device={this.state.device} />
                
                <div className="main">
                    <Header sidebar={this.state.sidebar} handleSidebar={this.handleSidebar} />
                    <div className="content-panel">
                        <Switch>
                            {this.getRoutes(routes)}
                            <Redirect from="/admpanel" to="/admpanel/dashboard" />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default Adm;