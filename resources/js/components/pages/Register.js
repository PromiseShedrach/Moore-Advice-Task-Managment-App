import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";

export function Register() {


    const [getEmail, setEmail] = useState();
    const [getPassword, setPassword] = useState();
    const [getName, setName] = useState();
    const [getConfirmPass, setConfirmPass] = useState();
    const [getBtn, setBtn] = useState('Register');
    const [getRedirect, setRedirect] = useState(false);
    const [getAlert, setAlert] = useState({
        success: false,
        error: false,
        message: ''
    });

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal


        //get token
        if(localStorage.getItem('token')){
            setRedirect(true)
        }


        return function cleanup() {
            abortController.abort()
        }

    }, [])


    function submitData(data) {
        data.preventDefault()
        setAlert({
            success: false,
            error: false,
        })
        setBtn('Registering..')

        if (getEmail && getName && getPassword && getConfirmPass) {
            if ((getPassword.length) >= 8) {
                if (getPassword == getConfirmPass) {
                    Axios.post('https://moore-task-app.herokuapp.com/api/register_users',
                        {
                            email: getEmail,
                            name: getName,
                            password: getPassword,
                        }
                    ).then((resp) => {
                        document.getElementById('form').reset()
                        setBtn('Login')
                        if (resp.data.status == 'success' && resp.statusText == 'OK') {
                            var token = resp.data.token;
                            setAlert({
                                success: true,
                                message: 'Registration Successfully!'
                            })
                            //console.log(token);
                            localStorage.setItem('token', token);
                            setRedirect(true)
                        } else {
                            setBtn('Register')
                            setAlert({
                                error: true,
                                message: 'An error ocurred. Tray Again!'
                            })
                        }
                    })
                } else {
                    setAlert({
                        error: true,
                        message: 'Password is Not Confirmed!'
                    })
                    setBtn('Register')
                }
            } else {
                setAlert({
                    error: true,
                    message: 'Password must be 8 characters or greater!'
                })
                setBtn('Register')
            }
        } else {
            setAlert({
                error: true,
                message: 'All fields are required Please!'
            })
            setBtn('Register')
        }
    }


    function renderRedirect() {
        if (getRedirect) {
            return <Redirect to='/tasks' />
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-md-offset-3 marginTop" >
                        {renderRedirect()}
                        <div className="card " style={{ borderRadius: 30, background: 'white' }}>

                            <form id="form" className="loginBody">
                                <h5 className="text-center" style={{ letterSpacing: 4 }}>REGISTER</h5>
                                <br></br>
                                <div className="row">
                                    <div className="form-group col-md-12 col-md-offset-4 ">
                                        <label htmlFor="exampleInputEmail1">Full Name</label>
                                        <input type="text" name="name" className="form-control"  placeholder="Enter Full Name" onChange={event => setName(event.target.value)} />
                                    </div>
                                    <div className="form-group col-md-12 col-md-offset-4 ">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" name="email" className="form-control"  placeholder="Enter email" onChange={event => setEmail(event.target.value)} />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group col-md-12 col-md-offset-4">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" name="password" className="form-control" onChange={event => setPassword(event.target.value)} id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <div className="form-group col-md-12 col-md-offset-4">
                                        <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                        <input type="password" name="confirm-password" className="form-control" onChange={event => setConfirmPass(event.target.value)} id="exampleInputPassword1" placeholder="Confirm Password" />
                                    </div>
                                </div>

                                <div className="col-md-12" style={{ textAlign: "center", margin: "auto", color: 'white' }}>
                                    <br></br><br></br>
                                    <a type="submit" onClick={submitData} className="btn btn-secondary btn-lg btn-primary " style={{ borderRadius: 30, color: 'white' }}>{getBtn}</a>
                                </div>

                                <div className="col-md-12 text-center" style={{ textAlign: 'center' }}>
                                    <br></br>
                                    <Link to="/login"> <span className="text-primary">Already have an Account? Login!</span> </Link>
                                </div>

                                {getAlert.success ? (<div className="col-md-12 text-center" style={{ textAlign: 'center' }}>
                                    <br></br><br></br>
                                    <span className="text-success">{getAlert.message}</span>
                                </div>) : <span></span>
                                }

                                {getAlert.error ? (<div className="col-md-12 text-center" style={{ textAlign: 'center' }}>
                                    <br></br>
                                    <span className="text-danger">{getAlert.message}</span>
                                </div>) : <span></span>
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

