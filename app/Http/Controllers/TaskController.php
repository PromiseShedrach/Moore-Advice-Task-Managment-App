<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $data = Task::latest()->get();
        $tasks = TaskResource::collection($data);
        return response()->json([
            'tasks' => $tasks
        ]);

        // $token = $request->token;
        // $user = User::where('api_token', $token)->first();
        // if($token && $user){
        //     $data = Task::latest()->get();
        // $tasks = TaskResource::collection($data);
        // return response()->json($tasks);
        // }else{
        //     return response()->json(['status'=>'error'], 200);
        // }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Task::create([
            'name' => $request->name,
        ]); 

        $data = Task::latest()->get();
        $tasks = TaskResource::collection($data);
        return response()->json([
            'status' => 'success',
            'tasks' => $tasks
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Task::find($id);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Task::find($id);
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Task::find($id);
        $data->name = $request->name;
        $data->update();

        $newData = Task::latest()->get();
        $tasks = TaskResource::collection($newData);
        return response()->json([
            'status' => 'success',
            'tasks' => $tasks
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;
        $data = Task::find($id);
        $data->delete();

        $newData = Task::latest()->get();
        $tasks = TaskResource::collection($newData);
        return response()->json([
            'status' => 'success',
            'tasks' => $tasks
        ]);
    }
}
