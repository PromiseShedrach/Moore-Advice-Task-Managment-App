
import React, {useState} from 'react';
import { Redirect } from "react-router-dom";
 export function Nav() {

    const [getRedirect, setRedirect] = useState(false);

    function logout(){
        localStorage.clear();
        setRedirect(true)
    }

    function renderRedirect() {
        if (getRedirect) {
            return <Redirect to='/Login' />
        }
    }

   
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {renderRedirect()}
            <a className="navbar-brand" href="#">MV Task Manager </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                  
                </ul>
            <button onClick={logout} className="btn btn-outline-danger pull-right my-2 my-sm-0" type="submit">Logout</button>
            </div>
        </nav>

    )
}