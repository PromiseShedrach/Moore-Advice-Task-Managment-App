import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import {Login} from './pages/Login'
import {Task} from './pages/Task'
import {Error404} from './pages/Error404'

function Example() {
    return (
      <div>
           <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/tasks" component={Task} />
                    <Route  path="/" component={Error404} />
                </Switch>
            </BrowserRouter>
      </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
