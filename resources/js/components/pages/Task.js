

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { Nav } from '../Nav'


export function Task() {

    //const params = useParams();
    const [getBtn, setBtn] = useState('Submit');
    const [getAllTask, setAllTask] = useState({ loading: false, tasks: [] });
    const [getTask, setTask] = useState();
    const [getAlert, setAlert] = useState({
        add: false,
        delete: false
    });
    const [getRedirect, setRedirect] = useState(false);

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal


        //get token
        if (!localStorage.getItem('token')) {
            setRedirect(true)
        }

        //to get products data
        fetchTask()


        return function cleanup() {
            abortController.abort()
        }

    }, [])


    async function fetchTask() {
        var token = localStorage.getItem('token');
        await Axios.get("https://moore-task-app.herokuapp.com/api/tasks", {
            headers: {
                'Authorization': token
            }
        }).then((resp) => {
            const data = resp.data;
            //console.log(data);
            if (resp.data.status == 'success' && resp.statusText == 'OK') {
                setAllTask({
                    tasks: data.tasks,
                    loading: true,
                })
            } else {
                alert('An error occurred');
            }
            // console.log(data.tasks);
            // console.log(getAllTask.tasks);
        }).catch((e) => { //if an error was found run the api call again
            console.log(e);
        })
    }

    function renderRedirect() {
        if (getRedirect) {
            return <Redirect to='/Login' />
        }
    }



    function submitData(data) {
        data.preventDefault()
        setBtn('Submitting...')
        setAlert({ delete: false, add: false })
        var token = localStorage.getItem('token');

        Axios.post('https://moore-task-app.herokuapp.com/api/add',
            {
                name: getTask,
            }, {
            headers: {
                'Authorization': token
            }
        }
        ).then((resp) => {

            setBtn('Submit')
            if (resp.data.status == 'success' && resp.statusText == 'OK') {
                document.getElementById('form').reset()
                setAllTask({
                    tasks: resp.data.tasks,
                    loading: true,
                })
                setBtn('Submit')
                setAlert({
                    add: true,
                    message: 'Tasks added successfully'
                })
            } else {
                setBtn('Submit')
                alert('An Error Ocurred')
            }
        })
    }


    function deleteTask(id, data) {
        setAlert({ delete: false, add: false })
        data.preventDefault()
        var token = localStorage.getItem('token');

        Axios.post('https://moore-task-app.herokuapp.com/api/delete',
            {
                id: id,
            }, {
            headers: {
                'Authorization': token
            }
        }

        ).then((resp) => {
            if (resp.data.status == 'success' && resp.statusText == 'OK') {
                document.getElementById('form').reset()
                setAllTask({
                    tasks: resp.data.tasks,
                    loading: true,
                })
                setAlert({
                    delete: true,
                    message: 'Tasks deleted successfully'
                })
            } else {
                alert('An Error Ocurred')
            }
        })
    }


    return (
        <div>
            {renderRedirect()}
            <Nav />
            <div className="container">
                <div className="row marginTop" style={{ borderRadius: 30, background: 'white', padding: 20 }}>
                    <div className="col-md-12">
                        <h4 className="text-center" style={{ letterSpacing: 4 }}>ADD TASK</h4>
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <form id="form" style={{ width: '70%', margin: 'auto' }}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Task Name</label>
                                <input type="email" className="form-control" name="name" onChange={event => setTask(event.target.value)} placeholder="Enter task" />
                            </div>
                            <div className="col-md-12" style={{ textAlign: "center", margin: "auto", color: 'white' }}>
                                <br></br>
                                <button type="submit" onClick={submitData} className="btn btn-secondary btn-lg btn-primary">{getBtn}</button>
                            </div>
                            {
                                getAlert.add ? (<div className="col-md-12 text-center" style={{ textAlign: 'center' }}>
                                    <br></br>
                                    <span className="text-success">{getAlert.message}</span>
                                </div>) : <span></span>
                            }
                        </form>
                    </div>
                </div>


                <div className="row justify-content-center">

                    <div className="col-md-12 marginTop" >
                        <div className="card padding" style={{ borderRadius: 30, background: 'white', padding: 10 }}>
                            <h4 className="text-center" style={{ letterSpacing: 4 }}>MY TASKS</h4>
                            <hr></hr> <br></br>
                            {
                                getAlert.delete ? (<div className="col-md-12 text-center" style={{ textAlign: 'center' }}>
                                    <span className="text-success">{getAlert.message}</span>
                                </div>) : <span></span>
                            }
                            <br></br>
                            <ol className="padding">
                                {
                                    getAllTask.loading ? (
                                        getAllTask.tasks.length !== 0 ? (
                                        getAllTask.tasks.map((task, id) => {
                                            return (
                                                <div className="row" key={task.id} style={{ width: '80%', background: "#e9ebee", borderRadius: 20, marginBottom: 20, padding: "6px" }}>
                                                    <div className="col-md-8 col-xs-6">
                                                        <li > <b > {task.name}</b>  </li>
                                                    </div>
                                                    <div className="col-md-4 col-xs-6">
                                                        <a href="#" style={{ color: "red" }} onClick={deleteTask.bind(this, task.id)}><i className="fa fa-trash"></i></a>
                                                    </div>
                                                </div>

                                            );

                                        }) 
                                    ): (
                                        <div className="col-md-12 text-center" style={{ margin: "auto" }}>
                                            <span className="text-primary"><b>No Task yet!</b></span>
                                        </div>
                                    )) : (
                                        <div className="col-md-12 text-center" style={{ margin: "auto" }}>
                                            <span className="text-primary"><b>Data Loading...</b></span>
                                        </div>
                                    ) 
                                }


                            </ol>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}