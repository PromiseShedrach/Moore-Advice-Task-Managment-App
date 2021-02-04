import React, { useState } from 'react';
import Axios from "axios";
import { Redirect } from "react-router-dom";

export function Login(){
   

    const [getEmail, setEmail] = useState();
    const [getPassword, setPassword] = useState();
    const [getBtn, setBtn] = useState('Login');
    const [getRedirect, setRedirect] = useState(false);


    function submitData(data){
        data.preventDefault()
        setBtn('Authenticating..')

        Axios.post('https://moore-task-app.herokuapp.com/api/login',
            {
                email: getEmail,
                password: getPassword,
            }
        ).then((resp) => {
            document.getElementById('form').reset()
            setBtn('Login')
            var status = ''

            if(resp.data.status == 'success' && resp.statusText == 'OK'){
                var token = resp.data.token;
                setRedirect(true)
                console.log('success')
            }else{
                setBtn('Login')
                alert('Invalided Login Detail')
            }
        })
    }


    function renderRedirect(){
        if (getRedirect) {
          return <Redirect to='/tasks' />
        }
      }

    return (
        <div>
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 marginTop" >
                {renderRedirect()}
                    <div className="card ">
                       
                    <form id="form" className="loginBody">
                    <h1 className="text-center">Admin Login</h1>
                    <br></br>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" onChange={event => setEmail(event.target.value)}  />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name="password" className="form-control" onChange={event => setPassword(event.target.value)}  id="exampleInputPassword1"  placeholder="Password" />
                        </div>
                        
                        <button type="submit" onClick={submitData} className="btn btn-primary">{getBtn}</button>
                    </form>
                </div>
                </div>
                </div>
                </div>
        </div>
    )
}

