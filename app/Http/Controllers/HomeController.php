<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    // /**
    //  * Create a new controller instance.
    //  *
    //  * @return void
    //  */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    
    public function login(Request $request){
        $user = User::where('email', $request->email)->first();
            if($user){
                if(Hash::check($request->password, $user['password'])){
                    //generating new api token
                    $user_token = bin2hex(openssl_random_pseudo_bytes(30));
     
                    //update database with new api token
                    $user->api_token = $user_token;
                    $user->update();
    
                    return response()->json(['status' => 'success', 'token' => $user_token], 200);
                }else{
                    return response()->json(['status'=>'error1'], 200);
                }
            }
            else{
                return response()->json(['status'=>'error2'], 200);
            }
      }



      public function register(Request $request){
        $this->validate($request, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

         //generating new api token
         $user_token = bin2hex(openssl_random_pseudo_bytes(30));

        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'role' => 'User',
            'password' => Hash::make($request['password']),
            'api_token' => $user_token,
        ]);

        return response()->json(['status' => 'success', 'token' => $user_token], 200);
        
      }
}
