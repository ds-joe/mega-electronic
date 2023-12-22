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
use App\Utils\Table;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UsersController extends Controller
{

  use Requests, ImageName, ImagesPaths;
  private array $allowedSortColumns = ['id', 'full_name', 'email', 'type', 'verified', 'created_at'];
  private array $allowedSearchColumns = ['full_name', 'email', 'type', 'verified'];

  /**
   * Display users page.
   * @return \Inertia\Response
   */
  public function show(): \Inertia\Response
  {
    $users_table = Table::defaultTable(User::class, [], $this->allowedSortColumns, $this->allowedSearchColumns);

    return $this->appendPage("Dashboard/Users/index", __('pages/dashboard/users'), [
      "users_table" => $users_table,
      "users_status_cards" => [
        "total_users" => User::count(),
        "total_disabled_users" => User::where('verified', false)->count(),
        "total_active_users" => User::where('verified', true)->count(),
      ]
    ]);
  } // End Method

  /**
   * Get users table.
   * @param Request $request
   * @return void
   */
  public function getUsersTable(Request $request): void
  {
    $table = Table::handleResponse($request, User::class, [], $this->allowedSortColumns, $this->allowedSearchColumns);
    $this->setPageData([
      'users_table' => $table
    ]);
  }

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
