import React from 'react';
import { Link } from 'react-router-dom';

export function Welcome() {
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-md-offset-3 marginTop" >
                        <div className="card text-center" style={{ borderRadius: 30, background: 'white', padding:20 }}>
                            <h5 className="text-center " style={{letterSpacing:4}}>WELCOME TO MOORE ADVICE TASK MANAGEMENT APP</h5>
                            <br></br>
                            <Link to="/login"> 
                                <span  className="btn btn-secondary btn-lg btn-primary " style={{borderRadius:30, color:'white'  }}>View Your Task</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

