<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken($user->name)->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'You are logged out.'], Response::HTTP_OK);
    }
}
