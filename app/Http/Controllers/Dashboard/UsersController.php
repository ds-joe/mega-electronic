<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\User\CreateUserRequest;
use App\Http\Requests\Dashboard\User\UpdateUserRequest;
use App\Models\User;
use App\Models\UserSetting;
use App\Traits\Images\ImageName;
use App\Traits\Images\ImagesPaths;
use App\Traits\Requests;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UsersController extends Controller
{

  use Requests, ImageName, ImagesPaths;

  /**
   * Display users page.
   * @return \Inertia\Response
   */
  public function show(): \Inertia\Response
  {
    $users = User::all();
    return Inertia::render("Dashboard/Users/index", [
      'pageWords' => __('pages/dashboard/users'),
      "users" => $users,
      "total_users" => $users->count(),
      "total_disabled_users" => $users->where('verified', false)->count(),
      "total_active_users" => $users->where('verified', true)->count(),
    ]);
  } // End Method

  /**
   * Create user.
   * @param CreateUserRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(CreateUserRequest $request): \Illuminate\Http\RedirectResponse
  {
    $avatar = null;
    if ($request->file('avatar')) {
      $image = $request->file('avatar');
      $avatar = $this->generateImageName($image->getClientOriginalName());
      Storage::disk('public')->putFileAs($this->imagesPaths['profile'], $image, $avatar);
    }
    $user = User::create([
      'full_name' => $request->full_name,
      "email" => $request->email,
      'password' => Hash::make($request->password),
      'type' => $request->type,
      'verified' => $request->verified,
      'avatar' => $avatar
    ]);
    UserSetting::create([
      'user_id' => $user->id
    ]);

    return back()->with($this->createRequestNotification(__('pages/dashboard/users.user_created_successfully'), 'success'));
  } // End Method

  /**
   * Update user.
   * @param UpdateUserRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function update(UpdateUserRequest $request): \Illuminate\Http\RedirectResponse
  {
    $user = User::findOrFail($request->id);
    $avatar = null;

    # Check if there avatar, and update user avatar.
    if ($request->file('avatar')) {
      $image = $request->file('avatar');
      $avatar = $this->generateImageName($image->getClientOriginalName());

      # Delete old avatar there.
      $user->avatar !== null && Storage::disk('public')->delete($this->imagesPaths['profile'] . "/" . $user->avatar);

      # Create new avatar for user.
      Storage::disk('public')->putFileAs($this->imagesPaths['profile'], $image, $avatar);
      $user->avatar = $avatar;
    }

    # Check if there password, and update user password.
    if ($request->password) {
      $user->new_password = Hash::make($request->new_password);
    }
    $user->full_name = $request->full_name;
    $user->email = $request->email;
    $user->type = $request->type;
    $user->verified = $request->verified;
    $user->save();

    return back()->with($this->createRequestNotification(__('pages/dashboard/users.user_updated_successfully'), 'success'));
  } // End Method

  /**
   * Delete user.
   * @param int $id
   * @return \Illuminate\Http\RedirectResponse
   */
  public function delete(int $id): \Illuminate\Http\RedirectResponse
  {
    $user = User::findOrFail($id);
    $user->avatar !== null && Storage::disk('public')->delete($this->imagesPaths['profile'] . "/" . $user->avatar);
    $user->delete();
    return back()->with($this->createRequestNotification(__('pages/dashboard/users.user_deleted_successfully'), 'success'));
  } // End Method

}
