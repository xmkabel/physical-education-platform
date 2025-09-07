// services/examService.js
import axiosInstance from "./axios";
import React from "react";
// import { useLocation } from 'react-router-dom';
function getChapterFromQuizId(quizId) {

  const str = String(quizId).trim();
  const firstDigit = parseInt(str[0], 10);

  if (Number.isNaN(firstDigit)) {
    throw new Error("quizId غير صالح");
  }

  return firstDigit - 1; // zero-based chapter
}

export const saveExamScore = async (score, quizId) => {
  // const location = useLocation();
  // تحديد chapter_no حسب quizId


  // exam_no ممكن يكون رقم الامتحان (مثلاً quizId أو أي logic)
  const exam_no = quizId;

  if (location.pathname === '/exams/start' || location.pathname === '/exams/final') {
    const response = await axiosInstance.post("/rating-exams", {
    score
    
  });

  return response.data;
  }

  const response = await axiosInstance.post("/chapter-exams", {
    score,
    exam_no,
    chapter_no: getChapterFromQuizId(quizId),
  });

  return response.data;
};
