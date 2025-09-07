<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use App\Models\RatingExam;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RatingExamController extends Controller
{
    public function store(Request $request){
        $user_id=Auth::guard('api')->id();
        $user_record=RatingExam::all()->where('user_id','=',$user_id)->first();

        if($user_record){
            $user_record=RatingExam::all()->where('user_id','=',$user_id)->where('exam_no','=',2)->first();
            if($user_record){
                
                return response()->json(['error' => 'user already has taken the final exam','data'=>[]], 401);

            }else{
                $exam_record=new RatingExam();
                $exam_record->exam_no=2;
                $exam_record->user_id=$user_id;
                $exam_record->score=$request->score;
                $exam_record->save();
                return response()->json(['message' => 'created exam record successfuly','data'=>$exam_record], 201);
            }

        }else{
            $exam_record=new RatingExam();
            $exam_record->exam_no=1;
            $exam_record->user_id=$user_id;
            $exam_record->score=$request->score;
            $exam_record->save();
            return response()->json(['message' => 'created exam record successfuly','data'=>$exam_record], 201);
        }
        
    }

    public function results(){
       
        $data=User::with('rating_exams')->where('role','=','user')->get();
        return  response()->json(['message' => 'results have been retrived successfuly','data'=>$data], 200);


    }

    public function user_results(){
        $user_id= Auth::guard('api')->id();
        $user=User::with("rating_exams")->find($user_id);
        return response()->json($user,200);
    }

}
