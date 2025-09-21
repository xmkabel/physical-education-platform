<?php

namespace App\Http\Controllers\Api;

use \App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\RatingExam;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingExamController extends Controller
{
    public function store(Request $request)
    {
        $user_id = Auth::guard('api')->id();
        $user_record = RatingExam::all()->where('user_id', '=', $user_id)->first();

        if ($user_record) {
            $user_record = RatingExam::all()->where('user_id', '=', $user_id)->where('exam_no', '=', 2)->first();
            if ($user_record) {

                return response()->json(['error' => 'user already has taken the final exam', 'data' => []], 401);
            } else {
                $exam_record = new RatingExam();
                $exam_record->exam_no = 2;
                $exam_record->user_id = $user_id;
                $exam_record->score = $request->score;
                $exam_record->save();
                return response()->json(['message' => 'created exam record successfuly', 'data' => $exam_record], 201);
            }
        } else {
            $exam_record = new RatingExam();
            $exam_record->exam_no = 1;
            $exam_record->user_id = $user_id;
            $exam_record->score = $request->score;
            $exam_record->save();
            return response()->json(['message' => 'created exam record successfuly', 'data' => $exam_record], 201);
        }
    }

    public function results()
    {
        $data = User::with('rating_exams')
            ->where('role', 'user')
            ->get();

        return response()->json([
            'message' => 'results have been retrieved successfully',
            'data' => UserResource::collection($data),
        ], 200);
    }


    public function user_results()
    {
        $user_id = Auth::guard('api')->id();
        $user = User::with("rating_exams")->find($user_id);
        return response()->json($user, 200);
    }

    public function usersAnalytics()
    {
        $users_count = User::all()->where('role', '=', 'user')->count();
        $usersWithPre = User::withCount('rating_exams')
            ->where('role', 'user')
            ->has('rating_exams', '=', 1) // users with exactly one exam
            ->get();

      
        $usersWithPreCount = $usersWithPre->count();

        $usersWithPost = User::withCount('rating_exams')
            ->where('role', 'user')
            ->has('rating_exams', '=', 2) 
            ->get();

     
        $usersWithPostCount = $usersWithPost->count();
        return response()->json([
            'message' => 'results have been retrieved successfully',
            'data' => [
                'all_users'=>$users_count,
                'pre'=>$usersWithPreCount,
                'post'=>$usersWithPostCount,

            ],
        ], 200);
    
    }
}
