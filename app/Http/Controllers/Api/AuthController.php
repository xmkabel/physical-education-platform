<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    private function generateUniqueCode()
    {
        do {
            // random letter + two random digits
            $code = chr(rand(65, 90)) . str_pad(rand(0, 99), 2, '0', STR_PAD_LEFT);
        } while (User::where('code', $code)->exists());

        return $code;
    }

    // Login
    public function login(Request $request)
    {
        $credentials = $request->only(['code', 'password']);

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    // Register
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'department' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails())
            return response()->json($validator->errors(), 422);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'code' => $this->generateUniqueCode(),
            'department'=>$request->department,
            'password' => bcrypt($request->password),
        ]);

        $token = Auth::guard('api')->login($user);

        return $this->respondWithToken($token);
    }

    // Logout
    public function logout()
    {
        Auth::guard('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    // Refresh token
    public function refresh()
    {
        return $this->respondWithToken(Auth::guard('api')->refresh());
    }

    // Get authenticated user
    public function me()
    {
        return response()->json(Auth::guard('api')->user());
    }

    // Token response helper
    protected function respondWithToken($token)
    {
        $user=User::all()->find(Auth::guard('api')->id());
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60,
            'code'=>$user->code
        ]);
    }

    public function deleteUser($id){
        $user=User::all()->findOrFail($id);
        $user->delete();
        return response()->json([],204);
    }
}
