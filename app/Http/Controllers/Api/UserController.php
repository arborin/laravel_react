<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUSerRequest;
use App\Http\Requests\UpdateUSerRequest;
use App\Http\Resources\UserResource;
use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->paginate()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUSerRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        $user = User::create($data);

        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response($user, 200);
    }

    public function update(Request $request, User $user)
    {
        // $data = $request->validated();

        $user['name'] = $request['name'];
        $user['email'] = $request['email'];
        $user->save();


        return response($user, 200);
    }
}
