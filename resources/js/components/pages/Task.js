

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "axios";


export function Task() {

    const params = useParams();
    const [getBtn, setBtn] = useState('Submit');
    const [getAllTask, setAllTask] = useState({ loading: false, tasks: [] });
    const [getTask, setTask] = useState();

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal


        //to get products data
        fetchTask()


        return function cleanup() {
            abortController.abort()
        }

    }, [])


    async function fetchTask() {
        await Axios.get("https://moore-task-app.herokuapp.com/api/tasks").then((repos) => {
            const data = repos.data;
            setAllTask({
                tasks: data.tasks,
                loading: true,
            })
            // console.log(data.tasks);
            // console.log(getAllTask.tasks);
        }).catch(() => { //if an error was found run the api call again
            console.log('error');
        })
    }



    function submitData(data) {
        data.preventDefault()
        setBtn('Submitting...')

        Axios.post('https://moore-task-app.herokuapp.com/api/add',
            {
                name: getTask,
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
                alert('task added successfully')
            } else {
                setBtn('Submit')
                alert('An Error Ocurred')
            }
        })
    }


    function deleteTask(id, data){
        data.preventDefault()
        setBtn('Submitting...')

        Axios.post('https://moore-task-app.herokuapp.com/api/delete',
            {
                id: id,
            }
        ).then((resp) => {
            if (resp.data.status == 'success' && resp.statusText == 'OK') {
                document.getElementById('form').reset()
                setAllTask({
                    tasks: resp.data.tasks,
                    loading: true,
                })
                alert('task deleted successfully')
            } else {
                alert('An Error Ocurred')
            }
        })
    }


    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Admin Panel</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                    </nav>
                </div>

                <div className="row marginTop">
                    <div className="col-md-12">
                        <h1 className="text-center" >Add Task</h1>
                        <br></br>
                    </div>

                    <div className="col-md-12">
                        <form id="form">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Task Name</label>
                                <input type="email" className="form-control" name="name" onChange={event => setTask(event.target.value)} placeholder="Enter task" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <button type="submit" onClick={submitData} className="btn btn-primary text-center">{getBtn}</button>
                        </form>
                    </div>
                </div>


                <div className="row justify-content-center">
                    <div className="col-md-12 marginTop" >
                        <h2 className="text-center">All Tasks</h2>
                        <br></br>
                        <div className="card padding">
                            <ol className="padding">
                                {getAllTask.loading ? (
                                    getAllTask.tasks.map((task, id) => {
                                        return (


                                            <div className="row" key={task.id}>
                                                <div className="col-md-8">
                                                    <li > <b > {task.name}</b>  </li>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="#" style={{ color: "red" }} onClick={deleteTask.bind(this, task.id)}><i className="fa fa-trash">Delete</i></a>
                                                </div>
                                                <hr/>
                                            </div>


                                        );

                                    })
                                ) : (
                                        <span className="text-center"> <br></br> <b>Loading Data...</b> </span>
                                    )}


                            </ol>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}