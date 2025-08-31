<?php

namespace App\Http\Controllers\Api;

use \App\Http\Controllers\Controller;
use App\Models\ChapterExam;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ChapterExamController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'score' => 'required|integer',
            'exam_no' => 'required|integer',
            'chapter_no' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $validator->validated();
            $data['user_id'] = Auth::guard('api')->id();

            $exam = ChapterExam::create($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Created exam record successfully',
                'data' => $exam
            ], 201);
        } catch (QueryException $e) {
            // أخطاء قاعدة البيانات (زي الجدول مش موجود)
            Log::error('DB Error in ChapterExam@store', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->all()
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Database error occurred while saving exam'
            ], 500);
        } catch (\Exception $e) {
            // أي خطأ تاني غير متوقع
            Log::error('Unexpected Error in ChapterExam@store', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong, please try again later'
            ], 500);
        }
    }


    public function results()
    {
        $data = User::with('chapter_exams')->where('role', '=', 'user')->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Exam records have been retrived successfully',
            'data' => $data
        ], 200);
    }

    public function isFinalExamAvilable()
    {
        try {
            $id = Auth::guard('api')->id();
            $totalExams = 10;

            $user = User::withCount([
                'chapter_exams as finished_exams_count' => function ($q) {
                    $q->select(DB::raw('count(distinct concat(chapter_no, "-", exam_no))'));
                }
            ])->findOrFail($id);

            return response()->json([

                'finished_all_exams' => $user->finished_exams_count == $totalExams,

            ]);
        } catch (\Throwable $e) {
            // أي error غير متوقع (غير ModelNotFound)
            Log::error('Error fetching user exams', [
                'user_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong while fetching user data'
            ], 500);
        }
    }
}
