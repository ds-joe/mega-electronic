<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\User\ProfileChangeAvatarRequest;
use App\Http\Requests\Dashboard\User\ProfileChangeDetailsRequest;
use App\Traits\Images\ImageName;
use App\Traits\Images\ImagesPaths;
use Illuminate\Http\Request;
use App\Traits\Requests;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;


class ProfileController extends Controller
{
  use Requests, ImageName, ImagesPaths;

  /**
   * Display profile page.
   * @param Request $request
   * @return \Inertia\Response
   */
  public function show(Request $request): \Inertia\Response
  {
    return $this->appendPage(
      'Dashboard/Profile/index',
      __('pages/dashboard/profile'),
      [
        'user_data' => $request->user()
      ]
    );
  }

  /**
   * Update user password.
   * @param Request $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function changePassword(Request $request): \Illuminate\Http\RedirectResponse
  {
    $request->validate([
      'old_password' => "required",
      "new_password" => "required|confirmed|min:6",
      'new_password_confirmation' => "required"
    ]);

    if (!Hash::check($request->old_password, $request->user()->password))
      return back()->withErrors([
        "old_password" => __('pages/dashboard/profile.old_password_not_valid')
      ]);

    $request->user()->password = Hash::make($request->new_password);
    $request->user()->save();
    return back()->with($this->createRequestNotification(__("pages/dashboard/profile.password_updated_successfully"), 'success'));
  } // End Method

  /**
   * Update account details
   * @param ProfileChangeDetailsRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function changeDetails(ProfileChangeDetailsRequest $request): \Illuminate\Http\RedirectResponse
  {
    $user = $request->user();
    $user->full_name = $request->full_name;
    $user->email = $request->email;
    $user->save();

    return back()->with($this->createRequestNotification(__("pages/dashboard/profile.details_updated_successfully"), 'success'));
  } // End Method

  /**
   * Change profile avatar.
   * @param ProfileChangeAvatarRequest $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function changeAvatar(ProfileChangeAvatarRequest $request): \Illuminate\Http\RedirectResponse
  {
    $user = $request->user();
    $image = $request->file('avatar');
    $imageName = $this->generateImageName($image->getClientOriginalName());

    $user->avatar !== null && Storage::disk('public')->delete($this->imagesPaths['profile'] . "/" . $user->avatar);
    Storage::disk('public')->putFileAs($this->imagesPaths['profile'], $image, $imageName);
    $user->avatar = $imageName;
    $user->save();
    return back()->with($this->createRequestNotification(__("pages/dashboard/profile.avatar_updated_successfully"), 'success'));
  } // End Method


}
